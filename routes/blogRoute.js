var express = require('express');
var router = express.Router();

var controller = require('../controllers/blogController');


router.param('name', function(request, response, next, name){
   request.name = name;
   next();
})


router.route('/:name')
      .get(controller.getPost);

router.route('/')
      .get(controller.getAllPosts);


module.exports = router;
