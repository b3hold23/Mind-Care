import fetch from 'node-fetch';
import type { Request, Response } from 'express';
import express from 'express';

const router = express.Router();
// Route to fetch a quote from ZenQuotes API
router.get('/', async (_req: Request, res: Response) => {
    try {
      console.log('Fetching a quote...');
      const response = await fetch('https://zenquotes.io/api/random');
      const data = await response.json();
      console.log(data);
      res.json(data); // Send the quote data to the frontend
    } catch (error) {
      console.error('Error fetching quote:', error);
      res.status(500).json({ message: 'Failed to fetch the quote' });
    }
  });
  
  export { router as quoteRoutes };