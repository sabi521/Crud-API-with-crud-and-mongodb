const express = require('express')

const Product = require('../models/productModels');

const {getProducts , getProduct, createProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const router = express.Router()
  
    //route to get all products
    router.get('/', getProducts);
  
    //route to get single product based on id
    router.get('/:id' , getProduct)
  
  
    //route to send product in database
    router.post("/", createProduct)
  
  
    //route to update product in database
    router.put('/:id' , updateProduct)
  
  
     //route to delete product in database
     router.delete('/:id' , deleteProduct)


    module.exports = router;
