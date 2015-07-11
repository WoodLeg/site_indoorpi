angular.module('indoorSite', ['ngRoute','truncate','angularFileUpload', 'ngStorage'])

.config(['$routeProvider', '$httpProvider',
   function($routeProvider, $httpProvider){

      $httpProvider.interceptors.push(['$q','$location', '$localStorage',
         function($q, $location, $localStorage){
               return {
                  'request': function (config) {
                     config.headers = config.headers || {};
                     console.info("Config: ", config);
                     if ($localStorage.token){
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                     }
                     return config;
                  },
                  'requestError': function(response){
                     if (response.status === 401 || response.status === 403){
                        $location.path('/login');
                     }
                     return $q.reject(response);
                  }
               }
         }
      ]);

      $routeProvider
         .when('/blog/:id', {templateUrl: 'partials/post.html', controller: 'postController'})
         .when('/blog', {templateUrl: 'partials/blog.html', controller: 'blogController'})
         .when('/admin', {templateUrl: 'partials/admin.html', authorized: true, controller: 'adminController'})
         .when('/admin/new', {templateUrl: 'partials/newPost.html', authorized: true, controller: 'newPostController'})
         .when('/admin/edit/:id', {templateUrl: 'partials/editPost.html', authorized: true, controller: 'editPostController'})
         .when('/login', {templateUrl: 'partials/login.html', controller: 'loginController'})
         .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
         .otherwise({ redirectTo : '/'});
}])

.run(function($rootScope, $location, userService){
   $rootScope.$on('$routeChangeStart', function(event, next, current){
      if (next.$$route.authorized && !userService.isConnected()){
         $location.path('/login');
      }
   })
})
