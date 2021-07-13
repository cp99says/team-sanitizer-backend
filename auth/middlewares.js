const app=require('express')()
const jwt=require('jsonwebtoken')
const patient_model=require('./../models/patient_profile')
const doctor_model=require('./../models/doctor_profile')

exports.verify=async(req,res,next)=>{

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    {
      const token=req.headers.authorization.split(' ')[1]      
      jwt.verify(token,process.env.jwtSecret,(err,user)=>{
        if(err){          
          return res.json({
            status: 'failure',
            message: 'invalid token'
          })
        }
        else {
          const decoded_token=jwt.decode(token, process.env.jwtSecret)
          var cur_time = Math.round(Date.now()/1000)
          if(cur_time>=decoded_token.exp){
          res.json({
            status: 'failure',
            message: 'token expired, please login again to generate a new token'
           })
          }
         else {                
           next()
          }
        }
      })
      
    }
    else {
        res.json({
            status: 'failure',
            message: 'please provide an auth token'
        })
    }

    
}

// const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF0aWZAamF5YWhvIiwiZW1haWwiOiJhdGlmX2hvc3NhaW5AbGl2ZS5jb20iLCJwaG9uZSI6ODgwMjIxNjkwMSwicm9sZSI6ImRvY3RvciIsInN0YXR1cyI6MCwiaXNzdWVkX2F0IjoiSnVseSAxMnRoIDIwMjEsIDk6MTY6MzkgcG0iLCJpYXQiOjE2MjYxMDQ3OTksImV4cCI6MTYyNjEwNjU5OX0.bTOAXbyL5u-F1J_Iw83zelt-8dsDPwtPp-Wi7DBjJmc'
// const decoded=jwt.verify(token,process.env.jwtSecret)
// console.log(decoded)