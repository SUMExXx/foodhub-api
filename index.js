// import { fbApp } from "./firebase.js";
// const cred = require('./stor-e-by-ecell-firebase-adminsdk-i1qnv-c0a67881c5')
const express = require('express');
const connectDB = require('./db');
const Product = require('./models/product')
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

var app = express()

app.use(express.json());

connectDB();

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8080;

app.use('/products', productRoutes);

app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});