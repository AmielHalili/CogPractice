import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';

function Login() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="auth" />

      <div className="grid flex-1 grid-cols-1 lg:grid-cols-2">
        <div className="hidden flex-col justify-center bg-slate-900 p-12 text-white lg:flex">
          <h2 className="max-w-sm text-3xl font-semibold tracking-tight">
            Secure, simple banking, whenever you need it.
          </h2>
          <p className="mt-3 max-w-sm text-slate-300">
            Sign in to check your balance, move money, and manage your
            account.
          </p>
        </div>

        <div className="flex items-center justify-center bg-slate-50 p-6">
          <LoginForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Login;
