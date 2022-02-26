const {user, used_token,refresh_token, incident_log} = require('../models')
const jwt = require("jsonwebtoken")

const checkRace = async(token)=>{
    try{
        const result = await used_token.findOne({
            where:{
                token
            }
        })

        if(result){
            await incident_log.create({type:"Token Re-use",time_stamp:new Date.now(),comments:`new: ${result.new_token} old: ${token}`})
            await refresh_token.destroy({
                where:{token: result.token}
            })
            throw new Error("Token re-use attempt")
        }
        const isTokenPresent = refresh_token.findOne({
            where:{token:token}
        })
        if(!isTokenPresent){
            throw new Error("illegal token operation")
        }
        await refresh_token.destroy({
            where:{token}
        })
        const {uuid,email,role} = jwt.verify(token,process.env.REFRESH_TOKEN)
        console.log(uuid,email,role);
        if(uuid && email && role){
            accessToken =  jwt.sign({uuid,email,role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"600s"})
            refreshToken = jwt.sign({uuid,email,role},process.env.REFRESH_TOKEN,{expiresIn:"6000s"})
            await used_token.create({token, new_token:refreshToken})

        return { accessToken, refreshToken}
        }
        
    }catch(err){
        console.log(err);
        return err

    }
}
module.exports = checkRace