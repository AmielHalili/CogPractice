import {login} from "../api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function LoginForm() {
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
      const formData = new FormData(event.target);
      const email = formData.get('email');
      const password = formData.get('password');
      const response = await login(email, password);
      if (response.data.success) {
        const role = response.data.role;
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'customer') {
          navigate('/customer');
        } else {
          setSubmitError('Unknown user role.');
        }
      } else {
        setSubmitError(response.data.message || 'Login failed.');
      }
    }
    catch (error) {
      setSubmitError(error.response?.data?.message || 'An error occurred during login.');
    }
    
  }


  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
        <p className="mt-1 text-sm text-slate-500">
          Enter your credentials to access your account.
        </p>
      </div>
      {submitError && <p className="mb-4 text-sm text-red-600">{submitError}</p>}

      <form className="space-y-5"
      onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
              Forgot password?
            </a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          
        >
          Sign in
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <span className="font-medium text-slate-700">
          Contact your bank administrator.
        </span>
      </p>
    </div>
  );
}

export default LoginForm;
