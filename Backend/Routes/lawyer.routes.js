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

lawyerroute.post("/doctorpost",auth,role(["admin"]), async (req, res) => {
    try {
        const { image, name, email,password,phoneNo,language,expreince } = req.body
        const newlawyer = new lawyerModel({ image, name, email,password,phoneNo,language,expreince })
        await newlawyer.save()
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: false,
            requireTLS: true,
            auth: {
              user: "prashantkad240999@gmail.com",
              pass: "fnvbvtfqwgtcelib",
            },
          });
      
          const mailOptions = {
            from: "prashantkad240999@gmail.com",
            to: email,
            subject: "Login Credintials",
            html: `<div>
            <p>Hi ${name}, Your Login Credintials are</p>
            <p>Email:- ${email}</p>
            <p>Password:-${password}</p>
            </div>`,
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
        return res.status(200).send({ msg: "lawyer added succesfully",newDoctor })
    } catch (error) {
        return res.status(401).send({ msg: error.message })
    }
})




lawyerroute.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deletelawyer=await lawyerModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"lawyer Deleted"})
})



module.exports = lawyerroute