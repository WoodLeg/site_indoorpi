angular.module('indoorSite')

.controller('blogController', ['$scope', '$http',
   function($scope, $http){

      $http({method: 'GET', url: '/blog'})
            .success(function(data, status){
                  $scope.posts = data;
            }).error(function(data, status){
                  console.log(data);
            });
   }
]);
