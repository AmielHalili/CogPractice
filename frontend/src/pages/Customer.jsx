import Header from '../components/Header';
import Footer from '../components/Footer';
import CustomerDashboard from '../components/CustomerDashboard';

function Customer() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header variant="dashboard" />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-2xl font-extrabold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your account.
          </p>
        </div>
        <CustomerDashboard />
      </main>

      <Footer />
    </div>
  );
}

export default Customer;
