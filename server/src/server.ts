const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import routes from './routes/index.js';
import express, { Request, Response } from 'express';
import fetch from 'node-fetch'; // Import node-fetch
import cors from 'cors';
import sequelize from 'sequelize';



const app = express();
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

// Enable CORS
app.use(cors());

// Route to fetch a quote from ZenQuotes API
app.get('/api/quote', async (req: Request, res: Response) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();
    res.json(data); // Send the quote data to the frontend
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Failed to fetch the quote' });
  }
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
