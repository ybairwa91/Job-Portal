import mongoose from "mongoose";
import validator from "validator";

//Schema
const userSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Name is Require"],
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    validate: validator.isEmail(),
  },
});

export default mongoose.model("User", userSchema);
