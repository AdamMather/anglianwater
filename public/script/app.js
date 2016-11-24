'use strict';

(function() {

    var app = angular.module('pammSkeleton', [
        'pammSkeleton.controllers',
        'pammSkeleton.services',
        'ngRoute' ]);

    app.config(['$routeProvider', function($routeProvider) {
            $routeProvider
                .when('/home', {
                    templateUrl: 'assets/partials/home.html',
                    controller: "HomeCtrl"
                })
                .when('/about', {
                    templateUrl: 'assets/partials/about.html',
                    controller: "AboutCtrl"
                })
                .otherwise({
                    redirectTo: '/home'
                });
          }]);

    angular.module('pammSkeleton.services', []);
    angular.module('pammSkeleton.controllers', []);
})();