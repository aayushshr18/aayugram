import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import "./profile.css"
import { useState,useEffect } from 'react';
import axios from "axios"
import { useParams } from 'react-router';

const Profile = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const cparams=useParams();

    useEffect(() => {
        const fetchUser=async ()=>{
          const res=await axios.get(`/users?username=${cparams.username}`);
          setUser(res.data);
        }
        fetchUser();
      },[]);
    return (
        <>
            <Topbar  />
            <div className="profile">
                <Sidebar />
                <div className="pright">
                    <div className="prtop">
                        <div className="pcover">
                            <img src={PF+user.coverPicture} alt="" className="pcimg" />
                            <img src={PF+user.profilePicture} alt="" className="puimg" />
                        </div>
                        <div className="pinfo">
                            <h4 className="pusername">{user.username}</h4>
                            <span className="pdesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="prbottom">
                        <Feed username={user.username} />

                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile