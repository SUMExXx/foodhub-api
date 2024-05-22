const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        desc: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            trim: true
        },
        image: {
            type: String,
            required: true,
            trim: true
        },

    } 
);

module.exports = mongoose.model("Product", productSchema);