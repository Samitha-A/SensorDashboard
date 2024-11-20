import React, { useState } from 'react';
import './Login.css';
import videoSource from './video.mp4';
import { useNavigate } from 'react-router-dom';
import groot from './groottt.avif';
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    // Prevent default form submission
    e.preventDefault();

    // Basic authentication logic
    if (username === 'qwerty' && password === '1234') {
      // Store login state (optional but recommended)
      localStorage.setItem('isLoggedIn', 'true');
      
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } else {
      // Show error for invalid credentials
      alert('Invalid username or password');
    }
  };

  return (
    <div className="anime-login-container">
      {/* Add video background */}
      <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source 
          src={videoSource}
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      <div className="floating-login-text">LOGIN</div>
      
      <div>
        <img src={groot} alt="groot"/>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <input 
          type="text" 
          placeholder="Kit ID" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;