const app = require("express")();
const jwt = require("jsonwebtoken");
const patient_model = require("./../models/patient_profile");
const doctor_model = require("./../models/doctor_profile");
const bcryptjs = require("bcryptjs");
require("dotenv/config");

exports.login = async (req, res, next) => {
  const email = req.query.email;
  if (!email) {
    return res.json({
      status: "failure",
      message: `please enter email`,
    });
  }
  const pswd = req.query.password;
  if (!pswd) {
    return res.json({
      status: "failure",
      message: `please enter password`,
    });
  }
  var data = await doctor_model.find({ email: email });
  if (data.length == 0) {
    var data = await patient_model.find({ email: email });
    if (data.length == 0) {
      return res.json({
        status: "failure",
        message: `${email} not found, please register`,
      });
    }
  }
  var correct_password = await bcryptjs.compare(pswd, data[0].password);
  //console.log(data);
  if (correct_password) {
    //console.log(data[0].unique_id);
    var token = jwt.sign(
      {
        username: data[0].username,
        email: data[0].email,
        unique_id: data[0].unique_id,
        phone: data[0].phone,
        role: data[0].role,
        status: data[0].status,
      },
      process.env.jwtSecret,
      { expiresIn: "4h" }
    );
    var decoded_values = jwt.decode(token, process.env.jwtSecret);
    // console.log(decoded_values);
    return res.json({
      status: "success",
      message: "login successful",
      token,
      decoded_values,
    });
  } else {
    return res.json({
      status: "failure",
      message: `invalid password, please try again`,
    });
  }
};
