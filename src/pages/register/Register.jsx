import axios from "axios";
import React, { useRef } from "react"
import "./register.css"
import {useNavigate} from "react-router"
import { Link } from "react-router-dom";

const Register = () => {
    const email = useRef();
    const password = useRef();
    const username = useRef();
    const cpassword = useRef();
    const navigate= useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password.current.value !== cpassword.current.value) {
            cpassword.current.setCustomValidity("Password and Confirm Password don't match!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (error) {
                console.log(error)
            }
        }

    }
    return (
        <div className="login">
            <div className="loginwrapper">
                <div className="loginleft">
                    <h3 className="rlogo">AayuGram</h3>
                    <span className="logotag">
                        Stay Connected with your loved ones from anywhere and anytime!
                    </span>
                </div>
                <div className="loginright">
                    <form className="loginbox" onSubmit={handleClick}>
                        <input type="email" required placeholder="Email" ref={email} className="logininput" />
                        <input type="text" required placeholder="Username" ref={username} className="logininput" />
                        <input type="password" minLength="6" required placeholder="Password" ref={password} className="logininput" />
                        <input type="password" minLength="6" required placeholder="Confirm Password" ref={cpassword} className="logininput" />
                        <button className="logbtn" type="submit">Sign Up</button>
                    </form>
                    <div className="linker">
                    <Link to={"/login"}><button className="regbtn">Log In To Account</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
