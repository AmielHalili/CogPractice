// models/bankModels.js
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, required: true },
  balance: { type: Number, required: true, default: 0.0 },
  interestRate: { type: Number, required: true, default: 0.03 },
  accountType: { type: String, enum: ['checking', 'savings'], default: 'savings' }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  account: { type: accountSchema, default: null }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
