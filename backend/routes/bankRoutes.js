// routes/bankRoutes.js
import express from 'express';
import * as bankService from '../services/bankService.js';

const router = express.Router();

// login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await bankService.authenticateUser(username, password);
    res.status(200).json({ success: true, message: "Login successful", role: username === 'admin' ? 'admin' : 'customer' });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// admin view all users
router.get('/admin/users', async (req, res) => {
  try {
    const users = await bankService.getAllUsernames();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// admin add user
router.post('/admin/users', async (req, res) => {
  try {
    const { username, password, initialBalance, accountType } = req.body;
    await bankService.createNewUser(username, password, initialBalance, accountType);
    res.status(201).json({ success: true, message: `User ${username} added successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// admin delete user
router.delete('/admin/users/:username', async (req, res) => {
  try {
    await bankService.removeUser(req.params.username);
    res.status(200).json({ success: true, message: `User ${req.params.username} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// updating rate
router.put('/admin/users/:username/rate', async (req, res) => {
  try {
    const { username } = req.params;
    const { newRate } = req.body;
    await bankService.updateInterestRate(username, newRate);
    res.status(200).json({ success: true, message: `Interest rate for ${username} updated to ${newRate}.` });
  } catch(error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer view balance
router.get('/customer/:username/balance', async (req, res) => {
  try {
    const info = await bankService.getAccountDetails(req.params.username);
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// customer deposit
router.post('/customer/:username/deposit', async (req, res) => {
  try {
    const newBalance = await bankService.executeDeposit(req.params.username, req.body.amount);
    res.status(200).json({ success: true, message: `Deposited $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer withdraw
router.post('/customer/:username/withdraw', async (req, res) => {
  try {
    const newBalance = await bankService.executeWithdrawal(req.params.username, req.body.amount);
    res.status(200).json({ success: true, message: `Withdrew $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer transfer
router.post('/customer/:username/transfer', async (req, res) => {
  try {
    const { targetUsername, amount } = req.body;
    const newBalance = await bankService.executeTransfer(req.params.username, targetUsername, amount);
    res.status(200).json({ success: true, message: `Transferred $${amount} to ${targetUsername}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;