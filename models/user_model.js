var mongoose = require('mongoose');

var Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
   email : String,
   password: String,
   token : String
});


module.exports = mongoose.model('User', UserSchema);
