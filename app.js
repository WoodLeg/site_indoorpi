var express = require('express');
var app = express();
var morgan = require('morgan');


var mainRoute = require('./routes/mainRoute');
var mailRoute = require('./routes/mailRoute');

app.use(express.static('public'));
app.use(morgan('dev'));

// Routing
app.use('/', mainRoute);
app.use('/mail', mailRoute);

var port = process.env.port || 8080;
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
