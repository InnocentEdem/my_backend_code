
const { sequelize,user,post,refresh_token } = require('../../models');

const get_all_users = async(req,res)=>{
    
    try{
        const userList = await user.findAll()
        return res.json(userList)
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
  
}

module.exports = get_all_users