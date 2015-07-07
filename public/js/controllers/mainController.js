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
         $scope.user.mail = null;
         $http({method: 'POST', url:'/mail', data: {usermail: data.mail}})
               .success(function(data, status){
                  console.log(data);
               }).error(function(data, status){
                  console.log(data);
               });
      }


}]);
