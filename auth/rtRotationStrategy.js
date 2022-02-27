const {user, used_token,refresh_token, incident_log} = require("../models")
const jwt = require("jsonwebtoken")

const checkRace = async(token)=>{

    try{
        const result = await used_token.findOne({
            where:{
                token
            }
        })

        if(result){
            await incident_log.create({type:"Token Re-use",time_stamp: Date.now(),comments:result.id})
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
        if(uuid && email && role){
            const accessToken =  jwt.sign({uuid,email,role},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"600s"})
            const refreshToken = jwt.sign({uuid,email,role},process.env.REFRESH_TOKEN,{expiresIn:"6000s"})
            await used_token.create({token, new_token:refreshToken})
            res.cookie.set({hi:"low"})
        return { accessToken, refreshToken}
        }
        
    }catch(err){
        return {erorr: err}

    }
}
module.exports = checkRace