var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    paymentId: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    amount:{type:String, required: true},
    cart: {type: Object, required: true},
    address_zip: {type: String, required: true}


});

module.exports = mongoose.model('Order', schema);
