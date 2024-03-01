import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Actions from '../redux/actions';


const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!loginState.email) {
            toast.error("please enter email")
        }
        else if (!loginState.password) {
            toast.error("please enter password")
        } else {
            await axios.post("http://localhost:5000/api/auth/login", {
                ...loginState
            })
                .then(response => {
                    if(response.status === 200 || response.status === 201){
                        console.log(response,"response")
                        dispatch(Actions.loginSuccessAction(response?.data))
                        toast.success("Login success")
                        navigate("/home")
                    }
                })
                .catch(err => console.log(err))
        }
    }
    const handleChange=(e)=>{
       setLoginState(prev=>({
        ...prev,
        [e.target.name] : e.target.value
       }))
    }
    return (
        <>
            <div className="login-card">
                <div className="login-card-content">
                    <div className="header">
                        <h2>Login to Code Editor</h2>
                    </div>
                    <div className="form">
                        <div className="form-field username">
                            <div className="icon">
                                <i className="far fa-envelope"></i>
                            </div>
                            <input type="text" value={loginState.email} name="email" onChange={handleChange} placeholder="Email"/>
                        </div>
                        <div className="form-field password">
                            <div className="icon">
                                <i className="fas fa-lock"></i>
                            </div>
                            <input type="password" value={loginState.password} name="password" onChange={handleChange} placeholder="Password"/>
                        </div>

                        <button id='submit' type="submit" onClick={handleSubmit}>
                            Login
                        </button>
                        <div>
                            Don't have an account? <Link to={"/signup"}><span>Sign Up Now</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default LoginScreen;