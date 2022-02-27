const bcrypt = require('bcrypt');
const { user, refresh_token } = require('../models');
const jwt = require("jsonwebtoken");


const user_login = async(req, res, next)=>{

    const  {email, password} = req.body;
    try{
     const userDetails = await user.findOne({
         where:{email}
     })
     if(!userDetails){
         return res.status(401).json("Username or Password does not exist  or is incorrect")
     }
     const isMatched = await bcrypt.compare(password, userDetails.password)
     if(!isMatched){
         return res.status(401).json("Username or Password does not exist  or is incorrect")
     }
     const data = {
         uuid: userDetails.uuid,
         email,
         role:userDetails.role
     }
     const accessToken = await jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{expiresIn: "100 s"}) //require('crypto').randomBytes(64).toString('hex')
     const refreshToken = await jwt.sign(data, process.env.REFRESH_TOKEN);
     await refresh_token.create({token: refreshToken})
     return res.cookie('token',refreshToken,{httpOnly:true},
                {secure:process.env.NODE_ENV !=='development'}, {expire: 60000 + Date.now()}).
                json({message:"Login Successful", accessToken, refreshToken,uuid:userDetails.uuid})
 
    }catch(err){
        res.status(401).json(err)
    }
    
 }
 const register_new_user = async(req,res,next)=>{
    const {firstname,lastname,email,password,role} = req.body
    if(!firstname || !lastname || !email || !password){
        return res.status(400).json('All fields are required')
    }

    try{
        const checkUser = await user.findOne({
            where:{email}
        })
        if(checkUser){
            return res.status(401).json(" User with Email already exists")
        }
        const hashedPassword = await bcrypt.hash(password,10)
        await user.create({firstname,lastname,email,password:hashedPassword,role})
        res.status(201).json("User created successfully")

    }catch(err){
        res.status(401).send(err)

    }


}
 module.exports ={ 
     user_login,
     register_new_user
}