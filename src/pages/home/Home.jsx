import React from 'react' ;
import Topbar from '../../components/topbar/Topbar' ;
import Rightbar from '../../components/rightbar/Rightbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import "./home.css";


const Home = () => {
  return (
    <>
    <Topbar/>
    <div className="homecontainer">
      <Sidebar/>
      <Feed/>
      <Rightbar home={true} />
    </div>
    </>
  )
}

export default Home
