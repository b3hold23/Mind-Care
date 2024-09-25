import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection.js'; // Ensure this is correctly set up in your config
// import { Schedule } from './schedule.js'; // Import the Schedule model for relationships

interface HabitAttributes {
  id: number;
  type: string;
  timeOfDay: string;
  frequency: string;
  completed: boolean;
  scheduleId: number; // Foreign key to relate to a schedule
}

class Habit extends Model<HabitAttributes> implements HabitAttributes {
  public id!: number;
  public type!: string;
  public timeOfDay!: string;
  public frequency!: string;
  public completed!: boolean;
  public scheduleId!: number;
}

Habit.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeOfDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    scheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Habit',
  }
);

export { Habit };
