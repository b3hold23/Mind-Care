import { Router } from 'express';
import { google } from 'googleapis';
import { authenticateToken, attachGoogleTokens } from '../../middleware/auth.js';
import { Schedule, Habit } from '../../models/index.js'; // Import the Schedule and Habit models
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// OAuth 2.0 client configuration
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Step 1: Generate Google OAuth URL
router.get('/auth/google', (_req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
  res.json({ url: authUrl });
});

// Step 2: Handle Google OAuth callback and get tokens
router.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const { tokens } = await oauth2Client.getToken(code);

    const accessToken = tokens.access_token || ''; // Handle potential null
    const refreshToken = tokens.refresh_token || ''; // Handle potential null

    if (req.user) {
      req.user.tokens = {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
      return res.json({ message: 'Authenticated', tokens }); // Return success response
    } else {
      return res.status(500).json({ error: 'User not authenticated' }); // Return error response
    }
  } catch (error) {
    console.error('Error during Google auth callback:', error);
    return res.status(500).json({ error: 'Google authentication failed' }); // Return error response
  }
});

// Step 3: Create Google Calendar events from user schedule
router.post('/add-events', authenticateToken, attachGoogleTokens, async (req, res) => {
    const { scheduleId } = req.body;
    const { access_token } = req.googleTokens || {}; // Handle potential undefined
  
    if (!access_token) {
      return res.status(401).json({ error: 'Google Calendar access token is missing' });
    }
  
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token });
  
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
    try {
      // Fetch the schedule with associated habits
      const schedule = await Schedule.findByPk(scheduleId, {
        include: { model: Habit, as: 'habits' }, // Ensure 'habits' are included in the query
      });
  
      if (!schedule) {
        return res.status(404).json({ message: 'Schedule not found' });
      }
  
      if (!schedule.habits || schedule.habits.length === 0) {
        return res.status(400).json({ message: 'No habits found for the schedule' });
      }
  
      // Loop through the habits and create events in Google Calendar
      for (let habit of schedule.habits) {
        const startDateTime = new Date(habit.timeOfDay); // Parse the start time as a Date object
  
        // Calculate end time (start time + 30 minutes)
        const endDateTime = new Date(startDateTime);
        endDateTime.setMinutes(startDateTime.getMinutes() + 30); // Add 30 minutes
  
        await calendar.events.insert({
          calendarId: 'primary',
          requestBody: {
            summary: habit.type, // Event title
            start: {
              dateTime: startDateTime.toISOString(), // Convert to ISO string for Google Calendar
              timeZone: 'America/New_York',
            },
            end: {
              dateTime: endDateTime.toISOString(), // Convert to ISO string for Google Calendar
              timeZone: 'America/New_York',
            },
            recurrence: ['RRULE:FREQ=DAILY;COUNT=21'], // 3-week recurrence
          },
        });
      }
  
      return res.json({ message: 'Events added to Google Calendar' });
    } catch (error) {
      console.error('Error adding events to Google Calendar:', error);
      return res.status(500).json({ error: 'Failed to add events' });
    }
  });
  

export { router as googleCalendarRoutes };
