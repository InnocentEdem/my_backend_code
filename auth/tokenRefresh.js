const { sequelize,user,post,refresh_token } = require('../models');
const jwt = require("jsonwebtoken");
const rotationStrategy = require("./rtRotationStrategy")
const httpCookieStrategy = require("./httpCookieStrategy")


const token_refresh = async(req,res)=>{
    
    const authHeader = req.headers['authorization']
    if(authHeader.length <= 6){
        return res.sendStatus(400)
    }
    const token = authHeader && authHeader.split(' ')[1];
    if(token === null){
        return res.sendStatus(401)
    }
    if(process.env.JWT_STRATEGY === "jwt_in_httpOnly_cookie"){
        const {accessToken,refreshToken} = await rotationStrategy(token)    //rotation strategy
        if(accessToken && refreshToken){
            return res.json({refreshToken,accessToken})
        }else{
            res.sendStatus(401)
        }
    }
    const {accessToken} = await httpCookieStrategy(req.cookies)   //http cookie strategy
    if(accessToken){
        return res.json({accessToken})
    }else{
        res.sendStatus(401)
    }
}
module.exports = token_refresh
