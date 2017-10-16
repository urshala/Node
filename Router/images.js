const fs = require('fs');
const express = require('express');
const ImageRouter = express.Router();
const Image = require('../Model/image-model');



// let newProduct = new Product(req.body);
// 		newProduct.image.data = fs.readFileSync(req.body.image);
// 		newProduct.image.contentType='image/jpg';
// 		newProduct.save


ImageRouter.route('/image')
	.post((req,res) => {
		let newImage = new Image(req.body);
		newImage.image.data = fs.readFileSync(req.body.image);
		newImage.image.contentType = 'image/png';
		newImage.save((err, savedImage) => {
			if (err)
				res.json({Error: 'Could not save image'});
			res.json({Success: 'Image uploaded'})
		});

	});

ImageRouter.route('/image/:productId')
	.get((req,res) => {
		Image.findOne({product: req.params.productId}, (err, foundImage) => {
			if  (err)
				res.json({Error: 'Could not find the image'});
			var fimage = new Buffer(foundImage.image.data).toString('base64');
			res.send(fimage);
		});
	});

ImageRouter.use('/', (req,res,next) => {
			console.log('At image endpoint');
			next();
		});

module.exports = ImageRouter;