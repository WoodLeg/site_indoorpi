angular.module('indoorSite')


.controller('adminController', ['$scope','$http', '$location', '$localStorage', 'userService',
   function($scope, $http, $location, $localStorage, userService){
         $scope.title = "Admin Panel";
         $http({method: 'GET', url:'/blog'})
            .success(function(data, status){
               $scope.posts = data;
            }).error(function(data, status){
               console.log(data);
            });

            console.log($localStorage);
         $scope.edit = function(id) {
            $location.path('/admin/edit/' + id);
         }

         $scope.delete = function(id){
            $http({method: 'DELETE', url: '/blog/' + id})
               .success(function(data, status){
                  for (var i = 0; i < $scope.posts.length; i++) {
                     if ($scope.posts[i]['_id'] == data.id) {
                        $scope.posts.splice(i, 1);
                     }
                  }
               }).error(function(data, status){
                  console.log(data);
               });
         }

         $scope.logOut = function(){
            userService.loggedOut();
         }
   }
]);
