const express = require('express')

const UserModel = require("../Model/user.model")
const randomstring = require("randomstring");

const bcrypt = require('bcrypt')
const app = express()
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


const jwt = require('jsonwebtoken')
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

  // 
  const updatePassword = async (password) => {
    try {
      const hasPass = await bcrypt.hash(password, 8);
      return hasPass;
    } catch (error) {
      throw new Error("Failed to hash password");
    }
  };
  
  userrouter.get("/reset-password", async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await UserModel.findOne({ token });
  
      if (tokenData && tokenData._id) {
        console.log(tokenData._id.toString());
        res.cookie("userId", tokenData._id.toString(), { maxAge: 1000 * 60 });
        res.sendFile(path.join(__dirname, "../public/pages/resetpassword.html"));
      } else {
        res.status(400).send({ success: false, msg: "This link expired" });
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });
  
  userrouter.post("/change-password", async (req, res) => {
    try {
      const userId = req.cookies.userId;
      if (!userId) {
        return res.status(400).send({ success: false, msg: "User ID not found" });
      }
  
      const userToken = await UserModel.findById(userId);
      if (userToken) {
        const password = req.body.password;
        const newPassword = await updatePassword(password);
  
        await UserModel.findByIdAndUpdate(
          { _id: userId },
          { $set: { password: newPassword, token: "" } },
          { new: true }
        );
  
        res.status(200).send({ success: true, msg: "Password changed successfully" });
      } else {
        res.status(400).send({ success: false, msg: "This link expired" });
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });
  
  userrouter.post("/forget-password", async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(400).send({ success: false, msg: "This email doesn't exist" });
      }
  
      if (!user.isVerified) {
        return res.status(301).send({ success: false, msg: "Please verify your email" });
      }
  
      const randomString = randomstring.generate();
      await UserModel.updateOne({ email }, { $set: { token: randomString } });
      sendResetPassword(user.username, email, randomString);
  
      res.status(200).send({ success: true, msg: "Reset password email is sent to your email" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
    }
  });
  
  

  
  
  
  userrouter.get("/logout", async (req, res) => {
    try {
      const token = req.headers?.authorization;
      if (!token) return res.status(403);
      let blackListedToken = new BlackListModel({ token });
      await blackListedToken.save();
      res.send({ msg: "logout succesfull" });
    } catch (error) {
      res.send(error.message);
    }
  });



userrouter.delete("/delete/:id",async (req,res)=>{
    const {id}=req.params
    const deleteUsers=await UserModel.findByIdAndDelete({_id:id})
    return res.status(200).send({msg:"User Deleted"})
})

// To send verification link again




module.exports=userrouter