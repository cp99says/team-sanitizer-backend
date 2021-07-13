const mongoose=require('mongoose')
const schema=mongoose.Schema({
    patient_username:{
        type:String,
        required:true
    },
    issued_by:{
        type:String,
        required:true
    },
    order_id:{
        type:String,
        required:true
    },
    order_id_issued_on:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Payment_details", schema);