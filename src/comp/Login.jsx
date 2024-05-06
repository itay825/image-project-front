import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from './UserContext'; // Import the useUser hook
import axios from 'axios';
import '../css/LoginCss.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loggedInUser, setLoggedInUser } = useUser(); // Use the useUser hook to access loggedInUser state
     
    const logInUser = () => {
        if (email.length === 0) {
            alert("Email has been left blank!");
            return;
        } else if (password.length === 0) {
            alert("Password has been left blank!");
            return;
        }

        axios.post('http://127.0.0.1:5000/login', {
            email: email,
            password: password
        }, {
            withCredentials: true
        })
        .then(function (response) {
            setLoggedInUser(response.data); // Set loggedInUser using setLoggedInUser function from useUser
            navigate("/"); // Redirect to home page
        })
        .catch(function (error) {
            console.error(error, 'error');
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    }

    // Redirect to home page if user is already logged in
    if (loggedInUser) {
        navigate("/");
        return null; // Prevent rendering of login page
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
                        <p className="mb-0">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
