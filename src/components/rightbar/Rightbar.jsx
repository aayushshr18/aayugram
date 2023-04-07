import "./rightbar.css"
import React from 'react'
import { Cake, Group, Person } from '@mui/icons-material'
import Online from "../online/Online"
import { Users } from "../../dummy"
import { AuthContext } from "../../context/AuthContext"
import { useContext,useState,useEffect } from "react"
import axios from "axios"


export default function Rightbar({user}) {
  const {user:currentUser,dispatch}=useContext(AuthContext)
  const [followed, setfollowed] = useState(currentUser.followings.includes(user?._id))

  const HomeRightbar = () => {
    return (
      <>
        <div className="bdayc">
          <Cake htmlColor="brown" className="bdayimg" />
          <span className="bdaytext"><b>Rudra Shrivastava</b> and <b>3 others</b> have their Birthday today</span>
        </div>
        <div className="ad">
          <img src="/assets/a1.jpg" alt="" className="adimg" />
        </div>
        <h4 className="rbtitle">Friend List</h4>
        <ul className="frndlist">
          {Users.map((u) => {
            if (u.online) {
              return <Online key={u.id} user={u} />
            }
            return null
          })}

        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {

    const handleClick=async ()=>{
      try {
        if(followed){
          await axios.put(`/users/${user._id}/unfollow`,{userId:currentUser._id});
          dispatch({type:"UNFOLLOW",payload:user._id});
        }else{
          await axios.put(`/users/${user._id}/follow`,{userId:currentUser._id});
          dispatch({type:"FOLLOW",payload:user._id});
        }
        setfollowed(!followed);
      } catch (error) {
        console.log(error)
      }
      
    }
  
    return (
      <div className="rbpbox">
        <h4 className="rbptitle">
          User Info
        </h4>
        <div className="rbpuserinfo">
          <div className="infoitem">
            <span className="infoitemkey">City:</span>
            <span className="infoitemval">{user.city}</span>
          </div>
          <div className="infoitem">
            <span className="infoitemkey">From:</span>
            <span className="infoitemval">{user.from}</span>
          </div>
          <div className="infoitem">
            <span className="infoitemkey">Relationship:</span>
            <span className="infoitemval">{user.relationship}</span>
          </div>
        </div>
        <div className="fol">
          <h5 className="foltext">Followers</h5>
          <div className="folc">
            <Group  className="folicon"/>
            <span className="fnum">{user.followers?user.followers.length:0}</span>
          </div>
        </div>
        <div className="fol">
          <h5 className="foltext">Following</h5>
          <div className="folc">
            <Person  className="folicon"/>
            <span className="fnum">{user.followings?user.followings.length:0}</span>
          </div>
        </div>
        {user.username!==currentUser.username&& 
      (<button onClick={handleClick} className="rbfubtn">{followed?"Unfollow":"Follow"}</button>)}
      </div>
 
    )
  }

  //Main FUnction is here
  return (
    <div className="rbc">
      <div className="rbwrapper">
        {user? <ProfileRightbar/>:<HomeRightbar/>}
      </div>
    </div>
  )
}


