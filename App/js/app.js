(function ($, angular, helpers,sessionManager) {
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

  //Esto es el middleware que se encarga de verificar la sesion en cada una de las url de la página.
  //sessionManager es una variable que tiene unos helpers para manejar la sesion
  //Investigar que es un middleware
  app.run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (event) {
      //Ponerle la negación en el if para que funcione, esta así para poder hacer las pruebas sin sesión
        if (sessionManager.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            location.href = "/App/Login";
        }
        else {
            console.log('ALLOW');
        }
    });
});
  app.controller("friendsController", function ($scope) {
    
    $scope.message = "hello amigos";
  });

  app.controller("mainController", function ($scope,$http) {
$http({
        method: 'GET',
        url: "http://localhost:8081/GetAllNotes/1"
    }).then(function successCallback(response) {
        console.log(response)
    }, function errorCallback(response) {
        console.log(response)
    });
      $scope.message = "hello";
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
})(jQuery, angular, helpers,sessionManager);