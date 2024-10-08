import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import Logo from "../assets/Mind-Care-Logo.svg";
import Auth from "../utils/auth.js";

interface Schedule {
  id: number;
  title: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const [quote, setQuote] = useState("");
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();

  const fetchQuote = async () => {
    try {
      const response = await fetch("/api/quotes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${Auth.getToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data && data[0] && data[0].q) {
        setQuote(data[0].q);
      } else {
        setQuote("Unable to fetch a quote at the moment.");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch a quote.");
    }
  };

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/schedules', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSchedules(data.schedules);
      } else {
        console.error('Failed to load schedules');
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    fetchSchedules();
  }, []);

  const handleCreateSchedule = () => {
    navigate("/new_schedule");
  };

  const viewSchedule = (scheduleId: number) => {
    navigate(`/my_schedule/${scheduleId}`);
  };

  return (
    <div className="home-container">
      <header className='welcome-header'>
        <img 
          src={Logo} 
          alt="Mind Care Logo" 
          className="logo" 
          onClick={() => navigate('/home')} />
        <h1 className='welcome-title' onClick={() => navigate('/home')}>Mind Care</h1>
        <nav>
          <ul>
            <li><a href="/" className='navBar'>Home</a></li>
            <li><a href="/about" className='navBar'>About</a></li>
            <li><a href="/contact" className='navBar'>Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="quote-section">
          <h2>Inspirational Quote</h2>
          <p>{quote ? `"${quote}"` : "Fetching a quote..."}</p>
        </section>

        <section className="schedule-section">
          <h2>Your Schedules</h2>
          <button onClick={handleCreateSchedule}>Create New Schedule</button>
          {schedules.length === 0 ? (
            <p>No schedules yet. Create your first one!</p>
          ) : (
            <ul>
              {schedules.map((schedule) => (
                <li key={schedule.id}>
                  <span
                    style={{ textDecoration: schedule.completed ? 'line-through' : 'none' }}
                    onClick={() => viewSchedule(schedule.id)}
                  >
                    {schedule.title}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
