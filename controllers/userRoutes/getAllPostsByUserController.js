const{user,post} = require('../../models')


const get_all_posts_for_one_user = async(req,res,next)=>{

    const{email} = req.body;

    try{
        const allPosts = await post.findAll({
            where:{email}
        })
        return res.status(400).json(allPosts)

    }
    catch(err){
        console.log(err)
    }


}
module.exports = get_all_posts_for_one_user