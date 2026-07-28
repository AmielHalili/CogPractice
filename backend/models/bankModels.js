export class Account {
  #accountNumber;
  #balance;

  constructor(accountNumber, balance) {
    this.#accountNumber = accountNumber;
    this.#balance = balance;
  }

  get accountNumber() { return this.#accountNumber; }
  get balance() { return this.#balance; }

  getInterestRate() {
    return 0.0;
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
  getInterestRate() { return 0.01; }
}

export class SavingsAccount extends Account {
  getInterestRate() { return 0.03; }
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
