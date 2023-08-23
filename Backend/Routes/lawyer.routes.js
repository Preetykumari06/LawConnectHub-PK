const express = require('express')

const lawyerModel = require('../Model/lawyer.model')

const nodemailer=require("nodemailer")


const lawyerroute = express.Router()



lawyerroute.get("/lawyerget", async (req, res) => {
    try {
        const alllawyer = await lawyerModel.find()
        return res.status(200).send({ alllawyer })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})







module.exports = lawyerroute