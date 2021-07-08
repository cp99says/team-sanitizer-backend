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
        patient_id: uuidv4(),
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
        patient_details,
      });
    } catch (err) {
      res.send(err);
    }
  };

  exports.get_all_patient_details = async (req, res) => {
    try {
      const patients = await patient_model.find();
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
      const data = await patient_model.find({ username: parameter });
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

  exports.send_medical_details = async(req,res)=>{
      const username=req.query.username
      var date = moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a");
      const id=req.query.id
      const data= await patient_model.findOneAndUpdate({username:username},{
          $push:{'medical_details':{'prescribed_on':date,'file_name':id}}
      })
      res.send(data)
  }