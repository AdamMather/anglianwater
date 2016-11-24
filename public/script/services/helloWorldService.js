'use strict';

var module = angular.module('pammSkeleton.services');

// Example service which makes a GET call to our Play service, and returns the data as-is.
module.factory('helloWorldService', ["$http", function($http) {
    return $http.get("/ws/hello")
        .success(function(data) {
          return data;
        })
        .error(function(err) {
          return err;
        });
}]);