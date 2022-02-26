const { sequelize,user,post,refresh_token } = require('../models');
const jwt = require("jsonwebtoken");
const rotationStrategy = require("./rtRotationStrategy")


const token_refresh = async(req,res)=>{

    const authHeader = req.headers['authorization']
    if(authHeader.length <= 6){
        return res.sendStatus(400)
    }
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        return res.sendStatus(401)
    }
    const {accessToken,refreshToken} = await rotationStrategy(token)
    if(accessToken && refreshToken){
        return res.json({refreshToken,accessToken})
    }else{
        res.sendStatus(401)
    }

    // try{
    //        const check = await refresh_token.findOne({
    //        where :{refresh_token:refresh}
    //    })
    //    if(!check){
    //        return res.sendStatus(400)
    //    }
    
    //    await refresh_token.destroy({
    //        where: {
    //          refresh_token: refresh
    //        }
    //      });
    //    const checker = await refresh_token.findOne({

    //        where:{refresh_token:refresh}
    //    })

    //    const refreshToken = jwt.sign(username, process.env.REFRESH_TOKEN);
    //    await refresh_token.create({ refreshToken})        
    //    return res.json({refreshToken})


    // }catch(err){
    //     res.sendStatus(401)
    // }

}
module.exports = token_refresh
