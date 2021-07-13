const express = require("express");
const app = express();
const doctor = require("../controllers/doctor");
const patient=require('../controllers/patient')
const login=require('./../auth/login')
const verify=require('./../auth/middlewares')
const payments=require('./../controllers/payments')

//login route
app.route('/login').post(login.login)

// all doctor routes

app.route("/doctor").get(verify.verify,doctor.get_all_doctor_details).post(doctor.send_doctor_details);
app.route("/doctor/username").get(verify.verify,doctor.get_doctor_by_username);
app.route("/doctor/speciality").get(verify.verify,doctor.get_doctor_by_speciality);
app.route("/doctor/status").get(verify.verify,doctor.get_doctor_by_status);
app.route("/doctor/fee/lt").get(verify.verify,doctor.get_doctor_by_fee_lt);
app.route("/doctor/fee/gt").get(verify.verify,doctor.get_doctor_by_fee_gt);
app.route("/doctor/experience/lt").get(verify.verify,doctor.get_doctor_by_experience_lt);
app.route("/doctor/experience/gt").get(verify.verify,doctor.get_doctor_by_experience_gt);

//all patient routes

app.route('/patient').get(verify.verify,patient.get_all_patient_details).post(patient.send_patient_details)
app.route('/patient/username').get(verify.verify,patient.get_patient_by_username)
app.route('/patient/send_medical_details').post(patient.send_medical_details)


//all payments routes

app.route('/payments/get_order_id').get(payments.send_order_id)
app.route('/payments/authorize_payments').get(payments.authorize_payments)


module.exports = app;

