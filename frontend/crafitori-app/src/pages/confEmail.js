import React from 'react'
import '../styles/confEmail.css'


const confEmail = () => {
    return (
        <div>
            <body className='body-container'>
                <div className="conf-container">
                    <h2>Enter Verification Code</h2>
                    <p>We've Sent A Code To Your Email</p>
                    <input
                        type="number"
                        className="code-input"
                        placeholder="Enter your code"
                        required
                    />
                    <p className="resend-text">Don’t Get A Code? <a href="/resend">Click To Resend</a></p>
                    <div className="conf-btn">
                        <button className="cancel-btn">Cancel</button>
                        <button className="verify-btn">Verify</button>
                    </div>
                </div>
            </body>
        </div>
    )
}
    

export default confEmail