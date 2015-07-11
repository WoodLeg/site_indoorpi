angular.module('indoorSite')


.controller('loginController', ['$scope', '$http', '$localStorage','$location', 'userService',
   function($scope, $http, $localStorage, $location, userService){
         $scope.pageTitle = 'Login';

         $scope.submit = function(user){
            userService.loggedIn(user);
         }
   }
]);
