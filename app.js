// app.js
var express = require('express');
var app = express();
var db = require('./db');
var engine = require('consolidate'); // Required in order to use Mustache

// Pick an HTML Rendering Engine
app.set('views', __dirname + '/views');
app.engine('html', engine.mustache);
app.set('view engine', 'html');

// Mapping the controllers
var SignController = require('./api/controllers/SignController');
app.use('/signs', SignController);

// Load HTML
app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/home.html');
  // TO DO: add a error handler for the response
});

module.exports = app;
