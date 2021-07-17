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
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email already exists, please enter a unique email"],
  },
  phone: {
    type: String,
    required: true,
    unique: [true, "phone already exists, please enter a unique phone"],
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
  medical_details: [
    {
      prescribed_on: {
        type: String,
      },
      file_name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Patient_details", schema);
