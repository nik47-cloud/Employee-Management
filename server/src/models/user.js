import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password Length should be greater than 6"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
