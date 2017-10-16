const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const ImageSchema = new mongoose.Schema({
	product: {type: ObjectId, ref:'Product', required:true},
	image : { data:Buffer, contentType:String}
});


module.exports = mongoose.model('Image', ImageSchema);