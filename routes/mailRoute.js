var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');



var jsonParser = bodyParser.json();

var transport = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'paul.souvestre@gmail.com',
      pass: 'warrior707400'
   }
});


router.route('/')
      .post(jsonParser, function(request, response){
         transport.sendMail({
            from: request.body.usermail,
            to: "paul.souvestre@gmail.com",
            subject: 'New client !',
            text: 'Mail received : ' + request.body.usermail,
            html: '<h1>Hello</h1>, Une personne veut suivre le projet ! ' + request.body.usermail
         },function(err){
            if (err) throw err;
            response.send('Mail envoyé !');
         })
      });

module.exports = router;
