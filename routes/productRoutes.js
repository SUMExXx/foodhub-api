const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const upload = multer({ storage: multer.memoryStorage() });

router.get('/all', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.json({message: err});
    }
});

router.get('/breakfast', async (req, res) => {
  try{
    const product = await Product.find({type: 'Breakfast'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/dessert', async (req, res) => {
  try{
    const product = await Product.find({type: 'Dessert'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/drink', async (req, res) => {
  try{
    const product = await Product.find({type: 'Drink'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/starter', async (req, res) => {
  try{
    const product = await Product.find({type: 'Starter'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/chinese', async (req, res) => {
  try{
    const product = await Product.find({type: 'Chinese'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/japanese', async (req, res) => {
  try{
    const product = await Product.find({type: 'Japanese'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/indian', async (req, res) => {
  try{
    const product = await Product.find({type: 'Indian'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/italian', async (req, res) => {
  try{
    const product = await Product.find({type: 'Italian'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.get('/mexican', async (req, res) => {
  try{
    const product = await Product.find({type: 'Mexican'});
    res.send(product);
  }catch(err){
    res.status(400).send(err.message); 
  }
})

router.post('/new', upload.single('image'), async (req, res) => { //'image' is the name of the body parameter for file

  var imgUrl =""

  try {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'foodhub/menu',
        resource_type: 'image',
      },
      async (error, result) => {
        if (error) {
          return res.status(500).send('Error uploading image to Cloudinary');
        }
        imgUrl = result.public_id
        const optimizedUrl = cloudinary.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });
        try{
          const product = new Product({
              name: req.body.name,
              desc: req.body.desc,
              price: parseInt(req.body.price, 10),
              imageUrl: optimizedUrl,
              type: req.body.type
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
      }
    );

    uploadStream.end(req.file.buffer);
    
  } catch (error) {
    res.status(500).send('Error adding food item');
  }
});

router.put('/edit', async (req, res) => {
  try{
    await Product.findOneAndUpdate(
      { pid: req.body.pid },
      { $set: req.body },
    ).then(() => {res.json({ message: "Food item data has been successfully updated"})})
  }catch(err){
    res.status(400).send(err.message);
  }
})

router.delete('/delete', async (req, res) => {
  try{
    await Product.deleteOne({ pid: req.body.pid}).then(() => res.json({ message: `Item was deleted`}))
  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = router;