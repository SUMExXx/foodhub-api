const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    qty: {
        type: Number,
        min: 0,
        max: 100
    }
});

const geoCoordinateSchema = new mongoose.Schema({
    y: {
        type: Number
    },
    x: {
        type: Number
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
        password: {
            type: String,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        addressLine1: {
            type: String,
            trim: true,
        },
        addressLine2: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
            enum: ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
        },
        location: geoCoordinateSchema,
        cart: {
            items: [cartItemSchema],
            default: []
        },
    } 
);

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10); // 10 is the saltRounds
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

module.exports = mongoose.model("User", userSchema);