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

// admin add user
router.post('/admin/users', (req, res) => {
  try {
    const { username, password, initialBalance, accountType } = req.body;
    bankService.createNewUser(username, password, initialBalance, accountType);
    res.status(201).json({ success: true, message: `User ${username} added successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// admin delete user
router.delete('/admin/users/:username', (req, res) => {
  try {
    bankService.removeUser(req.params.username);
    res.status(200).json({ success: true, message: `User ${req.params.username} deleted successfully.` });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


//for put, updating rate
router.put('/admin/users/:username/rate', (req, res) => {
  try {
    const { username } = req.params;
    const { newRate } = req.body;

   
    bankService.updateInterestRate(username, newRate);
    res.status(200).json({ success: true, message: `Interest rate for ${username} updated to ${newRate}.` });

  } catch(error) {
    res.status(400).json({ success: false, message: error.message });
  }
});


// customer view balance
router.get('/customer/:username/balance', (req, res) => {
  try {
    const info = bankService.getAccountDetails(req.params.username);
    res.status(200).json({ success: true, data: info });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

// customer deposit/add
router.post('/customer/:username/deposit', (req, res) => {
  try {
    const newBalance = bankService.executeDeposit(req.params.username, req.body.amount);
    res.status(200).json({ success: true, message: `Deposited $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

//customer withdraw/remove
router.post('/customer/:username/withdraw', (req, res) => {
  try {
    const newBalance = bankService.executeWithdrawal(req.params.username, req.body.amount);
    res.status(200).json({ success: true, message: `Withdrew $${req.body.amount}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// customer transfer
router.post('/customer/:username/transfer', (req, res) => {
  try {
    const { targetUsername, amount } = req.body;
    const newBalance = bankService.executeTransfer(req.params.username, targetUsername, amount);
    res.status(200).json({ success: true, message: `Transferred $${amount} to ${targetUsername}`, newBalance });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});



export default router;
