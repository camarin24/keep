(function(){
    $.material.init();
    let app = angular.module("todo",[]);

app.controller("todoController",function($scope,$http){

    //de esta forma se llama al servicio de nodejs
    // $http({
    //     method: 'GET',
    //     url: "http://localhost:8081/tasks"
    // }).then(function successCallback(response) {
    //     console.log(response)
    // }, function errorCallback(response) {
    //     console.log(response)
    // });


    $scope.addtask = {display:"none"}  
    $scope.deleteask = function()
    {
        var cont = $scope.tareas.length;
          for (var i=0; i < $scope.tareas.length; i++) {
              if($scope.tareas[i].eliminar)
              {
                  $scope.tareas.splice(i,1);
                  i--;
              }
          }          
    }
    $scope.model = {
        responsable:"",
        tarea:"",
        descripcion:"",
        estado:false,
        eliminar:false        
    }

    $scope.getTasks = function(){
        return JSON.parse(window.localStorage.getItem("todo")) || [];
    }
    $scope.setTask = function(){
        let data = JSON.stringify(window.localStorage.getItem("todo")) == "null" ? []:JSON.parse(window.localStorage.getItem("todo"));
        data.push($scope.model);
        window.localStorage.setItem("todo",JSON.stringify(data));
        $scope.tareas = $scope.getTasks(); 
        $scope.addtask = {display:"none"}
    }
    $scope.cambiarEstado = function(tarea){
        tarea.estado = 1;
    }

    $scope.updateTasks = function(tasks){
        window.localStorage.setItem("todo",JSON.stringify(tasks));
 }

    $scope.$watch('tareas', function(newVal, oldVal) {
        $scope.updateTasks(newVal);
    },true);

    


    $scope.isFirstTime = function(){
        if(JSON.stringify(window.localStorage.getItem("todo")) == "null"){
            var tareas = [
                {responsable:"Cristian",tarea:"Estructurar APP",descripcion:"",estado:true,eliminar:false},
                {responsable:"Cristian",tarea:"Estructurar el web service",descripcion:"",estado:false,eliminar:false},
                {responsable:"Tatiana",tarea:"Agregar la opción de eliminar tarea en esta página",descripcion:"http://stackoverflow.com/questions/23809597/how-to-remove-item-from-array-with-filter-in-angularjs",estado:false,eliminar:false},
                {responsable:"Tatiana",tarea:"Crear inicio de sesion",descripcion:"Se debe estructurar la app para que no haga postback en ningún momento, crear los servicios correspondientes y realizar una sesión persistente mediante el local y/o session storage \n pd:revisar el código de esta página.",estado:false,eliminar:false},
                {responsable:"Cristian",tarea:"Interfaz basica de la app",descripcion:"",estado:false,eliminar:false},
                {responsable:"Tatiana",tarea:"Crear tarea",descripcion:"Se debe agregar la opción de crear una tarea.Ver googleKeep",estado:false,eliminar:false},
                {responsable:"Cristian",tarea:"Crear funcionalidad de la papelera",descripcion:"",estado:false,eliminar:false},
                {responsable:"Tatiana",tarea:"Darle la pruebita de amor a cristian",descripcion:"",estado:false,eliminar:false},
            ];
            window.localStorage.setItem("todo",JSON.stringify(tareas));
        }
    }
    $scope.isFirstTime();
    $scope.tareas = $scope.getTasks(); 
})
})()
