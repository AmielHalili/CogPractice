import express from 'express';
import * as bankService from '../services/bankService.js';

const router = express.Router();

// login
router.post('/login', (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = bankService.authenticateUser(username, password);
    res.status(200).json({ success: true, message: "Login successful", role: username === 'admin' ? 'admin' : 'customer' });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// admin view all users
router.get('/admin/users', (req, res) => {
  const users = bankService.getAllUsernames();
  res.status(200).json({ success: true, users });
});

// admin create new user
// admin delete user
// customer view account details
// custpomer deposit
// customer withdraw
// customer transfer




export default router;
