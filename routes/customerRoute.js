var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var controller = require('../controllers/customerController');
var jsonParser = bodyParser.json();

router.param('id', function(request, response, next, id){
   request.id = id;
   next();
});


router.route('/')
      .get(controller.getCustomers);

router.route('/')
      .post(jsonParser, controller.addCustomer);

router.route('/:id')
      .delete(controller.deleteCustomer);


module.exports = router;
