import React from 'react';
import '../index.css';

const ContactPage: React.FC = () => {
  return (
    <div className="contact-container">
      <header>
        <h1>Contact Us</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="contact-section">
          <h2>Get in Touch</h2>
          <p>If you have any questions, feedback, or need support, feel free to reach out to us.</p>
          
          <h3>Contact Information</h3>
          <ul>
            <li>Email: support@mindcare.com</li>
            <li>Phone: +1 123 456 7890</li>
            <li>Address: 123 Wellness Way, Healthy Town, HT 56789</li>
          </ul>
          
          <h3>Business Hours</h3>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 4:00 PM</p>
          <p>Sunday: Closed</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactPage;
