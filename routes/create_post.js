const express = require('express');
const router = express.Router()
const { sequelize,user,post,refresh_token } = require('../models');


router.post("/create_post", async(req,res)=>{
    const {userUuid,body,title}=req.body
    try{
        const user1 = await user.findOne({where:{uuid:userUuid}})
        const newPost = await post.create({body, title, userId:user1.id,post_date:Date.now()})
        console.log(Date.now());
        return res.status(201).json(newPost)

    }catch(err){
        console.log(err)
        return res.status(500).json("error creating resource")
    }
})
module.exports = router