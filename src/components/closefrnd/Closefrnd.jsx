import React from 'react'
import "./closefrnd.css"

const Closefrnd = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sbfrnditem">
            <img className="sbfrndimg" src={PF+user.profilePicture} alt="" />
            <span className="sbfrndname">{user.username}</span>
          </li>
  )
}

export default Closefrnd