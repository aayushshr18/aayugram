import React from 'react'
import "./share.css"
import {  PermMedia,Label,Room,EmojiEmotions, Cancel} from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import { useContext,useRef,useState } from 'react';
import axios from "axios"


export const Share = () => { 
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      data.append("name", file.name);
      data.append("file", file);
      newPost.img = file.name;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err)
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="share">
        <div className="sharewrapper">
            <div className="sharetop">
                <img src={PF+user.profilePicture} alt="" className="shareprofileimg" />
                <input type="text" required ref={desc} name="" placeholder={"What's in Your Mind "+user.username +" ?"} id="" className="shareinput" />
            </div>
            <hr className="sharehr" /> 
            {file&&(
              <div className="shareimgcnt">
                <Cancel onClick={()=>{setFile(null)}} className="cancel" />
                <img src={URL.createObjectURL(file)} alt="" className="shareimg" />
              </div>
            )}
            <form className="sharebottom" onSubmit={submitHandler}>
                <div className="shareopts">
                  <label className="shareop"  htmlFor="file">
                    <PermMedia htmlColor='purple' className='shareicon'/>    
                    <span className="shareoptext">Photo or Video</span>
                    <input required style={{display:"none"}} type="file" onChange={(e)=>{ setFile(e.target.files[0])}} id='file' accept='.png,.jpeg,.jpg' />
                  </label>
                  <div className="shareop">
                    <Label htmlColor='red' className='shareicon'/>    
                    <span className="shareoptext">Tags</span>
                  </div>
                  <div className="shareop">
                    <Room htmlColor='blue' className='shareicon'/>    
                    <span className="shareoptext">Location</span>
                  </div>
                  <div className="shareop">
                    <EmojiEmotions htmlColor='goldenrod' className='shareicon'/>    
                    <span className="shareoptext">Feelings</span>
                  </div>
            <button className="sharebtn" type='submit'>Share</button>
                </div>
            </form>
        </div>
    </div>
  )
}
