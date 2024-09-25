import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom'; 
import '../index.css';
import Logo from '../assets/Mind-Care-Logo.svg';

interface Habit {
  id: number;
  name: string;
  time: string; 
  completed: boolean;
}

interface Day {
  id: number;
  date: string; 
  habits: Habit[]; 
  completed: boolean;
}

const MySchedulePage: React.FC = () => {
  const { scheduleId } = useParams<{ scheduleId: string }>(); 
  const [days, setDays] = useState<Day[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/schedule/${scheduleId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDays(data.days);
        } else {
          console.error('Failed to load schedule');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, [scheduleId]);

  const toggleHabitCompletion = async (dayId: number, habitId: number) => {
    const updatedDays = days.map((day) => {
      if (day.id === dayId) {
        const updatedHabits = day.habits.map((habit) =>
          habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
        );
        return { ...day, habits: updatedHabits };
      }
      return day;
    });
    setDays(updatedDays);
  
    await fetch(`/api/schedule/${scheduleId}/habit/${habitId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !days.find((day) => day.id === dayId)?.habits.find((habit) => habit.id === habitId)?.completed }),
    });
  };

  return (
    <div className="my-schedule-container">
      <header className='welcome-header'>
        <img 
          src={Logo} 
          alt="Mind Care Logo" 
          className="logo" 
          onClick={() => navigate('/home')} />
        <h1>Your Schedule</h1>
        <nav>
          <ul>
            <li><a className='navBar' href="/home">Home</a></li>
            <li><a className='navBar' href="/about">About</a></li>
            <li><a className='navBar' href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="schedule-section">
          <h2>Schedule Details</h2>
          {days.length === 0 ? (
            <p>Loading schedule...</p>
          ) : (
            <div>
              {days.map((day) => (
                <div key={day.id} className="day-section">
                  <h3>{day.date}</h3>
                  <ul>
                    {day.habits.map((habit) => (
                      <li key={habit.id}>
                        <input
                          type="checkbox"
                          checked={habit.completed}
                          onChange={() => toggleHabitCompletion(day.id, habit.id)}
                        />
                        <label>
                          {habit.name} at {habit.time}
                        </label>
                      </li>
                    ))}
                  </ul>
                  {day.habits.every((habit) => habit.completed) && (
                    <p>Day Completed &#10004;&#65039;</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MySchedulePage;
