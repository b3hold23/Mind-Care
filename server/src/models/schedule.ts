import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/connection.js';
import { Habit } from './habit.js'; // Import the Habit model

interface ScheduleAttributes {
  id?: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface ScheduleCreationAttributes extends Optional<ScheduleAttributes, 'id'> {}

class Schedule extends Model<ScheduleAttributes, ScheduleCreationAttributes>
  implements ScheduleAttributes {
  public id!: number;
  public title!: string;
  public userId!: number;
  public completed!: boolean;
  
  // This will be filled in by Sequelize's include when fetching the data
  public habits?: Habit[]; // Add habits association to Schedule type
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Schedule',
  }
);

// Define the relationship between Schedule and Habit
Schedule.hasMany(Habit, {
  foreignKey: 'scheduleId',
  as: 'habits', // Ensure the alias 'habits' is used
});

Habit.belongsTo(Schedule, {
  foreignKey: 'scheduleId',
});

export { Schedule };
