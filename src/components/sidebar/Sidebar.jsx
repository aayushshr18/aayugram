import "./sidebar.css"
import React from 'react'
import { Feed, Event, School, HelpOutline, WorkOutline, PlayCircleFilledOutlined, Group, Bookmark } from "@mui/icons-material"
import Closefrnd from "../closefrnd/Closefrnd"
import {Users} from "../../dummy"

const Sidebar = () => {
  return (
    <div className="sbcontainer">
      <div className="sbwrapper">
        <ul className="sblist">
          <li className="sbitem">
            <Feed className="sblisticon" />
            <span className="sblisttext">Feed</span>
          </li>
          <li className="sbitem">
            <Event className="sblisticon" />
            <span className="sblisttext">Events</span>
          </li>
          <li className="sbitem">
            <School className="sblisticon" />
            <span className="sblisttext">Courses</span>
          </li>
          <li className="sbitem">
            <HelpOutline className="sblisticon" />
            <span className="sblisttext">Questions</span>
          </li>
          <li className="sbitem">
            <WorkOutline className="sblisticon" />
            <span className="sblisttext">Jobs</span>
          </li>
          <li className="sbitem">
            <Bookmark className="sblisticon" />
            <span className="sblisttext">Bookmarks</span>
          </li>
          <li className="sbitem">
            <PlayCircleFilledOutlined className="sblisticon" />
            <span className="sblisttext">Videos</span>
          </li>
          <li className="sbitem">
            <Group className="sblisticon" />
            <span className="sblisttext">Groups</span>
          </li>
        </ul>
        <button className="sbbtn">Show More</button>
        <hr className="sbhr" />
        <ul className="sbfrndlst">
          {Users.map((u) => {
            return <Closefrnd key={u.id} user={u} />

          })}

        </ul>
      </div>
    </div>
  )
}

export default Sidebar