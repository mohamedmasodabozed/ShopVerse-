import Img from '../../assets/WhatsApp Image 2025-08-13 at 02.02.20_66c195cb.jpg'
import Header from '../Header.jsx'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
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
    
    // Form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!formData.role) {
      setError('Please select a role');
      return;
    }
    
    try {
      setError('');
      setIsLoading(true);
      
      // Prepare data for backend - map 'name' to 'userName' as expected by backend
      const dataToSend = {
        userName: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };
      
      const response = await fetch('http://localhost:3000/users/signUp', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let data = null;
      try {
        data = await response.json();
      } catch (e) {
        // If response is empty or not JSON, set a generic error
        throw new Error('Server error: Invalid response');
      }
      if (!response.ok) {
        throw new Error(data.Message || 'Failed to sign up');
      }
      console.log('Sign up successful:', data);
      alert('Account created successfully! Please log in.');
      navigate('/login');
      
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="container">
        <img src={Img} alt="Shopping illustration" />
        <form onSubmit={handleSubmit}>
          <h1>Create An Account</h1>
          
          {error && <div className="error-message">{error}</div>}
          
          <label htmlFor="name">Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            placeholder="Enter your full name"
            disabled={isLoading}
          />
          
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="Enter your email address"
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
            placeholder="Create a strong password"
            disabled={isLoading}
          />
          
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          
          <label htmlFor="role">Role</label>
          <select 
            name="role" 
            id="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={isLoading}
          >
            <option value="" disabled>Choose Role</option>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
          <p>Already have an account? <Link to="/login">Login here</Link></p>
        </form>
      </div>
    </div>
  )
}