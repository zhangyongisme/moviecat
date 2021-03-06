(function(angular) {
	angular.module('moviecat', [
			'ngRoute',
			'moviecat.movie_detail',
			'moviecat.movie_list',
			'moviecat.directives.auto_focus'
		])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({
				redirectTo: '/in_theaters/1'
			});
		}])
		.config(['$sceDelegateProvider',function($sceDelegateProvider) {
			$sceDelegateProvider.resourceUrlWhitelist(['**']);
		}])
		.constant('AppConfig', {
			pageSize: 10,
			listApiAddress: 'https://api.douban.com/v2/movie/',
			detailApiAddress: 'https://api.douban.com/v2/movie/subject/'
		})
		.controller('searchController', ['$scope', '$route', function($scope, $route) {
			$scope.search = function() {
				$route.updateParams({
					category: 'search',
					q: $scope.searchText
				})
			};
		}]);
})(angular);