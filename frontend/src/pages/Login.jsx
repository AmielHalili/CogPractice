import { Link } from 'react-router-dom';
import anchorIcon from '../assets/anchoricon.png';
import heroImage from '../assets/image2.jpeg';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden flex-col overflow-hidden bg-linear-to-br from-accent-500 to-accent-800 p-12 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2.5 font-heading text-lg font-extrabold">
          <img src={anchorIcon} alt="Anchor Bank" className="h-8 w-8 rounded-full" />
          Anchor Bank
        </Link>
        <div className="mt-10 max-w-sm">
          <h1 className="font-heading text-4xl font-extrabold leading-tight">
            Secure, simple banking, whenever you need it.
          </h1>
          <p className="mt-4 text-base text-accent-100">
            Sign in to check your balance, move money, and manage your
            account.
          </p>
        </div>
        <div className="mt-8 flex-1 overflow-hidden rounded-2xl shadow-lg">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-white p-6 sm:p-12">
        <div className="mx-auto w-full max-w-md">
          <Link to="/" className="mb-8 inline-block text-sm font-medium text-slate-500 hover:text-slate-700">
            ← Back to home
          </Link>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
