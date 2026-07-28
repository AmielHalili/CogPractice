export class Account {
  #accountNumber;
  #balance;
  #interestRate;

  constructor(accountNumber, balance, rate =0.00) {
    this.#accountNumber = accountNumber;
    this.#balance = balance;
    this.#interestRate = rate;
  }

  get accountNumber() { return this.#accountNumber; }
  get balance() { return this.#balance; }

  getInterestRate() {
    return this.#interestRate;
  }

  setInterestRate(newRate) {
    this.#interestRate = Number(newRate);
  }

  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit amount must be positive.");
    this.#balance += amount;
    return this.#balance;
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error("Withdrawal amount must be positive.");
    if (amount > this.#balance) throw new Error("Insufficient funds.");
    this.#balance -= amount;
    return this.#balance;
  }

  transfer(targetAccount, amount) {
    if (!targetAccount) throw new Error("Target account does not exist.");
    this.withdraw(amount);
    targetAccount.deposit(amount);
  }
}

export class CheckingAccount extends Account {
  constructor(accountNumber, balance) {
    super(accountNumber, balance);
    this.setInterestRate(0.01);
  }
}

export class SavingsAccount extends Account {
    constructor(accountNumber, balance) {
    super(accountNumber, balance);
    this.setInterestRate(0.03);
    }
}

export class User {
  #username;
  #password;
  
  constructor(username, password) {
    this.#username = username;
    this.#password = password;
    this.account = null;
  }

  get username() { return this.#username; }
  get password() { return this.#password; }
}
