angular.module('indoorSite', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
      $routeProvider
         .when('/blog/:name', {templateUrl: 'partials/post.html', controller: 'postController'})
         .when('/blog', {templateUrl: 'partials/blog.html', controller: 'blogController'})
         .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
         .otherwise({ redirectTo : '/'});
}]);
