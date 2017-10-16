const express = require('express');
const router = express.Router();

const fs = require('fs');

const Product = require('../Model/product-model');




//create rroutes for the app
router.route('/product')
	//post product
	.post((req,res) => {
		let newProduct = new Product(req.body);
		// newProduct.image.data = fs.readFileSync(req.body.image);
		// newProduct.image.contentType='image/jpg';
		newProduct.save((err,savedProduct) => {
			if (err)
				res.status(404).send(err);
			res.json({message: 'Saved Product', product:savedProduct});
		});

	})


	//get all products
	.get((req,res) => {
		Product.find({}, (err, foundProducts) => {
			if (err)
				res.send(err);
			// foundProducts.forEach((product,index) => {
			// 	let foundImage = foundProducts[index].image.data;
			// 	foundProducts[index].image = (new Buffer(foundImage)).toString('base64');
			// 	// console.log(foundProducts[index].image.toString('base64'));
			// });
			// console.log(foundProducts);
			res.send(foundProducts);
		});
	});


//update, delete, get single product
router.route('/products/:productId')
	.get((req,res) => {
		Product.find({_id:req.params.productId}, (err, foundProduct) => {
			if(err)
				res.json({erro: 'No product found with that name'});
			res.send(foundProduct);
		});
	})

	
	//update the fields
	.put((req,res) => {
		Product.findOne({_id:req.params.productId}, (err,foundProduct)=>{
			if(err){
				res.send(err);
			}else{
				Product.schema.eachPath(field => {
					if(field != '_id' && field != '_v' && req.body[field] != undefined){
						foundProduct[field] = req.body[field];
					}
					foundProduct.save();
				});
				res.send(foundProduct);
			}
		});
	})

	//delete the product
	.delete((req,res) => {
		Product.findOne({_id:req.params.productId}, (err,deletedObj) =>{
			if (err)
				handleErro(err);
			res.json({message:'Deleted product', product:deletedObj});
		});
	});


router.use('/', (req,res,next) => {
			console.log('User logged in');
			next();
		});


handleErro = (err) =>{
	try{
		
		throw 'Something went wrong'
	}
	catch(e){
		console.log('Handled error');
		return
	}
}
module.exports = router;