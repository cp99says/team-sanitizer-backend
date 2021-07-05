const express = require("express");
const app = express();
const doctor = require("../controllers/doctor");

app
  .route("/doctor")
  .get(doctor.get_all_doctor_details)
  .post(doctor.send_doctor_details);
app.route("/doctor/username").get(doctor.get_doctor_by_username);
app.route("/doctor/speciality").get(doctor.get_doctor_by_speciality);
app.route("/doctor/status").get(doctor.get_doctor_by_status);
app.route("/doctor/fee/lt/:value").get(doctor.get_doctor_by_fee_lt);
app.route("/doctor/fee/gt/:value").get(doctor.get_doctor_by_fee_gt);
app
  .route("/doctor/experience/lt/:value")
  .get(doctor.get_doctor_by_experience_lt);
app
  .route("/doctor/experience/gt/:value")
  .get(doctor.get_doctor_by_experience_gt);

module.exports = app;
