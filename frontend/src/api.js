import axios from 'axios';

export const API = axios.create({
  baseURL: 'http://localhost:5050/api/bank', 
});

// LOGIN
export const login = (email, password) =>
  API.post('/login', { email, password });

// ADMIN CRUD
export const fetchUsers = () =>
  API.get('/admin/users');

export const createUser = (userData) =>
  API.post('/admin/users', userData);

export const deleteUser = (email) =>
  API.delete(`/admin/users/${email}`);

export const updateRate = (email, newRate) =>
  API.put(`/admin/users/${email}/rate`, { newRate });

// CUSTOMER CRUD
export const getBalance = () =>
  API.get('/customer/balance');

export const deposit = (amount) =>
  API.post('/customer/deposit', { amount });

export const withdraw = (amount) =>
  API.post('/customer/withdraw', { amount });

export const transfer = (targetEmail, amount) =>
  API.post('/customer/transfer', { targetEmail, amount });

export const getTransactions = () =>
  API.get('/customer/transactions');