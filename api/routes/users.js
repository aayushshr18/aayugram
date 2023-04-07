const router=require("express").Router();
const User=require('../models/Users');
const bcrypt=require('bcrypt')

//UPDATING A USER
router.put('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        if(req.body.password){
            try{
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);

            }catch(err){
                return res.status(404).json(err);
            }
        }
        try{
            const user=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            });
            res.status(200).json("User Details Updated Successfully");
        }catch(err){
            res.status(404).json(err);
        }

    }else{
        return res.status(500).json("You Can Update only Your Account");
    }
    
});


//DELETING A USER
router.delete('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        try{
            const user=await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been Deleted Successfully");
        }catch(err){
            res.status(404).json(err);
        }

    }else{
        return res.status(500).json("You Can Delete only Your Account");
    }
});

//GETTING USER DETAILS
router.get('/',async (req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;    
    try{
            const user=userId?await User.findById(userId):await User.findOne({username:username});
            res.status(200).json(user);
        }catch(err){
            res.status(404).json(err);
        }
});

//FOLLOWING A USER
router.put('/:id/follow',async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});
                res.status(200).json("You have successfully Followed a user")
            }else{
                res.status(403).json("You already Follow This User")
            }
        }catch(err){
            res.status(500).json(err);

        }

    }else{
        res.status(300).json("You cannot Follow Yourself!")
    }
});

//UNFOLLOWING A USER
router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user=await User.findById(req.params.id);
            const currentUser=await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});
                res.status(200).json("You have successfully Unfollowed a user")
            }else{
                res.status(403).json("You Dont Follow This User")
            }
        }catch(err){
            res.status(500).json(err);

        }

    }else{
        res.status(300).json("You cannot Unfollow Yourself!")
    }
});

module.exports= router