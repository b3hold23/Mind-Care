import React from 'react';
import '../index.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-container">
      <header>
        <h1>About Mind Care</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="about-section">
          <h2>What is Mind Care?</h2>
          <p>
            Mind Care is an app designed to help you form healthy habits that improve mental well-being. 
            We believe that small, consistent actions can have a big impact on your mental health. 
            Whether you're meditating, enjoying nature, or working on a personal hobby, Mind Care helps 
            you track these habits and stay on top of your wellness goals.
          </p>
          <p>
            With the help of daily reminders and schedules tailored to your preferences, you can create 
            a personalized routine that fits your life. Our mission is to support your mental well-being, 
            one habit at a time.
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
