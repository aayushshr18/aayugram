import React from 'react'
import "./online.css"

const Online = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="frndlistitem">
            <div className="rbpimgc">
              <img src={PF+user.profilePicture} alt="" className="rbpimg" />
              <span className="online"></span>
            </div>
            <span className="rbpusername">{user.username}</span>
          </li>
  )
}

export default Online