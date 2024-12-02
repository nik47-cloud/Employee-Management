import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  course: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
