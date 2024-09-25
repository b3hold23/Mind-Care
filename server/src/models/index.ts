import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { Schedule } from './schedule.js'; // Import Schedule model
import { Habit } from './habit.js'; // Import Habit model

const User = UserFactory(sequelize);

// Initialize associations between User, Schedule, and Habit
User.hasMany(Schedule, { foreignKey: 'userId' });
Schedule.belongsTo(User, { foreignKey: 'userId' });

Schedule.hasMany(Habit, { foreignKey: 'scheduleId' });
Habit.belongsTo(Schedule, { foreignKey: 'scheduleId' });

export { User, Schedule, Habit };
