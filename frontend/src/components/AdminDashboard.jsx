

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

  return (
    <div className="space-y-8">


      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h3 className="font-semibold text-slate-900">Users</h3>
            <span className="text-sm text-slate-500">{users.length} total</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500">
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Email</th>
                  <th className="px-5 py-3 font-medium">Account type</th>
                  <th className="px-5 py-3 font-medium">Balance</th>
                  <th className="px-5 py-3 font-medium">Interest rate</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-5 py-3 font-medium text-slate-900">
                      {user.name}
                    </td>
                    <td className="px-5 py-3 text-slate-600">{user.email}</td>
                    <td className="px-5 py-3 text-slate-600">{user.accountType}</td>
                    <td className="px-5 py-3 text-slate-600">{user.balance}</td>
                    <td className="px-5 py-3 text-slate-600">{user.rate}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-3">
                        <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700"
                          onClick={() => handleEditClick(user.email)}
                        >
                          Edit rate
                        </button>
                        <button className="text-sm font-medium text-red-500 hover:text-red-600"
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

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 font-semibold text-slate-900">Add new user</h3>
          <form className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                type="text"
                placeholder="e.g. Jane Smith"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. jsmith@bank.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Temporary password"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Initial balance
              </label>
              <input
                type="text"
                placeholder="$0.00"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Account type
              </label>
              <select className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100">
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
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
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
