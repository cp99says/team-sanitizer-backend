const express = require("express");
const app = express();
const doctor = require("../controllers/doctor");
const patient=require('../controllers/patient')


// all doctor routes

app.route("/doctor").get(doctor.get_all_doctor_details).post(doctor.send_doctor_details);
app.route("/doctor/username").get(doctor.get_doctor_by_username);
app.route("/doctor/speciality").get(doctor.get_doctor_by_speciality);
app.route("/doctor/status").get(doctor.get_doctor_by_status);
app.route("/doctor/fee/lt").get(doctor.get_doctor_by_fee_lt);
app.route("/doctor/fee/gt").get(doctor.get_doctor_by_fee_gt);
app
  .route("/doctor/experience/lt")
  .get(doctor.get_doctor_by_experience_lt);
app
  .route("/doctor/experience/gt")
  .get(doctor.get_doctor_by_experience_gt);

//all patient routes

app.route('/patient').get(patient.get_all_patient_details).post(patient.send_patient_details)
app.route('/patient/username').get(patient.get_patient_by_username)
app.route('/patient/send_medical_details').post(patient.send_medical_details)



module.exports = app;
