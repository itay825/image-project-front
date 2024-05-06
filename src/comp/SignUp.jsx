import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../css/LoginCss.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
     
    const registerUser = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        axios.post('http://127.0.0.1:5000/signup', {
            email: email,
            password: password
        })
        .then(function (response) {
            navigate("/");
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        });
    };

    return (
        <div className="container-custom">
            <div className="login-container">
                <div className="login-form">
                    <h2 className="login-heading">Create Your Account</h2>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="form-control" placeholder="Enter your email address" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="form-control" placeholder="Enter your password" />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" className="form-control" placeholder="Re-enter your password" />
                    </div>
                    <div className="form-group">
                        <button type="button" className="btn btn-primary" onClick={registerUser}>Sign Up</button>
                    </div>
                    <div className="text-center">
                        <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account? <Link to="/login" className="link-danger">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;