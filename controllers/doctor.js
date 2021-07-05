const express = require("express");
const patient_model = require("../models/patient_profile.js");
const doctor_profile = require("../models/doctor_profile");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.send_doctor_details = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    var date = moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a");
    const data = new doctor_profile({
      name: req.body.name,
      doctor_id: uuidv4(),
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phone: req.body.phone,
      speciality: req.body.speciality,
      address: req.body.address,
      status: 0,
      role: "doctor",
      joined_on: date,
      fee: req.body.fee,
      experience: req.body.experience,
    });
    const doctor_details = await data.save();
    res.status(201).json({
      status: "success",
      doctor_details,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.get_all_doctor_details = async (req, res) => {
  try {
    const doctors = await doctor_profile.find();
    res.status(201).json({
      status: "success",
      total_doctors: doctors.length,
      doctors,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.get_doctor_by_username = async (req, res) => {
  try {
    const parameter = req.body.username;
    const data = await doctor_profile.find({ username: parameter });
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `doctor with username ${parameter} not found`,
      });
    } else {
      res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
exports.get_doctor_by_speciality = async (req, res) => {
  try {
    const spec = req.body.speciality;
    const data = await doctor_profile.find({ speciality: spec });
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `doctor with speciality ${spec} not found`,
      });
    } else {
      res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
exports.get_doctor_by_status = async (req, res) => {
  try {
    const status = req.body.status;
    const data = await doctor_profile.find({ status: status });
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `doctor with speciality ${spec} not found`,
      });
    } else {
      res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
exports.get_doctor_by_fee_lt = async (req, res) => {
  try {
    const value = req.params.value;
    const data = await doctor_profile.find({ fee: { $lt: value } });
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `doctor with fee less than ${value} not found`,
      });
    } else {
      res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {}
};

exports.get_doctor_by_fee_gt = async (req, res) => {
  try {
    const value = req.params.value;
    const data = await doctor_profile.find({ fee: { $gt: value } });
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `doctor with fee less than ${value} not found`,
      });
    } else {
      res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {}
};
