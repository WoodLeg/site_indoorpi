// Import UserModel for authentication
var User = require('../models/user_model');
var jwt = require('jsonwebtoken');

function soloUser(){
   var admin = new User();
   admin.email = 'paul.souvestre@gmail.com',
   admin.password = 'test',
   admin.token = jwt.sign({email: admin.email, password: admin.password}, 'test-token');
   User.findOne({email: admin.email, password: admin.password}, function(err, user){
      if (err) throw err;
      if(user){
         console.log('Admin already created');
      } else {
         admin.save(function(err){
            if (err) throw err;
         })
      }
   });
}
soloUser();

module.exports.ensureAuth = function(request, response, next){
   var bearerToken;
   var bearerHeader = request.headers['authorization'];
   console.log(bearerHeader);
   if (typeof bearerHeader !== undefined){
      var bearer = bearerHeader.split(" ");
      var bearerToken = bearer[1];
      request.token = bearerToken;
      next();
   } else {
      response.status(403).send({data: "Wrong token"});
   }
}

module.exports.authUser = function(request, response){
   User.findOne({email: request.body.user.email, password: request.body.user.password}, function(err, user){
      if (err){
         response.send({type: false, data: 'Error occured: ' + err});
      } else {
         console.log(user);
         if (user) {
            response.send({type: true, data: user, token: user.token});
         } else {
            response.send({type: false, data: 'Invalid email/password'});
         }
      }
   })
}
