const Razorpay=require('razorpay')
const moment=require('moment')
const crypto=require('crypto')
const doctor_model = require('./../models/doctor_profile')
const patient_model = require('./../models/patient_profile')
const payments_model = require('./../models/payments_model')
require('dotenv/config')
var instance = new Razorpay({ key_id: process.env.rzp_key_id, key_secret: process.env.rzp_secret })

exports.send_order_id = async(req,res)=>{
    const doctor = req.query.issued_by
    if(!doctor){
        return res.status(201).json({
            status: "failure",
            message: `please enter a doctor's username`,
          });
    }    
    const patient = req.query.patient_username
    if(!patient){
        return res.status(201).json({
            status: "failure",
            message: `please enter patient's username`,
          });
    } 
    const doctor_details = await doctor_model.findOne({username:doctor})
    const patient_details = await patient_model.findOne({username:patient})
    
    if(doctor_details == null || patient_details == null ){
        return res.status(404).json({
            status: "failure",
            message: `doctor with username ${doctor} or patient with username ${patient} not found`,
          });
    }
    else {
        
        var date = moment().utcOffset("+05:30").format("MMMM Do YYYY, h:mm:ss a");
        var options = {
            amount: doctor_details.fee*100,  
            currency: "INR",
            receipt: `${date}`
          };
          instance.orders.create(options,  async function(err, order) {
            const data = new payments_model({
                patient_username: patient_details.username,
                issued_by: doctor_details.username,
                order_id: order.id,
                order_id_issued_on: date
            })
            const a = await data.save()
            return res.status(201).json({
                status: "success",
                message: `hit the checkout api with order_id`,
                order_id: order.id
              });
              
          });
          
    }
}

exports.authorize_payments= async(req,res)=>{
    const issued_to = req.query.issued_to
    const data = await payments_model.find({patient_username:issued_to}).sort({_id: -1})
    if(data.length == 0){
        return res.status(404).json({
            status: "failure",
            message: `order_id issued to ${issued_to} not found, please enter valid email id`,
          });
        }   
    const orderid = data[0].order_id
    const signature = req.query.signature
    const paymentId = req.query.payment_id
    const hmac = crypto.createHmac('sha256', process.env.rzp_secret).update(orderid + "|" + paymentId).digest('hex')
    if (hmac == signature) {
        return res.status(201).json({
            status: "success",
            message: 'payment successful',
            payment_authorized: true
          });
        
    }
    else {
        return res.status(201).json({  
            status: "failure",
            message: 'payment failure',
            payment_authorized: false
          });
    }
}