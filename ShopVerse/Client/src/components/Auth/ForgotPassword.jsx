import Img from '../../assets/WhatsApp Image 2025-08-13 at 02.02.20_66c195cb.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Header from '../Header.jsx'

export default function ForgotPassword() 
{
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically call an API to send a reset email
        console.log('Reset password for:', email);
        // Simulate successful submission
        setIsSubmitted(true);
    };

    return(
        <div>
            <Header />
            <div className="container">
                <img src={Img} alt="Forgot Password illustration" />
                <form onSubmit={handleSubmit}>
                    <h1>Reset Your Password</h1>
                    
                    {!isSubmitted ? (
                        <>
                            <p className="reset-instructions">
                                Enter your email address and we'll send you instructions to reset your password.
                            </p>
                            
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email address" 
                            />
                            
                            <button type="submit">Send Reset Link</button>
                        </>
                    ) : (
                        <div className="success-message">
                            <p>If an account exists with the email <strong>{email}</strong>, you will receive password reset instructions.</p>
                            <button onClick={() => window.location.href = '/login'} type="button">
                                Back to Login
                            </button>
                        </div>
                    )}
                    
                    <p>Remember your password? <Link to="/login">Back to login</Link></p>
                </form>
            </div>
        </div>
    )
}
