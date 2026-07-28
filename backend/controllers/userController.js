import { fetchAllUsers } from '../services/bankService.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error); // Passes errors to our global error handling middleware
  }
};
