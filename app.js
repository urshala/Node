const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow 'Access-Control-Allow-Origin'
// app.use((req,res,next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
// 	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
// 	next();

// });

const mongoose = require('mongoose');
//mongoose.connection.openUri('mongodb://localhost/Ecommerce');
mongoose.connection.openUri('mongodb://Deepak:<password>@deepakcluster-shard-00-00-houmu.mongodb.net:27017,deepakcluster-shard-00-01-houmu.mongodb.net:27017,deepakcluster-shard-00-02-houmu.mongodb.net:27017/Ecommerce?ssl=true&replicaSet=DeepakCluster-shard-0&authSource=admin')

//const port = process.env.PORT || 8080;

const router = require('./Router/my-router');
const cartRouter = require('./Router/cart-router');
app.use('/Pshop', router);
app.use('/cart', cartRouter);


app.listen(8080, () => console.log('Server running at port 4200'));