

import React, { useEffect, useState} from 'react';

import {fetchUsers, updateRate, deleteUser, createUser} from '../api.js';




function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        if (response.data.success) {
          
          setUsers(response.data.users.map(user => ({
            name: user.name,
            email: user.email,
            accountType: user.account?.accountType ?? '—',
            balance: user.account?.balance ?? '—',
            rate: user.account?.interestRate ?? '—',
          }))
          );

        } else {
          console.error('Failed to fetch users:', data.message);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

  const handleEditClick = async (email) => {
    const newRate = prompt(`Enter new interest rate for ${email}:`);
    if (newRate !== null) {
      try {
        await updateRate(email, newRate);
        console.log(`Interest rate for ${email} updated to ${newRate}`);
        loadUsers(); // Refresh the user list after updating the rate
      } catch (error) {
        console.error(`Error updating interest rate for ${email}:`, error);
      }

    }
  };

  const handleDeleteClick = async (email) => {
    if (window.confirm(`Are you sure you want to delete user ${email}?`)) {
      try {
        await deleteUser(email);
        console.log(`User ${email} deleted successfully`);
        loadUsers(); // Refresh the user list after deletion
      } catch (error) {
        console.error(`Error deleting user ${email}:`, error);
      }
    }
  }

  const handleAddUser = async (userData) => {
    try {
      await createUser(userData);
      console.log(`User ${userData.email} created successfully`);
      loadUsers(); // Refresh the user list after adding a new user
    } catch (error) {
      console.error(`Error creating user ${userData.email}:`, error);
    }
  }

  

  useEffect(() => {
    
    loadUsers();
  }, []);

  const initials = (name) =>
    name
      .split(' ')
      .map((part) => part[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const formatBalance = (balance) =>
    typeof balance === 'number'
      ? balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      : balance;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-heading font-extrabold text-slate-900">Users</h3>
            <span className="rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-800">{users.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-slate-500">
                  <th className="border-b-2 border-slate-100 py-3 pr-4 font-medium">User</th>
                  <th className="border-b-2 border-slate-100 py-3 pr-4 font-medium">Type</th>
                  <th className="border-b-2 border-slate-100 py-3 pr-4 text-right font-medium">Balance</th>
                  <th className="border-b-2 border-slate-100 py-3 pr-6 text-right font-medium">Rate</th>
                  <th className="border-b-2 border-slate-100 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="border-b border-slate-100 py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent-100 text-xs font-bold text-accent-800">
                          {initials(user.name)}
                        </span>
                        <div>
                          <div className="font-medium text-slate-900">{user.name}</div>
                          <div className="text-xs text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-slate-100 py-4 pr-4">
                      <span className="rounded-full border border-accent-500 px-2.5 py-0.5 text-xs font-medium text-accent-500">
                        {user.accountType}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 py-4 pr-4 text-right tabular-nums text-slate-600">{formatBalance(user.balance)}</td>
                    <td className="border-b border-slate-100 py-4 pr-6 text-right tabular-nums text-slate-600">{user.rate}</td>
                    <td className="border-b border-slate-100 py-4 whitespace-nowrap">
                      <div className="flex gap-4">
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                          onClick={() => handleEditClick(user.email)}
                        >
                          Edit rate
                        </button>
                        <button className="text-sm font-semibold text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteClick(user.email)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-heading font-extrabold text-slate-900">Add new user</h3>
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Smith"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. jsmith@bank.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Temporary password"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Initial balance
              </label>
              <input
                type="text"
                placeholder="$0.00"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Account type
              </label>
              <select className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100">
                <option
                value='savings'
                >Savings</option>
                <option
                value='checking'
                >Checking</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg active:translate-y-0"
              onClick={async (e) => {
                e.preventDefault();
                const form = e.target.form;
                const newUser = {
                  name: form[0].value,
                  email: form[1].value,
                  password: form[2].value,
                  initialBalance: parseFloat(form[3].value),
                  accountType: form[4].value,
                };
                try {
                  if (!newUser.name || !newUser.email || !newUser.password || isNaN(newUser.initialBalance) || !newUser.accountType) {

                    alert('Please fill in all fields correctly.');
                    return;
                  }
                  await handleAddUser(newUser);
                  form.reset();
                } catch (error) {
                  console.error('Error adding user:', error);
                  alert('Failed to add user. Please try again.');
                }
              }
              }
            >
              Add user
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
