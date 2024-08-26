import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

const Login = () => {
  const navigate = useNavigate(); // Initialize useNavigate


  // State for form inputs
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/users/login/', {
        username,
        password,
      });

        // Extract JWT from the response
        const { token } = response.data;

        if (token) {
          // Store the token in localStorage or sessionStorage
          localStorage.setItem('authToken', token);

      // Handle successful registration
      setSuccess('Login successful!');
      setError('');
      console.log(token)
      // Redirect to home page after successful registration
      navigate('/home');
    } else {
        setError('Login failed. No token received.');
        setSuccess('');
    }

    } catch (err) {
      // Handle errors
      setError('Login failed. Please check your credentials and try again.');
      setSuccess('');
      console.error('login error:', err);
    }
  };

  return (
    <div className="image-container" alt="Background">
      <div className="signup-container">
        <div className="form-container">
          <h2>welcome back!</h2>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Name</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p className="forget_password">
            <a href="/forget-password">forget password</a>
            </p>

            <button type="submit" className="signup-btn">Login</button>
          </form>
          <p>Don’t have an account?  <a href="/sign-up">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
