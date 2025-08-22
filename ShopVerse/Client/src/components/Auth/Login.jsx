import Img from '../../assets/WhatsApp Image 2025-08-13 at 02.02.20_66c195cb.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Header from '../Header.jsx'

export default function Login({isLoggedIn, setIsLoggedIn}) 
{
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing again
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }
        
        try {
            setError('');
            setIsLoading(true);

            const response = await fetch('http://localhost:3000/users/signIn', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Invalid email or password');
            }
            
            console.log('Login successful:', data);
            
            // Save token to localStorage or cookies
            localStorage.setItem('authToken', data.token);
            if(!isLoggedIn)
            {
                setIsLoggedIn(true);
            }
            // Redirect to dashboard or home page
            navigate('/');
            
        } catch (err) {
            console.log(formData);
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return(
        <div>
            <Header />
            <div className="container">
                <img src={Img} alt="Login illustration" />
                <form onSubmit={handleSubmit}>
                    <h1>Login to Your Account</h1>
                    
                    {error && <div className="error-message">{error}</div>}
                    
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email" 
                        disabled={isLoading}
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Enter your password" 
                        disabled={isLoading}
                    />
                    
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </form>
            </div>
        </div>
    )
}