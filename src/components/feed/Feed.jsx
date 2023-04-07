import "./feed.css"
import React from 'react'
import { useState,useEffect } from "react"
import { Share } from "../share/Share"
import { Post } from "../post/Post"
import axios from "axios"
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const Feed = ({username}) => {
  const [posts, setPosts] = useState([]);
  const {user}=useContext(AuthContext)
  useEffect(() => {
    const fetchPosts=async ()=>{
      const res=username?
      await axios.get("/posts/profile/"+username):
      await axios.get("/posts/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt)- new Date(p1.createdAt);
      }));
    }
    fetchPosts();
  },[username, user._id])
  
  return (
    <div className="feedcontainer" >
      <div className="feedwrapper">
      {(!username || username === user.username) && <Share/>}
        {posts.map((p)=>{
          return <Post key={p._id} post={p} />
        })}
      </div>
      </div>
  )
}

export default Feed