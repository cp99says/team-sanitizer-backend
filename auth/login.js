const app=require('express')()
const jwt=require('jsonwebtoken')
const patient_model=require('./../models/patient_profile')
const doctor_model=require('./../models/doctor_profile')
const bcryptjs=require('bcryptjs')
const moment = require('moment')
require('dotenv/config')

exports.login=async(req,res)=>{
    const email=req.query.email
    const pswd=req.query.password
     const role=req.query.role
    async function login(role){
        switch (role) {
            case "doctor":          
                  const doctor_exists=await doctor_model.findOne({email})                  
                  if(doctor_exists) {
                      const dr_status = await bcryptjs.compare(pswd,doctor_exists.password)                      
                      if(dr_status){                        
                        const token = jwt.sign({
                            username: doctor_exists.username,
                            email: doctor_exists.email,
                            id: doctor_exists.patient_id,
                            phone: doctor_exists.phone, 
                            role: doctor_exists.role,
                            status: doctor_exists.status,                            
                        },process.env.jwtSecret,{expiresIn:'30m'})
                        return res.json({
                            status:"success",
                            message: "login successful",
                            token
                        }) 
                      }
                      else {
                        return res.json({
                            status:"failure",
                            message: "login failure, incorrect email and password combination"                        
                        }) 
                      }
                      
                  }
                  else {
                      return res.json({
                        status:"failure",
                        message: "login failure, email not found"                        
                    }) 
                  }
              
                break;        
            case "patient":
                const patient_exists=await patient_model.findOne({email})                  
                  if(patient_exists) {
                      const patient_status = await bcryptjs.compare(pswd,patient_exists.password)                      
                      if(patient_status){
                        const token = jwt.sign({
                            username: patient_status.username,
                            email: patient_status.email,
                            id: patient_status.patient_id,
                            phone: patient_status.phone, 
                            role: patient_status.role
                        },process.env.jwtSecret,{expiresIn:'30m'})
                        return res.json({
                            status:"success",
                            message: "login successful",
                            token
                        }) 
                      }
                      else {
                        return res.json({
                            status:"failure",
                            message: "login failure, incorrect email and password combination"                        
                        }) 
                      }
                      
                  }
                  else {
                      return res.json({
                        status:"failure",
                        message: "login failure, email not found"                        
                    }) 
                  }
                    break;
        
            default:
                break;
        }
    }
    login(role)
    
}