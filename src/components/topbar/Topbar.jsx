import React from 'react'
import "./topbar.css"
import { Search, Person,Chat,Notifications,LogoutOutlined } from '@mui/icons-material'
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'

export default function Topbar() {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const {user}=useContext(AuthContext)
  const handleOut=()=>{
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div className="topbarContainer">
      <div className="topbarleft">
        <Link to="/"><span className="logo">AayuGram</span></Link>
      </div>
      <div className="topbarcenter">
        <div className="searchbar">
          <Search className='searchbaricon' />
          <input type="text" placeholder='Search For Friends, Post etc' className="searchinp" />
        </div>
      </div>
      <div className="topbarright">
        <div className="topbarlinks">
          <span className="topbarlink">HomePage</span>
          <span className="topbarlink">Timeline</span>
        </div>
        <div className="topbaricons">
          <div className="topbariconitem">
            <Person />
            <span className="topbariconbadge">1</span>
          </div>
          <Link to={'/messenger'}><div className="topbariconitem">
            <Chat />
            <span className="topbariconbadge">1</span>
          </div></Link>
          <div className="topbariconitem">
            <Notifications />
            <span className="topbariconbadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}><img src={PF+user.profilePicture} alt="" className='topbarImg'/></Link>
        <div className="topbariconitem">
            <LogoutOutlined onClick={handleOut} />
          </div>
      </div>
    </div>
  )
}
