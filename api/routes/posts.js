const router=require('express').Router();
const Post=require('../models/Post');
const User=require('../models/Users')

//Creating a Post
router.post('/',async (req,res)=>{
    const newPost= await new Post(req.body);
    try{
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);

    }catch(err){
        res.status(500).json(err);
    }
});

//Updating a Post
router.put('/:id',async (req,res)=>{
    try{ 
        const post=await Post.findById(req.params.id);
        if(post.userId===req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("Post Updated Successfully");   
        }else{
            res.status(403).json("You Can Edit Your Posts Only!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Deleting a Post
router.delete('/:id/:currentUserId',async (req,res)=>{
    try{ 
        const post=await Post.findById(req.params.id);
        console.log(post);
        console.log(req.params.currentUserId);
        if(post.userId===req.params.currentUserId){
            await post.deleteOne();
            res.status(200).json("Post Deleted Successfully");   
        }else{
            res.status(403).json("You Can Delete Your Posts Only!");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Liking  post
router.put('/:id/like',async (req,res)=>{
    try{ 
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("Liked A Post");   
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("Disliked A Post");  
        }
    }catch(err){
        res.status(500).json(err);
    }
});

//Getting a Post
router.get('/:id',async (req,res)=>{
    try{
        const post= await Post.findById(req.params.id);
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(403).json("Post Doesnot Exists!"); 
        }
    }catch(err){
        res.status(404).json(err);
    }
});

//GETTING THE TIMELINE
router.get("/timeline/:userId", async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts))
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //GETTING USERS ALL POST
router.get("/profile/:username", async (req, res) => {
    try {
      const user=await User.findOne({username:req.params.username});
      const posts=await Post.find({userId:user._id})
      res.status(200).json(posts)
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports=router 