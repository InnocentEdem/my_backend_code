
const { sequelize,user,post,refresh_token } = require('../../models');

const get_one_user = async(req,res,next)=>{
    const email = req.params.email;
    console.log(email);
    try{
        const user1 = await user.findOne({
            where: { email }
        })
        const userPosts = await post.findAll({where:{id:user1.id}})
        return res.status(200).json({user:{...user1},posts:{...userPosts}})
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }

    
}
module.exports = get_one_user