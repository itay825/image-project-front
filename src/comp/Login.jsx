import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
            // Set token expiry to 12 hours from now
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (12 * 60 * 60 * 1000)); // 12 hours in milliseconds

            // Get the email and token from the response
            const { email, token } = response.data;

            // Create a token object including the email
            const tokenData = {
                email: email,
                token: token
            };

            // Set the token cookie
            Cookies.set('token', JSON.stringify(tokenData), { expires: expiryDate, secure: true, sameSite: 'strict' });

            // Redirect to profile page where the user's email is displayed
            navigate("/");
        })
        .catch(function (error) {
            console.error(error, 'error');
            if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
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
