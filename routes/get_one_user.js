const express = require('express')
const router = express.Router()
const { sequelize,user,post,refresh_token } = require('../models');


router.get("/user/:uuid",async(req,res)=>{
    const uuid = req.params.uuid;
    console.log(uuid);
    try{
        const user1 = await user.findOne({
            where: { uuid }
        })
        return res.status(200).json(user1)
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }

    
})
module.exports = router