import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signUp.css';

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate


  // State for form inputs
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  // State for handling errors and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/users/register/', {
        username,
        email,
        password,
        confirm_password
      });

      // Handle successful registration
      setSuccess('Registration successful!');
      setError('');
      // Redirect to home page after successful registration
      navigate('/home');

      // Optionally, redirect to another page
      // window.location.href = '/some-page';

    } catch (err) {
      // Handle errors
      setError('Registration failed. Please try again.');
      setSuccess('');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="image-container" alt="Background">
      <div className="signup-container">
        <div className="form-container">
          <h2>Create An Account!</h2>
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

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="terms">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I agree to the <a href="/terms">terms of use</a> and <a href="/privacy">privacy policy</a>
              </label>
            </div>

            <button type="submit" className="signup-btn">Sign Up</button>
          </form>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
