const { request } = require('express');
const {post,user} = require('../../models')


const create_post = async(req,res,next)=>{

    const {body,uuid,title} = req.body;
    try{
        const poster = await user.findOne({where:{uuid}})
        const newPost = await post.create({body, title, userId:poster.id,post_date:Date.now()})
        res.status(200).json(newPost)
    }
    catch(err){
        console.log(err)
        return res.status(401).json(err)
    }
}
module.exports = create_post