const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  unique_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists, please enter a unique username"],
  },
  password: {
    type: String,
    required: true,
    // select: false,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists, please enter a unique email"],
  },
  phone: {
    type: Number,
    required: true,
    unique: [true, "phone already exists, please enter a unique phone"],
  },
  speciality: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  joined_on: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Doctor_details", schema);
