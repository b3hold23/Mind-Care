import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';
import Logo from '../assets/Mind-Care-Logo.svg';


const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="contact-container">
      <header className='welcome-header'>
      <img 
          src={Logo} 
          alt="Mind Care Logo" 
          className="logo" 
          onClick={() => navigate('/home')} />
        <h1>Contact Us</h1>
        <nav>
          <ul>
            <li><a className="navBar" href="/home">Home</a></li>
            <li><a className="navBar" href="/about">About</a></li>
            <li><a className="navBar" href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>If you have any questions, feedback, or need support, feel free to reach out to us on Github.</p>
          <h2>Get in Touch!</h2>
          <p>If you have any questions, feedback, or need support, feel free to reach out to us.</p>
          
          <h3>Github Usernames:</h3>
          <ul>
            <li>b3hold23</li>
            <li>MagneticSoul7</li>
            <li>Redwolf917</li>
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
