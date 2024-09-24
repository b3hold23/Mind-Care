import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { email: 'JohnSmith@gmail.com', password: 'password' },
    { email: 'SunnySide@gmail.com', password: 'password' },
    { email: 'CmanderZavala@gmail.com', password: 'password' },
  ], { individualHooks: true });
};
