const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        min:5,
        required:true
    },
    profilePicture:{
        type:String,
        default:"n.jpg"
    },
    coverPicture:{
        type:String,
        default:"cn.jpg"
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:String,
        max:50
    }
},
{timestamps:true})

module.exports=mongoose.model('User',userSchema);