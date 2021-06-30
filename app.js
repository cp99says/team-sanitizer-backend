const express=require('express')
const app=express()
const mongoose=require('mongoose')
mongoose.connect('mongodb+srv://chetan:hackRx123@cluster0.52tae.mongodb.net/sanitizer?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},()=>{
    console.log(`connected to mongoDB atlas`)
})
// mongoose.connect('mongodb://localhost:27017/myapp',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},()=>{
//     console.log('connected to mongoDB local')
// })

app.get('/',(req,res)=>{
   res.send('hello aws')
})

const PORT= 3500
app.listen(PORT,()=>{
    console.log(`server started at port: ${PORT}`)
})