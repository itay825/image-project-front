import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../css/LoginCss.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has been left blank!");
        } else if (password.length === 0) {
            alert("Password has been left blank!");
        } else {
            axios.post('http://127.0.0.1:5000/login', {
                email: email,
                password: password
            }, {
                withCredentials: true  // Ensure credentials are included in the request
            })
            .then(function (response) {
                console.log(response); // Check the entire response object

                // Set a cookie (replace 'myCookieName' and 'myCookieValue' with actual values)
                document.cookie = 'myCookieName=myCookieValue; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/';

                navigate("/");
            })
            .catch(function (error) {
                console.error(error, 'error');
                if (error.response && error.response.status === 401) {
                    alert("Invalid credentials");
                }
            });
        }
    }

    return (
        <div className="container-custom">
            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-heading">Log Into Your Account</h2>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" placeholder="Enter your email address" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={logInUser}>Login</button>
                    </div>
                    <div className="text-center">
                        <p className="mb-0">Don't have an account? <a href="/register" className="link-danger">Register</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
