const express = require('express')
const app = express()
const mongoose = require('mongoose');
const port = 3000

require('dotenv').config();


const Product = require("./models/productModels");

//json middleware to make our application understand json
app.use(express.json());

//json middleware to use urlencode instead of json to send data
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

/* app.get('/blog', (req, res) => {
    res.send('Hello Blog!!')
  }) */

/* app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) */


  //route to get all products
  app.get('/products' , async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }catch (error){
        res.status(500).json({message : error.message});
    }
  })

  //route to get single product based on id
  app.get('/products/:id' , async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch (error){
        res.status(500).json({message : error.message});
    }
  })


  //route to send product in database
  app.post("/products", async (req, res) => {
    /* console.log(req.body);
    res.send(req.body); */
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }

    catch(error) {
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
  })


  //route to update product in database
  app.put('/products/:id' , async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }catch (error){
        res.status(500).json({message : error.message});
    }
  })


   //route to delete product in database
   app.delete('/products/:id' , async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
    }catch (error){
        res.status(500).json({message : error.message});
    }
  })

  mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected!');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
