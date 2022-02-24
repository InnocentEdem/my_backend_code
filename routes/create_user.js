const express = require('express');
const router = express.Router();
const { sequelize,user,post,refresh_token } = require('../models');



router.post("/create_user",async(req,res)=>{
    const {firstname, lastname, email,role} = req.body
    try{
        const newUser = await user.create({firstname, lastname,email,role})
        return res.json(newUser)
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }
})
module.exports = router