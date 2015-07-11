angular.module('indoorSite')


.controller('editPostController', ['$scope', 'FileUploader', '$routeParams', '$http', '$location',
   function($scope, FileUploader, $routeParams, $http, $location){
         $scope.pageTitle = 'Edit Page';

         // Retreive the correspongin post and inject the credentials to the view
         $http({method: 'GET', url: '/blog/' + $routeParams.id})
            .success(function(data, status){
               $scope.post = {
                  title: data.title,
                  img: data.img,
                  display: data.display,
                  date: data.date,
                  content: data.content,
                  id : data._id
               }
            }).error(function(data, stauts){
               console.log(data);
            });

         // New instance of FireUploader
         var uploader = $scope.uploader = new FileUploader({
            url: '/blog/edit/'+ $routeParams.id,
         });

         $scope.upload = function(post){
            // If there is no new image use a POST Request instead of upload.uploadAll()
            if (uploader.queue.length == 0){
                  $http({method: 'POST', url: '/blog/edit/' + $routeParams.id, data: {post: $scope.post}})
                     .success(function(data, status){
                        $location.path('/admin');
                     }).error(function(data, status){
                        console.log(data);
                     });
            } else {
                  uploader.uploadAll();
            }
         }

         /** Listener Events for uploader **/
         uploader.onWhenAddingFileFailed = function(item, filter, option){
            console.info('onWhenAddingFileFailed', item, filter, option);
         };
         uploader.onAfterAddingFile = function(item){
            console.info('onAfterAddingFile:', item);
         };
         uploader.onBeforeUploadItem = function(item) {
            item.formData.push($scope.post);
            console.info('onBeforeUploadItem', item);
         };
         uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
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
            $location.path('/admin');
         };
   }
])
