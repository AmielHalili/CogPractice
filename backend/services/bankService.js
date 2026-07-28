import { User, SavingsAccount, CheckingAccount } from '../models/bankModels.js';

// Replicates: static Map<String, User> map = new HashMap<>();
const bankDatabase = new Map();

//initali data and paosswords
const initData = () => {
  bankDatabase.set("admin", new User("admin", "admin123"));
  
  const user1 = new User("user1", "pass1");
  user1.account = new SavingsAccount("SAV-user1", 1000.00);
  bankDatabase.set("user1", user1);

  const user2 = new User("user2", "pass2");
  user2.account = new SavingsAccount("SAV-user2", 1000.00);
  bankDatabase.set("user2", user2);

  const amiel = new User("amiel", "halili");
  amiel.account = new SavingsAccount("SAV-amiel", 1000.00);
  bankDatabase.set("amiel", amiel);
};
initData();

export const authenticateUser = (username, password) => {
  const user = bankDatabase.get(username);
  if (!user || user.password !== password) {
    throw new Error("Invalid username or password");
  }
  return user;
};

export const getAllUsernames = () => {
  return Array.from(bankDatabase.keys());
};

export const createNewUser = (username, password, initialBalance, accountType) => {
  if (bankDatabase.has(username)) {
    throw new Error("Username already exists.");
  }
  const newUser = new User(username, password);
  newUser.account = accountType === 1 
    ? new CheckingAccount(`CHK-${username}`, initialBalance)
    : new SavingsAccount(`SAV-${username}`, initialBalance);

  bankDatabase.set(username, newUser);
  return username;
};

export const removeUser = (username) => {
  if (username === "admin") throw new Error("Cannot delete the admin user.");
  if (!bankDatabase.has(username)) throw new Error("User not found.");
  bankDatabase.delete(username);
};

export const getAccountDetails = (username) => {
  const user = bankDatabase.get(username);
  if (!user || !user.account) throw new Error("Account details missing.");
  return {
    accountNumber: user.account.accountNumber,
    balance: user.account.balance,
    interestRate: `${user.account.getInterestRate() * 100}%`
  };
};

export const executeDeposit = (username, amount) => {
  const user = bankDatabase.get(username);
  if (!user || !user.account) throw new Error("Account context lost.");
  return user.account.deposit(Number(amount));
};

export const executeWithdrawal = (username, amount) => {
  const user = bankDatabase.get(username);
  if (!user || !user.account) throw new Error("Account context lost.");
  return user.account.withdraw(Number(amount));
};

export const executeTransfer = (sourceUsername, targetUsername, amount) => {
  const sourceUser = bankDatabase.get(sourceUsername);
  const targetUser = bankDatabase.get(targetUsername);

  if (!sourceUser || !sourceUser.account) throw new Error("Source account missing.");
  if (!targetUser || !targetUser.account) throw new Error("Recipient account not found.");

  sourceUser.account.transfer(targetUser.account, Number(amount));
  return sourceUser.account.balance;
};


export const fetchAllUsers = async () => {
  // Your logic to get users or read from the bank database map
  return ["admin", "user1", "user2", "amiel"]; 
};