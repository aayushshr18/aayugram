import "./msg.css"
import {format} from "timeago.js";
import { useState,useEffect } from "react";
import axios from "axios";

export default function Msg({message,currentUser,currentchat}) {
    const [frnduser, setfrndUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    
    const friendId = currentchat.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        setfrndUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, currentchat]);

    

    return (
        <div className={message.sender===currentUser._id?"msg own":"msg"}>
            <div className="msgtop">
                <img src={message.sender===currentUser._id?PF+currentUser.profilePicture:PF+frnduser.profilePicture} alt="" className="msgimg" />
                <p className="msgtext">{message.text} </p>
            </div>
            <div className="msgbottom">
                {format(message.createdAt)}
            </div>
        </div>
    )
}
