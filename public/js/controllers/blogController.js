angular.module('indoorSite')


.filter('toHtml', ['$sce',
   function($sce){
      return function(val) {
         return $sce.trustAsHtml(val);
      }
}])

.controller('blogController', ['$scope', '$http', '$sce',
   function($scope, $http, $sce){
      $http({method: 'GET', url: '/blog'})
            .success(function(data, status){
               console.info(data);
                  $scope.posts = data;
            }).error(function(data, status){
                  console.log(data);
            });
   }
]);
