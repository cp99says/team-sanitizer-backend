const app=require('express')()
const jwt=require('jsonwebtoken')
const patient_model=require('./../models/patient_profile')
const doctor_model=require('./../models/doctor_profile')
const bcryptjs=require('bcryptjs')
require('dotenv/config')

exports.login=async(req,res,next)=>{
    const email=req.query.email
    if(!email){
      return res.json({
        status: 'failure',
        message: `please enter email`
      })
    }
    const pswd=req.query.password  
    if(!pswd){
      return res.json({
        status: 'failure',
        message: `please enter password`
      })
    }    
    var data = await doctor_model.find({email:email})
    if(data.length == 0){
      var data = await patient_model.find({email:email})
      if(data.length == 0){
        return res.json({
          status: 'failure',
          message: `${email} not found, please register`
        })
      }
    }    
    var correct_password = await bcryptjs.compare(pswd,data[0].password)
    if(correct_password){
      var token = jwt.sign({
        username: data.username,
        email: data.email,
        id: data.patient_id,
        phone: data.phone, 
        role: data.role,
        status: data.status,
      },process.env.jwtSecret,{expiresIn:'30m'})
      return res.json({
        status:"success",
        message: "login successful",
        token
      })  
    } 
    else {
      return res.json({
        status: 'failure',
        message: `invalid password, please try again`
      })
    }

      
    
}