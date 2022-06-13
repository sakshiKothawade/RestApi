const express = require('express');
const router=express.Router();
const Post = require('../models/Post');
//Get back all the post
router.get('/',async (req,res)=>{
    try {
        const posts= await Post.find();
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
});

//submit a post
router.post('/',async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });
    try{
    const savedPost=await post.save()
    res.json(savedPost);
    }
    catch(err){
        res.json({message:err});
    }
});

//Get specific post
router.get('/:postId',async (req,res)=>{
    try{
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }catch(err){
        res.json({message:err});
    }
//The client wants a specific post to be deleted from the database. The client has to send the _id of the post in the URL

router.delete('/:postId',async(req,res)=>{
    try{
    const removedPost=await Post.remove({_id:req.params.postId});
    res.json(removedPost);
    }
    catch(err){
        res.json({message:err});
    }
});

router.patch('/:postId',async(req,res)=>{
try{
    const updatepost=await Post.updateOne(
        {_id:req.params.postId},
        {$set:{title:req.body.title}}
        );
    res.json(updatepost);
} catch(err){
    res.json({message:err});
}
});

});

module.exports=router;