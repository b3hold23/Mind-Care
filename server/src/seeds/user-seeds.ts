import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JohnSmith', password: 'password' },
    { username: 'SunnySide', password: 'password' },
    { username: 'CmanderZavala', password: 'password' },
  ], { individualHooks: true });
};
