const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, address, phone } = req.body;
    // validate
    if (!username || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    // check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already register please login",
      });
    }
    // hashing passwor
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);
    // create new user
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered!",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};
// LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide emaill or password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // check user password | compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Ivalid credentials",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //hide password when req
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
