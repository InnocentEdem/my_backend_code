const express = require('express')
const router = express.Router();
const { sequelize,user,post,refresh_token } = require('../models');
const jwt = require("jsonwebtoken");

router.post("/token",async(req,res)=>{
    const refresh = req.body.query;
    if(refresh === null){
        return res.sendStatus(401)
    }
    try{
           const check = await refresh_token.findOne({
           where :{refresh_token:refresh}
       })
       await refresh_token.destroy({
           where: {
             refresh_token: refresh
           }
         });
       const checker = await refresh_token.findOne({

           where:{refresh_token:refresh}
       })
       console.log("/////",checker);

       const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN);
       await refresh_token.create({ refreshToken})
       console.log("///////");
        
       return res.json({refreshToken})


    }catch(err){
        res.sendStatus(401)
    }

})
module.exports = router
