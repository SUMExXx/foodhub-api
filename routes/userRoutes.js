const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        res.json({message: err.message});
    }
});

router.get('/cart', async (req, res) => {
  try{
    const user = await User.find({uuid: req.body.uuid});
    res.json(user[0].cart);
  }catch(err){
    res.status(400).json({ message: err.message }); 
  }
})

router.post('/cart', async (req, res) => {
  try{
    const cart = await User.find({uuid: req.body.uuid})[0].cart;
    try{
      for(i in req.body.products){
        if(!(i in cart)){
          cart.push(req.body.products[i]);
        }
        else{
          cart[i].quantity += req.body.products[i].quantity;
        }
      }
      user[0].save().then(res.json({message: "success"}));
    }
    catch(err){
      res.status(400).json({ message: err.message }); 
    }
  }
  catch(error){
    res.status(400).json({ message: err.message }); 
  }
})

router.post('/googleLogin', async (req, res) => {
  try{
    const user = new User({
        uuid: req.body.uuid,
        name: req.body.name,
    });

    try{
        const savedUser = await user.save();
        res.send(`${savedUser.name} is now logged in`);
    }
    catch(err){
        res.status(400).send(err.message);
    }
  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = router;