const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
	name: {type:String, unique:false, required: true},
	price: {type:Number, required:true},
	color:{type:String, required:false},
	//image:{data:Buffer, contentType:String},
	units:{type:Number, required:true},
	brand:{type: String},
	description:{type:String},
	date: {type: String, default: new Date().toLocaleDateString()},

});

module.exports = mongoose.model('Product',productSchema);