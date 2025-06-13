const mongoose = require("mongoose");
const colors = require("colors");

// funtion mongooe database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.log("DB Error", error);
  }
};

module.exports = connectDB;
