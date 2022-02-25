
const { sequelize,user,post,refresh_token } = require('../../models');

const get_one_user = async(req,res,next)=>{
    const uuid = req.params.uuid;
    console.log(req);
    try{
        const user1 = await user.findOne({
            where: { uuid }
        })
        const userPosts = await post.findAll()
        return res.status(200).json({user:{...user1},posts:{...userPosts}})
    }catch(err){
        console.log(err);
        return res.status(500).json(err)
    }

    
}
module.exports = get_one_user