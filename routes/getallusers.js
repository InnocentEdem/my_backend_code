
const express = require('express');
const router = express.Router();
const { sequelize,user,post,refresh_token } = require('../models');


router.get("/all_users",async(req,res)=>{
    
    try{
        const userList = await user.findAll()
        return res.json(userList)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
  
})
module.exports = router