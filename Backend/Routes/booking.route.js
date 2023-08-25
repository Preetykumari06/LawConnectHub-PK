const express = require("express")
const BookingRoute = express()
const { BookingModel } = require("../Model/booking.model")
const auth=require("../middleware/auth")
BookingRoute.post("/check",async (req, res) => {
    const { lawyer, client, date, time ,email} = req.body
    try {
        // if (!validateDateFormat(date)) {
        //     return res.status(400).json({ error: "Invalid date format. Please use dd/mm/yy format." })
        // }
    
        // if (!validateTimeFormat(time)) {
        //     return res.status(400).json({ error: "Invalid Time format. Please use 24 hrs clock only and use only AM and PM.Time must be between 9 AM to 8PM" })
        // }
        
        const existingAppointment = await BookingModel.findOne({ lawyer,date,time });
        // console.log(existingAppointment)
        if (existingAppointment) {
            console.log(existingAppointment)
            return res.status(409).json({ error: 'This time slot is already booked.' });
        }
        return res.status(200).json({msg:"This time slot is available"})
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})

BookingRoute.get("/allappoinment",async(req,res)=>{
    const allappoinment=await BookingModel.find()
    return res.status(200).send({allappoinment})
})
BookingRoute.get("/client",auth, async (req, res) => {
    const userID = req.body.userID
    try {
        const bookings = await BookingModel.findById(userID)
        if (!bookings) {
            return res.status(200).json({ msg: "No bookings found" })
        }
        return res.status(200).json({ bookings })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})
BookingRoute.get("/lawyer",auth, async (req, res) => {
    const userID = req.body.userID
    try {
        const bookings = await BookingModel.findById(userID)
        if (!bookings) {
            return res.status(200).json({ msg: "No bookings found" })
        }
        return res.status(200).json({ bookings })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }

})
BookingRoute.put("/update/:id", async (req, res) => {
    const appointmentId = req.params.id;
    const { lawyer, client, date, time } = req.body
    try {
        if (!validateDateFormat) {
            return res.status(400).json({ error: "Invalid date format. Please use dd/mm/yy format." })
        }
        if (!validateTimeFormat) {
            return res.status(400).json({ error: "Invalid Time format. Please use 12 hrs clock only and use only AM and PM.Time must be between 9 AM to 8PM" })
        }
        const existingAppointment = await BookingModel.findById( appointmentId );
        if (!existingAppointment) {
            return res.status(409).json({ message: 'This booking is not found' });
        }

        existingAppointment.lawyer = lawyer;
        existingAppointment.client= client;
        existingAppointment.date = date;
        existingAppointment.time = time;

        await existingAppointment.save();
        return res.status(200).json({ msg: `your appointment is updated for  ${date} with ${lawyer}` })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error)
    }
})

BookingRoute.delete("/cancel/:id", async (req, res) => {

    try {
        const appointmentId = req.params.id;


        const existingAppointment = await BookingModel.findById(appointmentId);
        if (!existingAppointment) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }


        await BookingModel.findByIdAndDelete(appointmentId);

        return res.status(200).json({ message: 'Appointment cancelled successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})
function validateDateFormat(Date) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{2}$/;
    return dateRegex.test(Date);
}
function validateTimeFormat(time) {
    const timeRegex = /^(1[012]|0[0-9]|2[0-3]):(30|00)$/;
    
    return timeRegex.test(time);
}
module.exports={BookingRoute}