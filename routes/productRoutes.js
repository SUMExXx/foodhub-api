const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/:id', async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.post('/', async (req, res) => {
  try{
    const product = new Product({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        image: req.body.image
    });

    try{
        const savedProduct = await product.save();
        res.send(savedProduct);
    }
    catch(err){
        res.status(400).send(err.message);
    }
  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = router;