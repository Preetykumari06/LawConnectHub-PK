const express = require("express")
const {db}=require("./Config/db")
const cors = require("cors")
const lawyerroute = require("./Routes/lawyer.routes")
require("dotenv").config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())

app.use("/lawyer", lawyerroute)
app.listen(port, () => {
    try {
        db()
        console.log(`Server is running on port ${port}`)
    } catch (error) {
        console.error(error)
    }

})


