import { Router } from 'express';
import { Schedule } from '../../models/schedule.js';
import { Habit } from '../../models/habit.js'; // Import Habit model
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

// GET /api/schedules - Fetch all schedules and their habits for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = (req.user as { id: number }).id;
        const schedules = await Schedule.findAll({
            where: { userId },
            include: [Habit], // Include habits with schedules
        });
        res.json({ schedules });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedules' });
    }
});

// POST /api/schedules - Create a new schedule and its habits
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, habits } = req.body;
    const userId = (req.user as { id: number }).id;
    console.log("habit", habits);

    // Create the new schedule
    const newSchedule = await Schedule.create({
        title,
        userId,
        completed: false // This ensures the "completed" field defaults to false
      });
      
    // Create associated habits
    for (let habit of habits) {
      await Habit.create({ ...habit, scheduleId: newSchedule.id });
    }

    res.json(newSchedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule' });
  }
});

// PUT /api/schedules/:id - Update habits for a specific schedule
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { habits } = req.body;
    
    const schedule = await Schedule.findByPk(id);
    
    if (schedule) {
      // Update each habit
      for (let habit of habits) {
        await Habit.update(habit, { where: { id: habit.id, scheduleId: id } });
      }

      res.json({ message: 'Schedule updated successfully' });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule' });
  }
});

export { router as scheduleRoutes };
