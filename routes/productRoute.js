const express = require('express')

const Product = require('../models/productModels');

const router = express.Router()
  
    //route to get all products
    router.get('/' , async(req, res) => {
      try {
          const products = await Product.find({});
          res.status(200).json(products);
      }catch (error){
          res.status(500).json({message : error.message});
      }
    })
  
    //route to get single product based on id
    router.get('/:id' , async(req, res) => {
      try {
          const {id} = req.params;
          const product = await Product.findById(id);
          res.status(200).json(product);
      }catch (error){
          res.status(500).json({message : error.message});
      }
    })
  
  
    //route to send product in database
    router.post("/", async (req, res) => {
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
    router.put('/:id' , async(req, res) => {
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
     router.delete(':id' , async(req, res) => {
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


    module.exports = router;
