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

  const actionIcons = {
    Deposit: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="m8 12 4 4 4-4"></path></svg>
    ),
    Withdraw: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16V8"></path><path d="m8 12 4-4 4 4"></path></svg>
    ),
    Transfer: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
    ),
  };

  const actions = [
    { label: 'Deposit', description: 'Add funds to your account', onClick: handleDeposit },
    { label: 'Withdraw', description: 'Take funds out of your account', onClick: handleWithdraw },
    { label: 'Transfer', description: 'Send funds to another user', onClick: handleTransfer },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-linear-to-br from-accent-500 to-accent-800 p-8 text-white shadow-md">
        <p className="text-sm text-accent-100">
          {account ? `${account.accountType === 'checking' ? 'Checking' : 'Savings'} account · ${account.accountNumber}` : 'Loading account...'}
        </p>
        <p className="mt-3 font-heading text-4xl font-extrabold tabular-nums sm:text-5xl">
          {account ? account.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '—'}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-white/15 px-3 py-1.5">Interest rate: {account ? `${(account.interestRate * 100).toFixed(1)}%` : '—'}</span>
          <span className="rounded-full bg-white/15 px-3 py-1.5">Account type: {account ? (account.accountType === 'checking' ? 'Checking' : 'Savings') : '—'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="rounded-2xl bg-white p-6 text-left shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg active:translate-y-0"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-accent-500">
              {actionIcons[action.label]}
            </span>
            <p className="mt-3.5 font-heading font-extrabold text-slate-900">{action.label}</p>
            <p className="mt-1 text-sm text-slate-500">{action.description}</p>
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-3 font-heading font-extrabold text-slate-900">Recent activity</h3>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500">
              <th className="border-b-2 border-slate-100 py-2.5 font-medium">Description</th>
              <th className="border-b-2 border-slate-100 py-2.5 font-medium">Date</th>
              <th className="border-b-2 border-slate-100 py-2.5 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-sm text-slate-500">No transactions yet.</td>
              </tr>
            )}
            {transactions.map((txn, index) => (
              <tr key={index}>
                <td className="border-b border-slate-100 py-3">
                  <div className="font-medium text-slate-900">{TXN_LABELS[txn.txnType] ?? txn.txnType}</div>
                  {(txn.txnType === 'transfer_out' || txn.txnType === 'transfer_in') &&
                    (txn.counterpartyName || txn.counterpartyEmail) && (
                      <div className="text-xs text-slate-500">
                        {txn.txnType === 'transfer_out' ? 'To ' : 'From '}
                        {txn.counterpartyName || txn.counterpartyEmail}
                      </div>
                    )}
                </td>
                <td className="border-b border-slate-100 py-3 text-slate-500">
                  {new Date(txn.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </td>
                <td
                  className={`border-b border-slate-100 py-3 text-right tabular-nums font-semibold ${
                    isCredit(txn.txnType) ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {isCredit(txn.txnType) ? '+' : '-'} ${txn.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerDashboard;
