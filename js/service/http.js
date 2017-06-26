(function(angular) {
	var http = angular.module('moviecat.services.http', []);
	http.service('HttpService', ['$window', '$document', function($window, $document) {
		this.jsonp = function(url, data, callback) {
			var fnSuffix = Math.random().toString().replace('.', '');
			var cbFuncName = 'my_json_cb_' + fnSuffix;
			var querystring = url.indexOf('?') == -1 ? '?' : '&';//判断链接有没有加问号
			for(var key in data) {
				querystring += key + '=' + data[key] + '&';
			}
			querystring += 'callback=' + cbFuncName;
			var scriptElement = $document[0].createElement('script');
			scriptElement.src = url + querystring;
			$window[cbFuncName] = function(data){
				callback(data);
				$document[0].body.removeChild(scriptElement);//执行完callback 删除script标签
			};
			$document[0].body.appendChild(scriptElement);
		};
	}]);
})(angular);