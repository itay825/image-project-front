import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import './App.css';
import LoginPage from './comp/Login';
import RegisterPage from './comp/SignUp';

function MainComponent() {
  const [showApp, setShowApp] = useState(false);

  // Logic to determine which component to show
  const renderComponent = () => {
    if (showApp) {
      return (
        <App />
      );
    } else {
      return (
        <div className="vh-100 gradient-custom">
          <div className="container">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderComponent()}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MainComponent />
  </React.StrictMode>,
);
