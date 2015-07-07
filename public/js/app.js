angular.module('indoorSite', ['ngRoute'])

.config(['$routeProvider', function($routeProvider){
      $routeProvider
         .when('/', {templateUrl: 'partials/main.html', controller: 'mainController'})
         .when('/blog', {templateUrl: 'partials/blog.html', controller: 'blogController'})
         .otherwise({ redirectTo : '/'});
}]);
