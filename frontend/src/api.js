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
export const getBalance = (email) =>
  API.get(`/customer/${email}/balance`);

export const deposit = (email, amount) =>
  API.post(`/customer/${email}/deposit`, { amount });

export const withdraw = (email, amount) =>
  API.post(`/customer/${email}/withdraw`, { amount });

export const transfer = (email, targetEmail, amount) =>
  API.post(`/customer/${email}/transfer`, { targetEmail, amount });