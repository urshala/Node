const express = require('express');
const cartRouter = express.Router();
const Cart = require('../Model/cart');
const Product = require('../Model/product-model');


cartRouter.route('/add')
	.post((req,res) => {
		let newCartItem = new Cart(req.body);
		console.log(req.body);
		newCartItem.save((err, savedCartItem) => {
			if (err)
				res.send(err)
			res.json(savedCartItem);
		});
	})

	.get((req,res) =>{
		Cart.find({})
			.populate({path:'product', model:'Product'})
			.exec((err, cartItem) => {
				if(err)
					res.send(err)
				res.json(cartItem);
			})


	});

cartRouter.route('/add/product')
	.put((req,res) =>{
		console.log('Adding item to wishlist');
		console.log(req.body);
		Product.findOne({_id:req.body.productId}, (err, foundProduct)=>{
			if(err)
				res.send(err)
			Cart.update({_id:req.body.cartId}, {$addToSet:{product:foundProduct._id}}, (err, updatedCart) =>{
				if(err)
					res.send(err)
				res.json(updatedCart)
			})
		});
	});

cartRouter.route('/delete')
	.delete((req,res) => {
		Cart.update({_id: req.body.cartId},
			{$pull: {product: req.body.productId}}, (err, deleted) =>{
				if(err)
					res.send(err)

				res.send(deleted);
			})
	})


cartRouter.use('/', (req,res,next) => {
	console.log('At cart endpiont');
	next();
})
module.exports = cartRouter;