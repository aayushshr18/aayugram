import React from 'react'
import "./post.css"
import { useState,useEffect } from 'react'
import {MoreVert,ThumbUp,Favorite, Delete} from "@mui/icons-material"
import axios from 'axios'
import {format} from "timeago.js"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';


export const Post = ({post}) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  
    const handleDelete=async(e)=>{
      e.preventDefault();
      try {
        await axios.delete("/posts/"+post._id+"/"+ currentUser._id );
        window.location.reload();
      } catch (error) {
        console.log(error)
      }
    }
     
 
  
 
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
        <div className="postwrapper">
          <div className="posttop">
            <div className="posttl">
              <Link to={`/profile/${user.username}`}>
              <img src={PF+user.profilePicture} alt="" className="postprofileimg" />
              </Link>
              <span className="postusername">{user.username}</span>
              <span className="postdate">{format(post.createdAt)}</span>
            </div>
            <div className="posttr">
              {post.userId===currentUser._id?<Delete onClick={handleDelete} className='posticon'/>:<></>}
            </div>
          </div>
          <div className="postcenter">
            <span className="posttext">{post?.desc}</span>
            <img src={PF+post.img}  alt="" className="postimg" />
          </div>
          <div className="postbottom">
            <div className="postbl">
                <Favorite onClick={likeHandler} htmlColor='red' className='posticon'/>
                <ThumbUp onClick={likeHandler}  htmlColor='blue' className='posticon' />
                <span className="postlikecount">{like} People Liked</span>
            </div>
            <div className="postbr">
              <span className="postcomment">{post.comment} Comments</span>
            </div>
          </div>
        </div>
    </div>
  )
}
