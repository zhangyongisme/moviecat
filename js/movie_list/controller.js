(function(angular) {
	//创建正在热映模块
	var module = angular.module(
		'moviecat.movie_list', [
			'ngRoute',
			'moviecat.services.http'
		]);
	//配置路由
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/:category/:page', {
			templateUrl: 'js/movie_list/view.html',
			controller: 'MovieListController'
		});
	}]);
	//控制器
	module.controller('MovieListController', [
		'$scope',
		'$route',
		'$routeParams',
		'HttpService',
		'AppConfig',
		function($scope, $route, $routeParams, HttpService,AppConfig) {
			var count = AppConfig.pageSize; // 每一页的条数
			var page = $routeParams.page; // 当前第几页
			var start = (page - 1) * count; // 当前页从哪开始
			$scope.loading = true; // 开始加载
			$scope.subjects = [];
			$scope.title = 'Loading...';
			$scope.message = '';
			$scope.totalCount = 0;
			$scope.totalPages = 0;
			$scope.currentPage = parseInt(page);
			HttpService.jsonp(
					AppConfig.listApiAddress + $routeParams.category, {
					start: start,
					count: count,
					city: '上海',
					q: $routeParams.q
				},
				function(data) {
					$scope.$apply(
						function(){
							$scope.title = data.title;
							$scope.message = data.message;
							$scope.subjects = data.subjects;
							$scope.totalCount = data.total;
							$scope.totalPages = Math.ceil($scope.totalCount / count);
							$scope.loading = false;
						}
					)
					//$scope.$apply(); //重新同步
				}
			);
			//翻页
			$scope.go = function(page) {
				if(page >= 1 && page <= $scope.totalPages) {
					$route.updateParams({
						page: page
					});
				}
			};
		}
	]);
})(angular);