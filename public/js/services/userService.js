angular.module('indoorSite')


.service('userService', function($rootScope, $localStorage, $location, $http){
         return {
            isConnected: function(){
               if ($localStorage.token !== undefined){
                  return true;
               } else {
                  return false;
               }
            },
            loggedIn: function(user){
               $http({method: 'POST', url: '/authenticate', data: {user : user}})
                  .success(function(data, status){
                     $localStorage.token = data.token;
                     $rootScope.$broadcast('connectionStateChanged');
                     $location.path('/admin');
                  }).error(function(data, status){
                     console.log(data);
                  });
            },
            loggedOut: function(){
               delete $localStorage.token;
               $location.path('/login');
            }
         }
      }
);
