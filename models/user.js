const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
    },
    totalAmount: {
        type: Number,
        default: 0
    }
});

const userSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            immutable: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        cart: {
            items: [cartItemSchema],
            default: []
        },
    } 
);

module.exports = mongoose.model("User", userSchema);