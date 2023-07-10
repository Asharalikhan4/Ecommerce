require("dotenv").config();
const mongoose = require("mongoose");

const dbConnect = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database is connected.")
    } catch (error) {
        console.log(`Error : ${error}`);
    }
};

module.exports = dbConnect;