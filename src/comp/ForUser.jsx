import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../css/BottomBarCss.css';
const ForUser = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if the user is logged in based on the presence of a token cookie
    const token = Cookies.get('token');
  
    try {
      if (token) {
        // Parse the token to get the email
        const parsedToken = JSON.parse(token);
        const email = parsedToken.email;
        setUserName(email);
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }, []);
  

  // Function to handle user logout
  const handleLogout = () => {
    // Clear the token cookie
    Cookies.remove('token');
    // Force a page reload to update the UI
    window.location.reload();
  };

  return (
<div class="container-bar">
  <div class="container h-100">
    <div class="row h-100">
      <div class="col-12">
        {userName ? (
          <p>
            Hi, {userName} <button onClick={handleLogout} class="btn btn-logout">Logout</button>
          </p>
        ) : (
          <p>
            <Link to="/login" class="btn btn-blue">Login</Link> 
            <Link to="/register" class="btn btn-blue">Register</Link>
          </p>
        )}
      </div>
    </div>
  </div>
</div>


  );
}

export default ForUser;
