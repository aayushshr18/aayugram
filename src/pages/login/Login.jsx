import { useRef } from "react";
import React from "react"
import "./login.css"
import { useContext } from "react";
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext"
import { Link } from "react-router-dom";


const Login = () => {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,dispatch}=useContext(AuthContext);
    
    const handleClick = (e) => {
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);
    }
    //console.log(user);
    return (
        <div className="login">
            <div className="loginwrapper">
                <div className="loginleft">
                    <h3 className="llogo">AayuGram</h3>
                    <span className="logotag">
                        Stay Connected with your loved ones from anywhere and anytime!
                    </span>
                </div>
                <div className="loginright">
                    <form className="loginbox" onSubmit={handleClick}>
                        <input required ref={email} type="email" placeholder="Email" className="logininput" />
                        <input required minLength="6" ref={password} type="password" placeholder="Password" className="logininput" />
                        <button className="logbtn" >{isFetching? "Setting Things Up...": "Log In"}</button>
                        <span className="forgotp">Forgot Password?</span>
                        
                    </form>
                    <div className="linker">
                    <Link to={"/register"}><button className="regbtn">Create New Account</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
