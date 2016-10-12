(function ($, angular, helpers) {
  helpers.init();
  var app = angular.module('keep', ['ngRoute']);
  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/keep.html',
        controller: 'mainController'
      })
      .when('/friends', {
        templateUrl: 'templates/friends.html',
        controller: 'friendsController' 
      }).
      when('/archivements', {
        templateUrl: "templates/archivements.html",
        controller: "archivementsController"
      }).
      when('/shared', {
        templateUrl: "templates/shared.html",
        controller: "sharedController"
      }).
      when('/trash', {
        templateUrl: "templates/trash.html",
        controller: "trashController"
      })
  });

  app.controller("friendsController", function ($scope) {
    if (window.localStorage.UsuarioActivo == false) {
      window.location.href = location.origin + '/APP/login';
    }
    $scope.message = "hello amigos";
  });

  app.controller("mainController", function ($scope) {
    if (window.localStorage.UsuarioActivo == false) {
      window.location.href = location.origin + '/APP/login';
    } else {
      $scope.message = "hello";

    }
  });
  app.controller("archivementsController", function ($scope) {
    $scope.message = "hello";
  });
  app.controller("archivementsController", function ($scope) {
    $scope.message = "hello archivements";
  });
  app.controller("sharedController", function ($scope) {
    $scope.message = "Hola Shareds";
  });

  app.controller("trashController", function ($scope) {
    $scope.message = "Hola trash";
  });
})(jQuery, angular, helpers);