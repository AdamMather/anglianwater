'use strict';

(function() {

    var app = angular.module('pammSkeleton', [
        'pammSkeleton.controllers',
        'pammSkeleton.services',
        'ngRoute',
        'ngMessages',
        'ngFileUpload'
         ]);

    app.config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'assets/partials/home.html',
                    controller: "HomeCtrl"
                })
           .when('/upload', {
                    templateUrl: 'assets/partials/upload.html',
                    controller: "HomeCtrl"
                })
                .when('/about', {
                    templateUrl: 'assets/partials/about.html',
                    controller: "AboutCtrl"
                })
                .otherwise({
                    redirectTo: '/upload'
                });
          }]);

          app.run(function($rootScope, NextBackBasicService){
            $rootScope.goNext = function() {
              NextBackBasicService.goNext();
            };

            $rootScope.goBack = function() {
              NextBackBasicService.goBack();
            };
          });

          app.factory('NextBackBasicService', function($route, $location) {
            //array for keeping defined routes
            var routes = [];

            angular.forEach($route.routes, function(config, route) {
              //not to add same route twice
              if (angular.isUndefined(config.redirectTo)) {
                routes.push(route);
              }
            });

            return {
              goNext: function() {
                var nextIndex = routes.indexOf($location.path()) + 1;
                if (nextIndex !== routes.length) {
                  $location.path(routes[nextIndex]);
                }
              },
              goBack: function() {
                var backIndex = routes.indexOf($location.path()) - 1;
                if (backIndex !== -1) {
                  $location.path(routes[backIndex]);
                }
              }
            };
          });

    angular.module('pammSkeleton.services', []);
    angular.module('pammSkeleton.controllers', []);
})();