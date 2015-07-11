var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');



// Connection to the database
mongoose.connect('mongodb://localhost/indoorpi');
mongoose.connection.once('open', function(err){
      if (err) throw err;
      console.log('Connection to database established.');
});


// Import routes
var mainRoute = require('./routes/mainRoute');
var mailRoute = require('./routes/mailRoute');
var blogRoute = require('./routes/blogRoute');
var authenticateRoute = require('./routes/authenticateRoute');

// Middlewares
app.use(express.static('public')); // Config the static folder for rendering
app.use(morgan('dev')); // Log debugging

// Routing
app.use('/', mainRoute);
app.use('/mail', mailRoute);
app.use('/blog', blogRoute);
app.use('/authenticate', authenticateRoute);


process.on('uncaughtException', function(err){
   console.log(err);
});

// Launch application
var port = process.env.port || 8080;
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
