var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var controller = require('../controllers/authenticateController');
var jsonParser = bodyParser.json();

router.use(function(req, res, next) { // Set headers for Token authentication
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

router.route('/')
      .post(jsonParser, controller.authUser);

module.exports = router;
