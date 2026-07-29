const actions = [
  { label: 'Deposit', description: 'Add funds to your account' },
  { label: 'Withdraw', description: 'Take funds out of your account' },
  { label: 'Transfer', description: 'Send funds to another user' },
];

const activity = [
  { label: 'Deposit', amount: '+ $250.00', date: 'Jul 27' },
  { label: 'Transfer to user2', amount: '- $75.00', date: 'Jul 24' },
  { label: 'Withdrawal', amount: '- $40.00', date: 'Jul 20' },
];

function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-slate-900 p-8 text-white">
        <p className="text-sm text-slate-300">Savings account · SAV-user1</p>
        <p className="mt-2 text-4xl font-semibold">$1,000.00</p>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-300">
          <span>Interest rate: 3.0%</span>
          <span>Account type: Savings</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.label}
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
          {activity.map((item) => (
            <div
              key={item.label + item.date}
              className="flex items-center justify-between px-5 py-4"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{item.label}</p>
                <p className="text-sm text-slate-500">{item.date}</p>
              </div>
              <p
                className={`text-sm font-semibold ${
                  item.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'
                }`}
              >
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
