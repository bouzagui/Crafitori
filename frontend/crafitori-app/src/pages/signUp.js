import React from 'react';
import '../styles/signUp.css';

const SignUp = () => {
  return (
    <div className="image-container" alt="Background">
        <div className="signup-container">
            <div className="form-container">
                <h2>Create A Free Account!</h2>
                <form>
                <label htmlFor="Name">Name</label>
                <input type="text" id="name" placeholder="Enter your name" required />

                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" required />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Enter your password" required />
                
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm your password" required />
                
                <div className="terms">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">
                    I agree to the <a href="/terms">terms of use</a> and <a href="/privacy">privacy policy</a>
                    </label>
                </div>
                
                <button type="submit" className="signup-btn">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/sign-in">Sign In</a></p>
            </div>
      
      </div>
    </div>
  );
};

export default SignUp;
