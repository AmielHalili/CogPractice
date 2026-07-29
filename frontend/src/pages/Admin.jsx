import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminDashboard from '../components/AdminDashboard';

function Admin() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header variant="dashboard" subtitle="Admin panel" />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage users, accounts, and interest rates.
          </p>
        </div>
        <AdminDashboard />
      </main>

      <Footer />
    </div>
  );
}

export default Admin;
