// services/bankService.js
import { User, Account, Transaction } from '../models/bankModels.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Seed initial data if database is empty
{/*
export const initData = async () => {
  const count = await User.countDocuments();
  if (count === 0) {
    const admin = await User.create({ name: 'Admin', email: 'admin@bank.com', password: 'admin123', role: 'admin' });

    const user1 = await User.create({ name: 'User One', email: 'user1@bank.com', password: 'pass1', role: 'customer' });
    await Account.create({ user: user1._id, accountNumber: 'SAV-user1', balance: 1000.00, interestRate: 0.03, accountType: 'savings' });

    const user2 = await User.create({ name: 'User Two', email: 'user2@bank.com', password: 'pass2', role: 'customer' });
    await Account.create({ user: user2._id, accountNumber: 'SAV-user2', balance: 1000.00, interestRate: 0.03, accountType: 'savings' });

    const amiel = await User.create({ name: 'Amiel Halili', email: 'amiel@bank.com', password: 'halili', role: 'customer' });
    await Account.create({ user: amiel._id, accountNumber: 'SAV-amiel', balance: 1000.00, interestRate: 0.03, accountType: 'savings' });

    console.log("Database seeded with default users.");
  }
};
*/}


export const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email });
  try{
    if (!user) throw new Error("User not found.");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password.");
  }catch (error) {
    throw new Error("Invalid email or password.");
  }
  const token = await jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
   
  return {
    role: user.role,
    token
  };
};

export const getAllUsers = async () => {
  const users = await User.find({ role: { $ne: 'admin' } }, '-password -__v').lean();
  const accounts = await Account.find({ user: { $in: users.map(u => u._id) } }).lean();
  const accountByUser = new Map(accounts.map(a => [String(a.user), a]));

  return users.map(u => ({
    ...u,
    account: accountByUser.get(String(u._id)) ?? null
  }));
};

export const createNewUser = async (name, email, password, initialBalance, accountType) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists.");
  }

  const isChecking = accountType === 1 || accountType === 'checking';

  const hashedPassword = await bcrypt.hash(password, 10);


  const newUser = await User.create({ name, email, password:hashedPassword, role: 'customer' });

  await Account.create({
    user: newUser._id,
    accountNumber: `${isChecking ? 'CHK' : 'SAV'}-${email.split('@')[0]}`,
    balance: Number(initialBalance),
    interestRate: isChecking ? 0.01 : 0.03,
    accountType: isChecking ? 'checking' : 'savings'
  });

  return newUser.email;
};

export const removeUser = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found.");
  if (user.role === "admin") throw new Error("Cannot delete the admin user.");

  const account = await Account.findOneAndDelete({ user: user._id });
  if (account) await Transaction.deleteMany({ account: account._id });
  await User.deleteOne({ _id: user._id });
};

const findAccountByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Account context lost.");
  const account = await Account.findOne({ user: user._id });
  if (!account) throw new Error("Account context lost.");
  return account;
};

export const getAccountDetails = async (email) => {
  const account = await findAccountByEmail(email);
  return {
    accountNumber: account.accountNumber,
    balance: account.balance,
    interestRate: account.interestRate
  };
};

export const updateInterestRate = async (email, newRate) => {
  const numericRate = Number(newRate);
  if (isNaN(numericRate) || numericRate < 0) throw new Error("Interest rate cannot be negative.");

  const account = await findAccountByEmail(email);
  account.interestRate = numericRate;
  await account.save();

  return {
    email,
    accountNumber: account.accountNumber,
    newRate: account.interestRate
  };
};

export const executeDeposit = async (email, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Deposit amount must be positive.");

  const account = await findAccountByEmail(email);
  account.balance += numAmount;
  await account.save();
  await Transaction.create({ account: account._id, txnType: 'deposit', amount: numAmount });

  return account.balance;
};

export const executeWithdrawal = async (email, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Withdrawal amount must be positive.");

  const account = await findAccountByEmail(email);
  if (numAmount > account.balance) throw new Error("Insufficient funds.");

  account.balance -= numAmount;
  await account.save();
  await Transaction.create({ account: account._id, txnType: 'withdrawal', amount: numAmount });

  return account.balance;
};

export const executeTransfer = async (sourceEmail, targetEmail, amount) => {
  const numAmount = Number(amount);
  if (numAmount <= 0) throw new Error("Transfer amount must be positive.");

  const sourceAccount = await findAccountByEmail(sourceEmail);
  const targetAccount = await findAccountByEmail(targetEmail);

  if (numAmount > sourceAccount.balance) throw new Error("Insufficient funds.");

  sourceAccount.balance -= numAmount;
  targetAccount.balance += numAmount;

  await sourceAccount.save();
  await targetAccount.save();
  await Transaction.create({ account: sourceAccount._id, txnType: 'transfer_out', amount: numAmount });
  await Transaction.create({ account: targetAccount._id, txnType: 'transfer_in', amount: numAmount });

  return sourceAccount.balance;
};
