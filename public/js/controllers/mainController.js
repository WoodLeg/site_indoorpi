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

      $scope.mail = "Email";
      $scope.submit = function(data){
         $http({method: 'POST', url:'/mail', data: {usermail: data.mail}})
               .success(function(data, status){
                  $scope.user.mail = null;
                  Materialize.toast('Mail envoyé !', 4000);
                  console.log(data);
               }).error(function(data, status){
                  console.log(data);
               });


      }


}]);
