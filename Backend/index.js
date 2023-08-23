const express = require("express")
const {db}=require("./Config/db")
const cors = require("cors")
require("dotenv").config()
const port = process.env.PORT
const app = express()

app.use(express.json())
app.use(cors())


app.listen(port, () => {
    try {
        db()
        console.log(`Server is running on port${port}`)
    } catch (error) {
        console.error(error)
    }

})


