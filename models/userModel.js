const mongoose = require("mongoose");

// schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is reqiured"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is requred"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "clinet",
      enum: ["clinet", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?q=circle%20user%20profile&imgurl=https%3A%2F%2Fstatic-00.iconduck.com%2Fassets.00%2Fprofile-circle-icon-512x512-zxne30hp.png&imgrefurl=https%3A%2F%2Ficonduck.com%2Ficons%2F180867%2Fprofile-circle&docid=8qCF3TmdBFRLtM&tbnid=NymGi8yszBqwFM&vet=12ahUKEwicwNaY2O6NAxWPSmwGHTqYO2oQM3oECCAQAA..i&w=512&h=512&hcb=2&ved=2ahUKEwicwNaY2O6NAxWPSmwGHTqYO2oQM3oECCAQAA",
    },
  },
  { timestamps: true }
);

// export
module.exports = mongoose.model("User", userSchema);
