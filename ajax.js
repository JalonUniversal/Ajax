;(function(win){
	function ajax(customOptions) {
		let xhr;
		let defaultOptions = {
			url: '',
			type: 'GET',
			data: null,
			dataType: 'json',
			success: function () {},
			fail: function () {}
		}
		let mergeOptions;
		// 能力检测，
		// 由于按 W3C 标准靠拢,我们就不考虑 ActiveXObject 这种东西了
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			console.error('You browser is too old');
		}
		// 合并默认参数与自定义参数
		mergeOptions = Object.assign({}, defaultOptions, customOptions);
		if (mergeOptions.type.toUpperCase() === 'POST') {
			xhr.open(mergeOptions.type, mergeOptions.url, true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
			xhr.send(mergeOptions.data);
		} else {
			let queryUrl;
			let baseUrl;
			if (mergeOptions.data && typeof (mergeOptions.data) === 'object') {
				const queryArr = [];
				for (const k in mergeOptions.data) {
					queryArr.push(`${k}=${mergeOptions.data[k]}`);
				}
				queryData = queryArr.join('&');
				queryUrl = baseUrl + '?' + queryData;
			}
			baseUrl = mergeOptions.url;
			queryUrl = baseUrl;
			xhr.open(mergeOptions.type, queryUrl, true);
			xhr.send(null);
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				mergeOptions.success(xhr.responseText);
			}
		}
	}
	win.ajax = ajax;
})(window)