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
            throw new Error(" User with Email already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        console.log(hashedPassword);
        await user.create({firstname,lastname,email,hashedPassword,role})
        res.status(201).json("User created successfully")

    }catch(err){
        console.log(err)
        res.json(err)

    }


})
module.exports = router