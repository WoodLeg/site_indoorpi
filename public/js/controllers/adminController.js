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

         $scope.edit = function(id) {
            $location.path('/admin/edit/' + id);
         }

         $scope.delete = function(postID){
            $http({method: 'DELETE', url: '/blog/' + postID})
               .success(function(data, status){
                  for (var i = 0; i < $scope.posts.length; i++) {
                     if ($scope.posts[i]['_id'] == postID) {
                        console.log('YEAH');
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

         // Customers Part
         $scope.customerTitle = "Interested Customers"
         $http({method: 'GET', url: '/customers'})
            .success(function(data, status){
               $scope.customers = data;
               $scope.totalCus = data.length;
            }).error(function(data, status){
               console.log(data);
            });

         $scope.deleteCus = function(customerID){
            $http({method: 'DELETE', url: '/customers/' + customerID})
               .success(function(data, status){
                  for (var i = 0; i < $scope.customers.length; i++) {
                     if ($scope.customers[i]['_id'] == customerID) {
                        $scope.customers.splice(i, 1);
                        $scope.totalCus--;
                     }
                  }
                  console.info("Supression completed", data);
               }).error(function(data, status){
                  console.info('An error occurs: ', data, status);
               })
         }
   }
]);
