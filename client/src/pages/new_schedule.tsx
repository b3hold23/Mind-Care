import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';

const habitOptions = ['Meditate', 'Read a Book', 'Enjoy Nature', 'Work on Art', 'Listen to Music', 'Personal Hobby'];
const frequencyOptions = ['Every day', 'Every other day', 'Every two days'];

interface HabitEntry {
  habit: string;
  time: string;
  frequency: string;
}

const NewSchedulePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [habits, setHabits] = useState<HabitEntry[]>([
    { habit: '', time: '', frequency: '' },
  ]);
  const navigate = useNavigate();

  const handleHabitChange = (index: number, field: keyof HabitEntry, value: string) => {
    const updatedHabits = [...habits];
    updatedHabits[index][field] = value;
    setHabits(updatedHabits);
  };

  const addHabitEntry = () => {
    if (habits.length < 5) {
      setHabits([...habits, { habit: '', time: '', frequency: '' }]);
    }
  };

  const removeHabitEntry = () => {
    if (habits.length > 1) {
      setHabits(habits.slice(0, -1));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/schedules', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, habits }),
      });

      if (response.ok) {
        navigate('/home'); 
      } else {
        console.error('Failed to create schedule');
      }
    } catch (error) {
      console.error('Error submitting schedule:', error);
    }
  };

  return (
    <div className="new-schedule-container">
      <header>
        <h1>Create New Schedule</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="new-schedule-section">
          <h2>Schedule Details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Schedule Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {habits.map((habitEntry, index) => (
              <div key={index} className="habit-entry">
                <label htmlFor={`habit-${index}`}>Habit {index + 1}</label>
                <select
                  id={`habit-${index}`}
                  value={habitEntry.habit}
                  onChange={(e) => handleHabitChange(index, 'habit', e.target.value)}
                  required
                >
                  <option value="">Select a habit</option>
                  {habitOptions.map((habit) => (
                    <option key={habit} value={habit}>{habit}</option>
                  ))}
                </select>

                <label htmlFor={`time-${index}`}>Time of Day</label>
                <input
                  type="time"
                  id={`time-${index}`}
                  value={habitEntry.time}
                  onChange={(e) => handleHabitChange(index, 'time', e.target.value)}
                  required
                />

                <label htmlFor={`frequency-${index}`}>Frequency</label>
                <select
                  id={`frequency-${index}`}
                  value={habitEntry.frequency}
                  onChange={(e) => handleHabitChange(index, 'frequency', e.target.value)}
                  required
                >
                  <option value="">Select frequency</option>
                  {frequencyOptions.map((freq) => (
                    <option key={freq} value={freq}>{freq}</option>
                  ))}
                </select>
              </div>
            ))}

            <div className="habit-buttons">
              <button type="button" onClick={addHabitEntry} disabled={habits.length >= 5}>Add Habit</button>
              <button type="button" onClick={removeHabitEntry} disabled={habits.length <= 1}>Remove Habit</button>
            </div>

            <button type="submit">Create Schedule</button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Mind Care. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NewSchedulePage;
