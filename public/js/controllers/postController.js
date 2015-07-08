angular.module('indoorSite')

.controller('postController', ['$scope','$location','$routeParams', '$http',
   function($scope, $location, $routeParams, $http){

         $scope.blogLink = function(){
            $location.path('/blog');
         }


         $http({method: 'GET', url: '/blog/' + $routeParams.name})
            .success(function(data, status){
               $scope.post = data;
            }).error(function(data, status){
               console.log(data);
            })
   }
]);
