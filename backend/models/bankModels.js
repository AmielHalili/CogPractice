// models/bankModels.js
import mongoose from 'mongoose';

// Mirrors `users` table. Mongo's _id fills the role of user_id.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' }
}, { timestamps: { createdAt: true, updatedAt: false } });

// Mirrors `accounts` table. `user` is the user_id foreign key.
const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountNumber: { type: String, required: true },
  balance: { type: Number, required: true, default: 0.0 },
  accountType: { type: String, enum: ['checking', 'savings'], default: 'savings' },
  interestRate: { type: Number, required: true, default: 0.03 }
}, { timestamps: { createdAt: true, updatedAt: false } });

// Mirrors `transactions` table. `account` is the account_id foreign key.
// counterpartyName/counterpartyEmail are only set on transfer_out/transfer_in rows.
const transactionSchema = new mongoose.Schema({
  account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account', required: true },
  txnType: { type: String, enum: ['deposit', 'withdrawal', 'transfer_out', 'transfer_in'], required: true },
  amount: { type: Number, required: true },
  counterpartyName: { type: String },
  counterpartyEmail: { type: String }
}, { timestamps: { createdAt: true, updatedAt: false } });

export const User = mongoose.model('User', userSchema);
export const Account = mongoose.model('Account', accountSchema);
export const Transaction = mongoose.model('Transaction', transactionSchema);
