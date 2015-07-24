var mongoose = require('mongoose');

var Schema = mongoose.Schema,
   ObjectId = Schema.ObjectId;

var CustomerSchema = new Schema({
   id: ObjectId,
   email : String
});

var Customer = mongoose.model('Customer', CustomerSchema);


module.exports = Customer;
