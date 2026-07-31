import { useEffect, useState } from 'react';
import { getBalance, deposit, withdraw, transfer, getTransactions } from '../api.js';

const TXN_LABELS = {
  deposit: 'Deposit',
  withdrawal: 'Withdrawal',
  transfer_out: 'Transfer out',
  transfer_in: 'Transfer in',
};

const isCredit = (txnType) => txnType === 'deposit' || txnType === 'transfer_in';

function CustomerDashboard() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const loadAccount = async () => {
    try {
      const response = await getBalance();
      if (response.data.success) {
        setAccount(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching account details:', error);
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await getTransactions();
      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  useEffect(() => {
    loadAccount();
    loadTransactions();
  }, []);

  const handleDeposit = async () => {
    const amount = prompt('Enter amount to deposit:');
    if (amount === null) return;
    try {
      await deposit(parseFloat(amount));
      loadAccount();
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Deposit failed.');
    }
  };

  const handleWithdraw = async () => {
    const amount = prompt('Enter amount to withdraw:');
    if (amount === null) return;
    try {
      await withdraw(parseFloat(amount));
      loadAccount();
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Withdrawal failed.');
    }
  };

  const handleTransfer = async () => {
    const targetEmail = prompt("Enter recipient's email:");
    if (targetEmail === null) return;
    const amount = prompt('Enter amount to transfer:');
    if (amount === null) return;
    try {
      await transfer(targetEmail, parseFloat(amount));
      loadAccount();
      loadTransactions();
    } catch (error) {
      alert(error.response?.data?.message || 'Transfer failed.');
    }
  };

  const actions = [
    { label: 'Deposit', description: 'Add funds to your account', onClick: handleDeposit },
    { label: 'Withdraw', description: 'Take funds out of your account', onClick: handleWithdraw },
    { label: 'Transfer', description: 'Send funds to another user', onClick: handleTransfer },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
        <p className="text-sm text-slate-300">
          {account ? `${account.accountType === 'checking' ? 'Checking' : 'Savings'} account · ${account.accountNumber}` : 'Loading account...'}
        </p>
        <p className="mt-2 text-4xl font-semibold">
          {account ? `$${account.balance.toFixed(2)}` : '—'}
        </p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
          <span>Interest rate: {account ? `${(account.interestRate * 100).toFixed(1)}%` : '—'}</span>
          <span>Account type: {account ? (account.accountType === 'checking' ? 'Checking' : 'Savings') : '—'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="rounded-xl border border-slate-200 bg-white p-5 text-left transition hover:border-slate-300 hover:shadow-sm"
          >
            <p className="font-semibold text-slate-900">{action.label}</p>
            <p className="mt-1 text-sm text-slate-500">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h3 className="font-semibold text-slate-900">Recent activity</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {transactions.length === 0 && (
            <p className="px-5 py-4 text-sm text-slate-500">No transactions yet.</p>
          )}
          {transactions.map((txn, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{TXN_LABELS[txn.txnType] ?? txn.txnType}</p>
                <p className="text-sm text-slate-500">
                  {new Date(txn.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  isCredit(txn.txnType) ? 'text-emerald-600' : 'text-slate-900'
                }`}
              >
                {isCredit(txn.txnType) ? '+' : '-'} ${txn.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
