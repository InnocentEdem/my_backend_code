const {user, used_token,refresh_token, incident_log} = require("../models")
const jwt = require("jsonwebtoken")

const checkCookie = async(cookies)=>{
    const token = cookies.token;
    if(!token){
        throw new Error('Cookie token absent')
    }

    try{

        const isTokenPresent = refresh_token.findOne({
            where:{token:token}
        })
        if(!isTokenPresent){
            throw new Error("illegal token operation")
        }
        const {uuid,email,role} = jwt.verify(token,process.env.REFRESH_TOKEN)
        if(uuid && email && role){
            const accessToken =  jwt.sign({uuid,email,role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"600s"})
        return { accessToken}
        }
        throw new Error("Expired refresh token")
        
    }catch(err){
        return {erorr: err}

    }
}
module.exports = checkCookie