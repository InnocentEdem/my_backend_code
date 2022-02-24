const express = require('express');
const router = express.Router()
const authenticateToken = require('../auth')
const { sequelize,user,post,refresh_token } = require('../models');


router.post("/all_posts", authenticateToken, async(req,res)=>{
    try{
        const user1 = await post.findAll({include:[user]})
        // const newPost = await post.create({body, title, userId:user1.id,post_date:Date.now()})
        return res.status(200).json(user1)

    }catch(err){
        console.log(err)
        return res.status(500).json("error creating resource")
    }
})

module.exports = router