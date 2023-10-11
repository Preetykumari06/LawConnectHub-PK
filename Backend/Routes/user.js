const express = require('express')

const UserModel = require("../Model/user.model")
//const randomstring = require("randomstring");
const userrouter=express.Router();


const bcrypt = require('bcrypt')
const app = express()
//const path = require("path");
app.use(express.json());


const jwt = require('jsonwebtoken')
require("dotenv").config()

function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

userrouter.post("/res",async(req,res)=>{
    try {
   
        const {name,email,password, mobileno,isVerified,role,token}=req.body;
        const isUserPresent = await UserModel.findOne({ email });

      if (isUserPresent) {
        return res.status(401).send("user  found");
      }
      if(!isValidEmail(email)) return res.status(401).send("Email is not correct")
      const hash_Password=await bcrypt.hash(password,10);
       // const Confirm_Password_hash=await bcrypt.hash(conform_Password,10);
        const user=new UserModel({name,email,password:hash_Password,mobileno,isVerified,role,token});
        await user.save();
        res.status(200).send({msg:"Signup Successfull!"})
        
    } catch (error) {
        res.status(401).send(error.message);
    }
})

  userrouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const isUserPresent = await UserModel.findOne({ email });
      if (!isUserPresent) {
        return res.status(401).send("user not found");
      }
      const isPass = await bcrypt.compare(password, isUserPresent.password);
      if (!isPass) {
        return res.status(401).send({ msg: "invalid credential" });
      }
      const token = await jwt.sign(
        {
          userId: isUserPresent._id,
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );
      res.send({
        msg: "login success",
        token,
        username: isUserPresent.name,
        userId: isUserPresent._id,
        isVerified:isUserPresent.isVerified,
        role: isUserPresent.role
      });
    } catch (error) {
      res.status(401).send(error.message);
    }
  });


  module.exports=userrouter