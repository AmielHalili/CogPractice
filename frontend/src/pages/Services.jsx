import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const services = [
  {
    title: 'Checking accounts',
    description: 'Fee-free everyday spending with real-time balance tracking and instant alerts.',
  },
  {
    title: 'Savings accounts',
    description: 'Competitive interest rates, compounded automatically with no minimum balance.',
  },
  {
    title: 'Transfers & payments',
    description: 'Move money between accounts or to other Anchor Bank customers in seconds.',
  },
  {
    title: 'Business banking',
    description: 'Dedicated accounts and tools built for freelancers and small business owners.',
  },
  {
    title: 'Loans & credit',
    description: 'Straightforward personal loans and credit lines with transparent terms.',
  },
  {
    title: '24/7 support',
    description: 'Reach a real person any time of day, no phone trees, no waiting on hold.',
  },
];

function Services() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F7FB]">
      <Header variant="marketing" />

      <section className="bg-linear-to-br from-accent-500 to-accent-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <h1 className="mx-auto max-w-2xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            Banking tools for every part of your life.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-accent-100">
            From everyday spending to growing a business, Anchor Bank has an
            account built for it.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl flex-1 px-6 py-16">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100 text-accent-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <h3 className="mt-4 font-heading font-extrabold text-slate-900">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center">
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-slate-900">
            Not sure which account fits you?
          </h2>
          <p className="max-w-md text-slate-500">
            Reach out and our team will help you find the right fit, no
            pressure.
          </p>
          <Link
            to="/contact"
            className="rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lg active:translate-y-0"
          >
            Contact us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
