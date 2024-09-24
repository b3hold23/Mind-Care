import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Logo from '../assets/Mind-Care-Logo.svg';


const CreateProfile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCreateAccount = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="create-profile-container">
      <header className='welcome-header'>
      <img 
          src={Logo} 
          alt="Mind Care Logo" 
          className="logo" />
        <h1>Welcome to Mindcare</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
        
      </header>

      <main>
        <section className="create-profile-section">
          <h2>Create account below:</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleCreateAccount}>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />

            <button type="submit">Create Account</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default CreateProfile;
