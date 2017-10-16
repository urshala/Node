const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;


const cartSchema = new mongoose.Schema({
	product:[{type: ObjectId, ref:'Product'}]
});


module.exports = mongoose.model('Cart', cartSchema);