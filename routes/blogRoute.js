var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var controller = require('../controllers/blogController');
var secure = require('../controllers/authenticateController');

var dirname = path.dirname(__dirname);

var jsonParser = bodyParser.json();
var multerParser = multer({
   dest: dirname + '/public/assets/img/blog/',
   rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
},
   onFileUploadStart: function(file, req, res){
      console.info(file.originalname + ' is starting')
   },
   onFileUploadData: function(file, data, req, res){
      console.info(data.length + ' of ' + file.originalname + ' arrived')
   },
   onFileUploadComplete: function(file, req, res){
      console.info(file.originalname + ' uploaded to  ' + file.path);
   },
   onError: function(err, next){
      if (err) throw err;
      next();
   }
});

router.param('name', function(request, response, next, name){
   request.name = name;
   next();
});

router.param('id', function(request, response, next, id){
   request.id = id;
   next();
});

router.route('/edit/:id')
      .post(secure.ensureAuth, multerParser, jsonParser, controller.editPost);

router.route('/:id')
      .get(controller.getPost);

router.route('/:id')
      .delete(secure.ensureAuth, controller.deletePost);

router.route('/')
      .get(controller.getAllPosts);

router.route('/')
      .post(secure.ensureAuth, multerParser, controller.newPost);




module.exports = router;
