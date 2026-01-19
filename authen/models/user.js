const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Field is required"],
  },
  lastName: String,
  email: {
    type: String,
    required: [true, "Field is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  usereType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },
});
module.exports = mongoose.model("User", userSchema);
