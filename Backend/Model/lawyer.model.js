const mongoose=require('mongoose')

const lawyerSchema=mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    phoneNo:Number,
    language:Array,
    expreince:String
})

const lawyerModel=mongoose.model("lawyer",lawyerSchema)

module.exports=lawyerModel