import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5050/api/bank', 
});

// LOGIN
export const login = (username, password) => 
  API.post('/login', { username, password });

// ADMIN CRUD
export const fetchUsers = () => 
  API.get('/admin/users');

export const createUser = (userData) => 
  API.post('/admin/users', userData);

export const deleteUser = (username) => 
  API.delete(`/admin/users/${username}`);

export const updateRate = (username, newRate) => 
  API.put(`/admin/users/${username}/rate`, { newRate });

// CUSTOMER CRUD
export const getBalance = (username) => 
  API.get(`/customer/${username}/balance`);

export const deposit = (username, amount) => 
  API.post(`/customer/${username}/deposit`, { amount });

export const withdraw = (username, amount) => 
  API.post(`/customer/${username}/withdraw`, { amount });

export const transfer = (username, targetUsername, amount) => 
  API.post(`/customer/${username}/transfer`, { targetUsername, amount });