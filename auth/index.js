const jwt = require('jsonwebtoken')

async function authenticateToken(req,res,next){


    const authHeader = req.headers['authorization']
    if(authHeader.length <= 6){
        return res.sendStatus(400)
    }
    const token = authHeader && authHeader.split(' ')[1];


    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, user)=>{  
        if(err){
            return res.sendStatus(401)
        }
        const {uuid} = req.body
        if(uuid !== user.uuid){
            return res.sendStatus(400)
        }
        req.user = user;
        next();
    })

}
module.exports = authenticateToken