angular.module('indoorSite')

.directive('progress', function(){
   return {
      scope: {
         progress : '@'
      },
      link: function(scope, elem, attrs){
         attrs.$observe('progress', function(){
            elem.css('width', attrs.progress + '%');
         })
      }
   }
})

.controller('newPostController', ['$scope', '$http','FileUploader','$location', '$localStorage',
   function($scope, $http, FileUploader, $location, $localStorage){
         $scope.pageTitle = "New Post";
         $scope.progress = 0;

         var uploader = $scope.uploader = new FileUploader({
            url: '/blog'
         });

         $scope.upload = function(post){
            uploader.uploadAll();
         }

        uploader.onBeforeUploadItem = function(item) {
            item.formData.push($scope.newPost);
            item.headers.authorization = 'Bearer ' + $localStorage.token;
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
            $scope.progress = progress;
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            $location.path('/admin')
        };


        console.info('uploader', uploader);


         $scope.newPost = {};

   }
]);
