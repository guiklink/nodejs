// app.js
var express = require('express');
var app = express();
var db = require('./db');

// Mapping the controllers
var SignController = require('./api/controllers/SignController');
app.use('/signs', SignController);


// Load HTML
app.get('/',function(req,res){
  res.sendFile(__dirname + '/html/home.html');
  //__dirname : It will resolve to your project folder.
});

module.exports = app;
