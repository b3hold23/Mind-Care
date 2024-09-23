import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Navigation
import '../index.css';

interface Schedule {
  id: number;
  title: string;
  completed: boolean;
}

const HomePage: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const navigate = useNavigate();

  // Fetch random quote from ZenQuotes API
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      setQuote(data[0].q); // Get the quote text
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  // Fetch user's schedules from the server (PostgreSQL)
  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token'); // Get user's JWT token
      const response = await fetch('/api/schedules', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSchedules(data.schedules); // Set the user's schedules
      } else {
        console.error('Failed to load schedules');
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchQuote();
    fetchSchedules();
  }, []);

  // Navigate to the Create Schedule page
  const handleCreateSchedule = () => {
    navigate('/new_schedule');
  };

  // Navigate to view a specific schedule
  const viewSchedule = (scheduleId: number) => {
    navigate(`/my_schedule/${scheduleId}`);
  };

  return (
    <div className="home-container">
      <header>
        <h1 onClick={() => navigate('/home')}>Mind Care</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="quote-section">
          <h2>Inspirational Quote</h2>
          <p>{quote ? `"${quote}"` : 'Fetching a quote...'}</p>
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
