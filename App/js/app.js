(function($,angular){
  var app = angular.module('warframe',['ngRoute']);
  app.config(function($routeProvider,$locationProvider){
    $routeProvider
    .when('/', {
      templateUrl : 'pages/login.html',
      controller  : 'mainController'
    })
    .when('/registro', {
      templateUrl : 'pages/registro.html',
      controller  : 'registroController'
    })
    .when('/contact', {
      templateUrl : 'pages/contact.html',
      controller  : 'contactController'
    });


  });
  app.controller("mainController",function($scope){
    $scope.message = "hello";
    $scope.backgroundClass = "login-background";
  })
  app.controller("registroController",function($scope){
    $scope.message = "hello registro";
  })
})(jQuery,angular)