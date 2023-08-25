const express = require("express")
const {db}=require("./Config/db")
const cors = require("cors")
const lawyerroute = require("./Routes/lawyer.routes")
const LawyerRoutes=require("./Routes/LawyerControllar")
require("dotenv").config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())
const { BookingRoute } = require("./Routes/booking.route")


app.listen(port, () => {
    try {
        db()
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.error(error)
    }

})


