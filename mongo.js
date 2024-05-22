require('dotenv').config();

const mongo = {
    // url: "mongodb://localhost:27017/stor-e"
    //"mongodb+srv://SUMExXx:8974863731%40Sd@sumexxx.6a3phqy.mongodb.net/?retryWrites=true&w=majority&appName=SUMExXx"
    url: process.env.MONGODB_URL
}

module.exports = mongo; 