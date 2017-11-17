// app.js
var express = require('express');
var app = express();
var db = require('./db');
var engine = require('consolidate');

// Pick an HTML Rendering Engine
app.set('views', __dirname + '/views');
// app.engine('html', require('ejs').renderFile);
app.engine('html', engine.mustache);
app.set('view engine', 'html');

// Mapping the controllers
var SignController = require('./api/controllers/SignController');
app.use('/signs', SignController);
app.set

// Load HTML
app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/home.html');
  //__dirname : It will resolve to your project folder.
});

module.exports = app;
