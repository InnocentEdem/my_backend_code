const express = require('express')
const router = express.Router()
const {user} = require('../models')
const bcrypt = require('bcrypt')



router.post("/register", async(req,res)=>{
    const {firstname,lastname,email,password,role} = req.body
    console.log(firstname, lastname);
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json('All fields are required')
    }

    try{
        const checkUser = await user.findOne({
            where:{email}
        })
        if(checkUser){
            return res.status(401).json(" User with Email already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword);
        await user.create({firstname,lastname,email,password:hashedPassword,role})
        res.status(201).json("User created successfully")

    }catch(err){
        console.log(err)
        res.status(401).send(err)

    }


})
module.exports = router