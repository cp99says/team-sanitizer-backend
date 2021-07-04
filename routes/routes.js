const express = require("express");
const app = express();
const index = require("./../controllers/index");

app
  .route("/doctor")
  .get(index.get_all_doctor_details)
  .post(index.send_doctor_details);

app.route("/doctor/username").get(index.get_doctor_by_username);
app.route("/doctor/speciality").get(index.get_doctor_by_speciality);
app.route("/doctor/status").get(index.get_doctor_by_status);
app.route("/doctor/fee").get(index.get_doctor_by_fee);

module.exports = app;
