const mongoose = require("mongoose")
const BookingSchema = mongoose.Schema({
    lawyer: { type: String, required: true },
    client: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    email:{type: String, required: true},
    userId:{type:String,required:true}
})
const BookingModel=mongoose.model("Bookings",BookingSchema)

module.exports=BookingModel