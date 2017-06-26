(function(angular) {
  angular.module('moviecat.directives.auto_focus', [])
    .directive('autoFocus', ['$location', function($location) {
      // Runs during compile
      // var path = $location.path(); // /coming_soon/1
      // console.log(path);
      return {
        restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
        link: function($scope, iElm, iAttrs, controller) {

          $scope.$location = $location;
          $scope.$watch('$location.path()', function(now) {
            // 当path发生变化时执行，now是变化后的值
            var aLink = iElm.children().attr('href');
            var type = aLink.replace(/#(\/.+?)\/\d+/, '$1'); // /coming_soon
            if (now.startsWith(type)) {
              	// 访问的是当前链接
            	iElm.parent().children().removeClass('active');
            	iElm.addClass('active');
            	
            }else if(now.startsWith('/search')){	//搜索时移除焦点
            	iElm.parent().children().removeClass('active');
            }
            
            /*iElm.on('click', function() {
            iElm.parent().children().removeClass('active');
            iElm.addClass('active');*/
          
          })


          
        }
      };
    }]);
})(angular);