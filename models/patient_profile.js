const mongoose = require("mongoose");
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  patient_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
});

module.exports = mongoose.model("Patient_details", schema);
