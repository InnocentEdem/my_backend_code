const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const { sequelize,user,post,refresh_token } = require('../models');
const jwt = require("jsonwebtoken");



const username = "abena korkor"
router.post("/login", async(req,res)=>{

   const {email, password} = req.body;
   try{
    const userDetails = await user.findOne({
        where:{email}
    })
    if(!userDetails){
        return res.status(401).json("Username or Password does not exist  or is incorrect")
    }
    console.log(userDetails);
    const isMatched = await bcrypt.compare(password, userDetails.password)
    if(!isMatched){
        return res.status(401).json("Username or Password does not exist  or is incorrect")
    }
    const accessToken = await jwt.sign(username, process.env.ACCESS_TOKEN_SECRET) //require('crypto').randomBytes(64).toString('hex')
    const refreshToken = await jwt.sign(username, process.env.REFRESH_TOKEN);
    await refresh_token.create({refresh_token: refreshToken})
    return res.json({message:"Login Successful", accessToken, refreshToken})

   }catch(err){
       console.log(err)
       res.status(401).json(err)
   }
   
}
)
module.exports = router;