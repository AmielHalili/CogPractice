// services/bankService.js
import { User } from '../models/bankModels.js';

// Seed initial data if database is empty
{/* Seed initial data if database is empty 
export const initData = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.create([
      { username: 'admin', password: 'admin123' },
      { 
        username: 'user1', 
        password: 'pass1', 
        account: { accountNumber: 'SAV-user1', balance: 1000.00, interestRate: 0.03, accountType: 'savings' } 
      },
      { 
        username: 'user2', 
        password: 'pass2', 
        account: { accountNumber: 'SAV-user2', balance: 1000.00, interestRate: 0.03, accountType: 'savings' } 
      },
      { 
        username: 'amiel', 
        password: 'halili', 
        account: { accountNumber: 'SAV-amiel', balance: 1000.00, interestRate: 0.03, accountType: 'savings' } 
      }
    ]);
    console.log("Database seeded with default users.");
  }
};

*/}

export const authenticateUser = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user || user.password !== password) {
    throw new Error("Invalid username or password");
  }
  return user;
};

export const getAllUsernames = async () => {
  const users = await User.find({}, 'username');
  return users.map(u => u.username);
};

export const createNewUser = async (username, password, initialBalance, accountType) => {
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const isChecking = accountType === 1 || accountType === 'checking';
  const newAccount = {
    accountNumber: `${isChecking ? 'CHK' : 'SAV'}-${username}`,
    balance: Number(initialBalance),
    interestRate: isChecking ? 0.01 : 0.03,
    accountType: isChecking ? 'checking' : 'savings'
  };

  const newUser = await User.create({
    username,
    password,
    account: newAccount
  });

  return newUser.username;
};

export const removeUser = async (username) => {
  if (username === "admin") throw new Error("Cannot delete the admin user.");
  const deleted = await User.findOneAndDelete({ username });
  if (!deleted) throw new Error("User not found.");
};

export const getAccountDetails = async (username) => {
  const user = await User.findOne({ username });
  if (!user || !user.account) throw new Error("Account details missing.");
  return {
    accountNumber: user.account.accountNumber,
    balance: user.account.balance,
    interestRate: `${user.account.interestRate * 100}%`
  };
};

export const updateInterestRate = async (username, newRate) => {
  const numericRate = Number(newRate);
  if (isNaN(numericRate) || numericRate < 0) throw new Error("Interest rate cannot be negative.");

  const user = await User.findOne({ username });
  if (!user || !user.account) throw new Error("Account context lost.");

  user.account.interestRate = numericRate;
  await user.save();

  return {
    username: user.username,
    accountNumber: user.account.accountNumber,
    newRate: user.account.interestRate
  };
};

export const executeDeposit = async (username, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Deposit amount must be positive.");

  const user = await User.findOne({ username });
  if (!user || !user.account) throw new Error("Account context lost.");

  user.account.balance += numAmount;
  await user.save();
  return user.account.balance;
};

export const executeWithdrawal = async (username, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Withdrawal amount must be positive.");

  const user = await User.findOne({ username });
  if (!user || !user.account) throw new Error("Account context lost.");

  if (numAmount > user.account.balance) throw new Error("Insufficient funds.");

  user.account.balance -= numAmount;
  await user.save();
  return user.account.balance;
};

export const executeTransfer = async (sourceUsername, targetUsername, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Transfer amount must be positive.");

  const sourceUser = await User.findOne({ username: sourceUsername });
  const targetUser = await User.findOne({ username: targetUsername });

  if (!sourceUser || !sourceUser.account) throw new Error("Source account missing.");
  if (!targetUser || !targetUser.account) throw new Error("Recipient account not found.");

  if (numAmount > sourceUser.account.balance) throw new Error("Insufficient funds.");

  sourceUser.account.balance -= numAmount;
  targetUser.account.balance += numAmount;

  await sourceUser.save();
  await targetUser.save();

  return sourceUser.account.balance;
};