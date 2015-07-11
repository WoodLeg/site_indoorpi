var fs = require('fs');
var path = require('path');

// Rewriting dirname variable to avoid 'routes/' in __dirname
var dirname = path.dirname(__dirname);

// Importing Post Model
var Post = require('../models/post_model');

// Send back all the posts
module.exports.getAllPosts = function(request, response){
   Post.find({}, function(err, values){
      if (err) response.status(500).send(err);
      if (values.length == 0){
         response.status(400).send({message: 'No posts found'});
      } else {
         response.send(values);
      }
   });
}

// Send back a single post
module.exports.getPost = function(request, response){
   Post.findOne({_id: request.id}, function(err, value){
      if (err) throw err;
      if (value == undefined) {
         response.status(400).send({message: 'No posts found'});
      } else {
         response.send(value);
      }
   })
}

// Create a new post
module.exports.newPost = function(request, response){
   var post = new Post({title: request.body.title, img: 'assets/img/blog/' + request.files.file.name, content: request.body.content, date: request.body.date, display:  request.body.display });
   post.save(function(err){
      if (err) throw err;
      response.status(200).send({name: request.body.title, message: 'Post created !'});
   });
}

// Edit Post in the database --
module.exports.editPost = function(request, response){
   // If there is no image upload
   if (request.body.post !== undefined){
         request.body = request.body.post;
   }
   Post.findOne({_id: request.body.id}, function(err, value){
      // If there is no img, no need to update the img path
      if (Object.keys(request.files).length == 0){
         value.title = request.body.title;
         value.img = request.body.img,
         value.content = request.body.content;
         value.date = request.body.date;
         value.display = request.body.display;
         value.save(function(err){
            if (err) throw err;
            response.status(200).send({message: 'Post updated with no new image'});
         });
      } else {
         // New Image --> editing img path
         // Delete the old picture
         var oldPic = value.img;
         fs.exists(dirname +'/public/' + oldPic, function(exists){
            if (exists){
               fs.unlink(dirname + '/public/' + oldPic, function(err) {
                  if (err) throw err;
                  console.log('Update Request: ' + oldPic + ' deleted');
               })
            }
         });
         value.title = request.body.title;
         value.img = 'assets/img/blog/' + request.files.file.name;
         value.content = request.body.content;
         value.date = request.body.date;
         value.display = request.body.display;
         console.log(value);
         value.save(function(err){
            if (err) throw err;
            response.status(200).send({message: 'Post updated with new image'});
         });
      }
   })

}

// Delete post corresponding to the id
module.exports.deletePost = function(request, response){
   Post.findOne({_id: request.id}, function(err, value){
      if (err) throw err;
      console.log(dirname + '/public/' + value.img);
      Post.remove(value, function(err){
         if (err) throw err;
         // Delete the image corresponding to the post
         fs.exists(dirname + '/public/' + value.img, function(exists){
               if ( exists ) {
                  fs.unlink(dirname + '/public/' + value.img, function(err){
                     if (err) throw err;
                     response.status(200).send({message: "Post Deleted", id : request.id});
                  })
               }
         });
      });
   });
}
