var express = require('express');
var app = express();
var morgan = require('morgan');


app.use(morgan('dev'));


app.get('/', function(request, response){
      response.send('ok');
});





var port = process.env.port || 8080;
app.listen(port, function(){
    console.log('Server listening on port ' + port);
});
