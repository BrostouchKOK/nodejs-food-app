const userModel = require("../models/userModel");

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
    // create new user
    const user = await userModel.create({
      username,
      email,
      password,
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
    const user = await userModel.findOne({ email: email, password: password });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or incorrect password",
      });
    }
    res.status(200).send({
      success: true,
      message: "Login successfully",
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
