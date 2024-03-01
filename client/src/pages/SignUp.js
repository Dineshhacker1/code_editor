import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from 'react-toastify';

const SignUpScreen = () => {
    const navigate = useNavigate();
    const [userState, setUserState] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!userState.userName) {
            toast.error("please enter username")
        } else if (!userState.email) {
            toast.error("please enter email")
        }
        else if (!userState.password) {
            toast.error("please enter password")
        } else {
            await axios.post("http://localhost:5000/api/auth/signup", {
                ...userState
            })
                .then(response => {
                    // debugger
                    if(response.status === 200 || response.status === 201){
                        toast.success("Sign up success")
                        navigate("/login")
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const handleChange=(e)=>{
       setUserState(prev=>({
        ...prev,
        [e.target.name] : e.target.value
       }))
    }
    return (
        <>
            <div class="card">
                <div class="card_title">
                    <h1>Create Account</h1>
                    <span>Already have an account? <Link to={"/login"}><span>Sign In</span></Link></span>
                </div>
                <div class="form">
                    <form method="post">
                        <input type="text" value={userState.userName} name="userName" id="username" style={{ backgroundColor: "#e2e2e2" }} onChange={handleChange} placeholder="UserName" />
                        <input type="email" value={userState.email} name="email" style={{ backgroundColor: "#e2e2e2" }} placeholder="Email" onChange={handleChange} id="email" />
                        <input type="password" value={userState.password} name="password" style={{ backgroundColor: "#e2e2e2" }} placeholder="Password" onChange={handleChange} id="password" />
                        <button id='submitSignUp' onClick={handleSubmit}>Sign Up</button>
                    </form>
                </div>
            </div>
        </>

    );
};

export default SignUpScreen;