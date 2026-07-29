import Header from '../components/Header';
import Footer from '../components/Footer';

const features = [
  {
    title: 'Checking accounts',
    description: 'Fee-free everyday spending with real-time balance tracking.',
  },
  {
    title: 'Savings that grow',
    description: 'Competitive interest rates, compounded automatically.',
  },
  {
    title: 'Instant transfers',
    description: 'Move money between accounts in seconds, not days.',
  },
];

const stats = [
  { label: 'Customers', value: '50k+' },
  { label: 'In deposits', value: '$2B+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Support', value: '24/7' },
];

const steps = [
  {
    number: '01',
    title: 'Open an account',
    description: 'Apply online in minutes with no paperwork and no branch visit required.',
  },
  {
    number: '02',
    title: 'Fund your account',
    description: 'Transfer from an existing bank or set up direct deposit with your employer.',
  },
  {
    number: '03',
    title: 'Start banking',
    description: 'Deposit, withdraw, and transfer instantly from your dashboard.',
  },
];

const testimonials = [
  {
    quote:
      'Switching to Anchor Bank cut my monthly fees to zero and I can actually reach a real person when I call support.',
    name: 'Jordan Reyes',
    role: 'Small business owner',
  },
  {
    quote:
      'The savings rate alone paid for itself. Opening the account took less time than my coffee order.',
    name: 'Priya Nair',
    role: 'Freelance designer',
  },
  {
    quote:
      'Transfers land instantly and the dashboard is the clearest banking UI I have used.',
    name: 'Marcus Webb',
    role: 'Software engineer',
  },
];

function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="marketing" />

      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Banking that stays steady, wherever life takes you.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Anchor Bank gives you simple, secure accounts with no hidden fees
            and real people behind the support line.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
            >
              Open an account
            </a>
            <a
              href="#features"
              className="rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Learn more
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Everything you need, nothing you don't.
          </h2>
          <p className="mt-3 text-slate-500">
            Three account tools built to keep your money simple to manage.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
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
              <h3 className="mt-4 font-semibold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Get started in three steps.
            </h2>
            <p className="mt-3 text-slate-500">
              From application to your first transfer, most customers are
              banking with us the same day.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-sm font-semibold text-emerald-600">
                  {step.number}
                </span>
                <h3 className="mt-2 font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Trusted by customers like you.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 p-6"
            >
              <p className="text-sm text-slate-600">"{testimonial.quote}"</p>
              <p className="mt-4 text-sm font-semibold text-slate-900">
                {testimonial.name}
              </p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-20 text-center">
          <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-slate-900">
            Ready to bank with Anchor?
          </h2>
          <p className="max-w-md text-slate-500">
            Open an account in minutes and start managing your money the
            simple way.
          </p>
          <a
            href="#"
            className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get started
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
