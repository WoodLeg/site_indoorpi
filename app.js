var express = require('express');
var app = express();
var morgan = require('morgan');

var mainRoute = require('./routes/mainRoute');

app.use(express.static('public'));
app.use(morgan('dev'));

// Routing
app.use('/', mainRoute);

var port = process.env.port || 8080;
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
