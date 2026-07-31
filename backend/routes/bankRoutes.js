// routes/bankRoutes.js
import express from 'express';
import * as bankService from '../services/bankService.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const { role, token } = await bankService.authenticateUser(email, password);
    res.status(200).json({ success: true, message: "Login successful", role, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// admin view all users
router.get('/admin/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const users = await bankService.getAllUsers();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// admin add user
router.post('/admin/users', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { name, email, password, initialBalance, accountType } = req.body;
    await bankService.createNewUser(name, email, password, initialBalance, accountType);
    res.status(201).json({ success: true, message: `User ${email} added successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// admin delete user
router.delete('/admin/users/:email', requireAuth, requireAdmin, async (req, res) => {
  try {
    await bankService.removeUser(req.params.email);
    res.status(200).json({ success: true, message: `User ${req.params.email} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// updating rate
router.put('/admin/users/:email/rate', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { email } = req.params;
    const { newRate } = req.body;
    await bankService.updateInterestRate(email, newRate);
    res.status(200).json({ success: true, message: `Interest rate for ${email} updated to ${newRate}.` });
  } catch(error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer view balance
router.get('/customer/balance', requireAuth, async (req, res) => {
  try {
    const info = await bankService.getAccountDetails(req.user.id);
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// customer view transaction history
router.get('/customer/transactions', requireAuth, async (req, res) => {
  try {
    const transactions = await bankService.getTransactionHistory(req.user.id);
    res.status(200).json({ success: true, transactions });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// customer deposit
router.post('/customer/deposit', requireAuth, async (req, res) => {
  try {
    const newBalance = await bankService.executeDeposit(req.user.id, req.body.amount);
    res.status(200).json({ success: true, message: `Deposited $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer withdraw
router.post('/customer/withdraw', requireAuth, async (req, res) => {
  try {
    const newBalance = await bankService.executeWithdrawal(req.user.id, req.body.amount);
    res.status(200).json({ success: true, message: `Withdrew $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer transfer
router.post('/customer/transfer', requireAuth, async (req, res) => {
  try {
    const { targetEmail, amount } = req.body;
    const newBalance = await bankService.executeTransfer(req.user.id, targetEmail, amount);
    res.status(200).json({ success: true, message: `Transferred $${amount} to ${targetEmail}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
