// server.js
var app = require('./app');


// Load HTML
app.get('/',function(req,res){
  res.sendFile(__dirname + '/home.html');
  //__dirname : It will resolve to your project folder.
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});