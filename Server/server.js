var express = require("express"),
  bodyparser = require("body-parser"),
  db = require("./DataAccess/connection").Connection,
  app;

var port = process.env.PORT || 8081;
var ip_address = process.env.IP || '127.0.0.1';

app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*Metodos de webservices*/
app.get("/tasks", function (req, res) {
  db.query("select * from tareas", [], function (err, rows) {
    res.json(rows);
  })
});

app.post("/ValidarUsuario", function (req, res) {
  db.query("Select * from usuarios where email = ? and contrasenia=?", [req.body.Usuario, req.body.Contra], function (err, rows) {
    res.json(rows);
  })
});
app.post("/ValidarRegistro", function (req, res) {
  db.query("Select * from usuarios where email = ?", [req.body.Usuario], function (err, rows) {
    res.json(rows);
  })
});
app.post("/RegistrarUsuario", function (req, res) {
  db.query("Insert into usuarios (nombre,email,contrasenia) set ?,?,?", [req.body.Nombre, req.body.Usuario, req.body.Contra], function (err) {
    res.json(err);
  })
});

app.get("/GetAllNotes/:id",function(req,res){
  db.query("select * from tareas where usuario = ?", [req.params.id], function (err, rows) {
    res.json(rows);
  })
});

app.listen(port, ip_address);


// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//     res.header('Access-Control-Allow-Credentials', true);
//     next();
// });