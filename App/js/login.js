(function ($, angular, helpers,sessionManager) {
  helpers.init();
  var app = angular.module('keepLogin', ['ngRoute']);
  app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: "login/index.html",
        controller: "loginController"
      })
      .when('/registrar', {
        templateUrl: "registro/index.html",
        controller: "registroController"
      })
  });

  app.controller("loginController", function ($scope, $http) {
    $scope.Users = {
      nombre: "",
      email: "",
      contra: ""
    }
    $scope.Title = "Login";
    $scope.ValidarUsers = function () {

      $http({
        method: 'POST',
        url: "http://localhost:8081/ValidarUsuario",
        data: { Usuario: $scope.Users.email, Contra: $scope.Users.contra }
      }).then(function successCallback(response) {
        if (response.data.length > 0) {
         sessionManager.setSession(response.data[0]);
          location.href = location.origin + '/APP/';
        }
        else
          alert("Usuario y/o contraseña incorrectos");
      }, function errorCallback(response) {
        console.log("errorcal" + response)
      });
    };
  });

  app.controller("registroController", function ($scope, $http) {
    $scope.Title = "Registrarte";
    $scope.Users = {
      nombre: "",
      email: "",
      contra: ""
    }
     $scope.Volver = function () {
              window.location.href = location.origin + '/App/login';
     }
    $scope.Registrarse = function () {
      if ($scope.Users.nombre == "") {
        alert("Todos los datos son requeridos")
      } else if ($scope.Users.email == "") {
        alert("Todos los datos son requeridos")
      } else if ($scope.Users.contra == "") {
        alert("Todos los datos son requeridos")
      } else {
        $http({
          method: 'POST',
          url: "http://localhost:8081/ValidarRegistro",
          data: { Usuario: $scope.Users.email }
        }).then(function successCallback(response) {
          if (response.data.length > 0)
            alert("Ya existe");
          else {
            $http({
              method: 'POST',
              url: "http://localhost:8081/RegistrarUsuario",
              data: { Nombre: $scope.Users.nombre, Usuario: $scope.Users.email, Contra: $scope.Users.contra }
            }).then(function successCallback(response) {
              alert(response.data);
              window.location.href = location.origin + '/APP/login';
            }, function errorCallback(response) {
              console.log("error" + response.data)
            });
          }
        }, function errorCallback(response) {
          console.log("error" + response.data)
        });
      }
    };
  });
})(jQuery, angular, helpers, sessionManager);