const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

const bcrypt = require('bcrypt');

//body params: uuid

/* response:
    {
      name: String,
      email: String,
      phone: String,
      addressLine1: String,
      addressLine2: String,
      state: String
    }
*/

router.get('/userDetails', async (req, res) => {

  const id = req.body.uuid

  try{
      const user = await User.findOne({ uuid: id});

      responseObject = []

      responseObject.push({
        name: user.name,
        email: user.email,
        phone: user.phone,
        addressLine1: user.addressLine1,
        addressLine2: user.addressLine2,
        state: user.state
      })

      res.json({
        userDetails: responseObject
      })
  }catch(err){
      res.json({message: err.message});
  }
});

//body params: uuid

/* response:
    {
      message: String
    }
*/

router.put('/updateDetails', async (req, res) => {

  const id = req.body.uuid

  try{
      await User.findOneAndUpdate(
        { uuid: id },
        { $set: { 
          status: "out of stock" 
        } },
        {
          name: req.body.name,
          phone: req.body.phone,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          state: req.body.state
        }
      )
      res.json({ message: "User details have been successfully updated"})
  }catch(err){
      res.json({message: err.message});
  }
});

//body params: uuid, password

/* response:
    {
      message: String
    }
*/

router.delete('/deleteUser', async (req, res) => {

  const id = req.body.uuid
  var givenPassword

  if('password' in req.body.uuid){
    givenPassword = req.body.password
  }

  try{
      const user = await User.findOne({ uuid: id});

      if('password' in user){
        bcrypt.compare(givenPassword, user.password, async (err, result) => {
          if (err) {
            res.json({message: err.message})
          } else if (result) {
            await User.deleteOne({ uuid: user.uuid}).then((user) => res.json({ message: `${user.name} was deleted`}))
          } else {
            res.json({ message: "Password didn't match"})
          }
        });
      }

      res.json({
        userDetails: responseObject
      })
  }catch(err){
      res.json({message: err.message});
  }
});

//body params: uuid

/* response:
    {
      name: String,
      desc: String,
      price: Number,
      imgUrl: String,
      region: String,
      type: String,
    }
*/

router.get('/cart', async (req, res) => {

  const id = req.body.uuid

  try{
    const user = await User.findOne({ uuid: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else{
      const cart = user.cart;

      responseObject = []

      for(item in cart){
        const product = await Product.findById(item.id)
        responseObject.push({
          name: product.name,
          desc: product.desc,
          price: product.price,
          imgUrl: product.imageUrl,
          type: product.type,
        })
      }
      res.json({
        products: responseObject
      })
    }
  }
  catch(error){
    res.status(400).json({ message: err.message }); 
  }
})

//body params: uuid, pid[]

/* response:
    {
      message: String
    }
*/

router.put('/addToCart', async (req, res) => {

  const id = req.body.uuid
  const products = req.body.products //it is an array of pid

  var oldCart = await User.findOne({ uuid: id }).cart;

  for(itemID in products){
    for(addedItem in oldCart){
      if(itemID == addedItem.pid){
        addedItem.qty = addedItem.qty + 1
      }
      else(
        oldCart.push({
          id: itemID,
          qty: 1
        })
      )
    }
  }
    
  try{
    const user = await User.findOneAndUpdate(
      { uuid: id },
      { $set: { 
        cart: oldCart
      } }
    ).then(
      res.json({message: 'Successfully added to cart'})
    )
    
  }
  catch(error){
    res.status(400).json({ message: err.message }); 
  }
})


//body params: uuid, name, email

/* response:
  message: String
*/

router.post('/googleLogin', async (req, res) => {
  try{
    const user = new User({
        uuid: req.body.uuid,
        name: req.body.name,
        email: req.body.email
    });

    try{
        const savedUser = await user.save();
        res.send({message: `${savedUser.name} is now logged in`});
    }
    catch(err){
        res.status(400).send(err.message);
    }
  }catch(err){
    res.status(400).send(err.message);
  }
})

module.exports = router;