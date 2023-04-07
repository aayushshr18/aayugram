import "./conversation.css"
import {  useEffect, useState } from "react";

import axios from "axios";


export default function Conversation({conversation,currentUser}) {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get("/users?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  
  return (
    <div className="conver">
        <img src={PF+user.profilePicture} alt="" className="converimg" />
        <span className="convername">{user.username}</span>
    </div>
  )
}
