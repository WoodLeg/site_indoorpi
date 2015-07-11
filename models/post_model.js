var mongoose = require('mongoose');

var Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;

var Post = new Schema({
   id : ObjectId,
   title : String,
   content : String,
   date : String,
   display: String,
   img : String
});

var postModel = mongoose.model('postModel', Post);


module.exports = postModel;
