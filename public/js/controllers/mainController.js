angular.module('indoorSite')

.directive('mark', function(){
   return {
      link: function (scope, elem, attrs){
         elem.on('focus', function(){
            $('.contact label').addClass('active');
         });
         elem.on('blur', function(){
            $('.contact label').removeClass('active');
         })
      }
   }
})

.controller('mainController', ['$scope', '$http',
   function($scope, $http){

      console.info($scope.userForm);
      $scope.mail = "Email";
      $scope.submit = function(data){
         // Mail request
         $http({method: 'POST', url:'/mail', data: {usermail: data.mail}})
               .success(function(data, status){
                  $scope.user.mail = null;
                  Materialize.toast('Mail envoyé !', 4000);
                  console.log(data);
               }).error(function(data, status){
                  console.log(data);
               });

         // Send a request to add the mail's customer to the database
         $http({method: 'POST', url: '/customers', data: {usermail: data.mail}})
            .success(function(data, status){
               $scope.user.mail = null;
               console.info('Added customer success', data);
            }).error(function(data, status){
               console.log(data);
            })


      }


}]);
