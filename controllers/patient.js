const express = require("express");
const patient_model = require("../models/patient_profile.js");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const moment = require("moment");

exports.send_patient_details = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    var date = moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a");
    const data = new patient_model({
      name: req.body.name,
      unique_id: uuidv4(),
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      status: 0,
      role: "patient",
      joined_on: date,
    });
    const patient_details = await data.save();
    res.status(201).json({
      status: "success",
      message: `user created with username ${req.body.username}`,
    });
  } catch (err) {
    res.send(err);
  }
};

exports.get_all_patient_details = async (req, res) => {
  try {
    const patients = await patient_model.find().select("-password");
    res.status(201).json({
      status: "success",
      total_patients: patients.length,
      patients,
    });
  } catch (error) {
    res.send(error);
  }
};

exports.get_patient_by_username = async (req, res) => {
  try {
    const parameter = req.query.username;
    const data = await patient_model
      .find({ username: parameter })
      .select("-password");
    if (data.length === 0) {
      res.status(201).json({
        status: "failure",
        message: `patient with username ${parameter} not found`,
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

exports.send_medical_details = async (req, res) => {
  try {
    const username = req.query.username;
    var date = moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a");
    const id = req.query.id;
    const user_exists = await patient_model
      .find({ username: username })
      .select("-password");
    if (user_exists.length === 0) {
      res.status(404).json({
        status: "failure",
        message: `patient with username ${username} not found`,
      });
    } else {
      const data = await patient_model.findOneAndUpdate(
        { username: username },
        {
          $push: { medical_details: { prescribed_on: date, file_name: id } },
        }
      );
      res.status(201).json({
        status: "success",
        dataUpdated: true,
        data,
      });
    }
    //res.send(user_exists)
  } catch (err) {
    console.log(error);
    res.json(error);
  }
};

exports.get_patient_by_unique_id = async (req, res) => {
  try {
    const id = req.query.unique_id;
    const data = await patient_model
      .findOne({ unique_id: id })
      .select("-password");
    if (data == null) {
      return res.json({
        status: "failure",
        message: `patient with unique_id ${id} not found`,
      });
    } else {
      return res.json({
        status: "success",
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
