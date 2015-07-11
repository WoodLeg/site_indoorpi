angular.module('indoorSite')

.controller('postController', ['$scope','$location','$routeParams', '$http','$sce',
   function($scope, $location, $routeParams, $http, $sce){

         $scope.blogLink = function(){
            $location.path('/blog');
         }

         $scope.renderHtml = function(html_code)
         {
             return $sce.trustAsHtml(html_code);
         };

         $http({method: 'GET', url: '/blog/' + $routeParams.id})
            .success(function(data, status){
               $scope.post = data;
            }).error(function(data, status){
               console.log(data);
            })
   }
]);
