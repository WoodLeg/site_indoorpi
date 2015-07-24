var Customer = require('./../models/customer_model');

module.exports.getCustomers = function(request, response) {
   Customer.find({}, function(err, value){
      if (err) throw err;
      console.log(value);
      response.send(value);
   });
}

module.exports.addCustomer = function(request, response) {
   var newCustomer = new Customer({email: request.body.usermail});
   newCustomer.save(function(err, res){
      if (err) throw err;
      response.status(200).send(res);
   });
}

module.exports.deleteCustomer = function(request, response) {
   console.log(request.id);
   Customer.findOne({_id : request.id}, function(err, value){
      if (err) throw err;
      Customer.remove(value, function(err, res){
         if (err) throw err;
         response.status(200).send(res);
      })
   })
}
