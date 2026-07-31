import Header from '../components/Header';
import Footer from '../components/Footer';
import heroImage from '../assets/image1.jpg';

const features = [
  {
    title: 'Checking accounts',
    description: 'Fee-free everyday spending with real-time balance tracking.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
    ),
  },
  {
    title: 'Savings that grow',
    description: 'Competitive interest rates, compounded automatically.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 7 13.5 15.5 8.5 10.5 2 17"></path><path d="M16 7h6v6"></path></svg>
    ),
  },
  {
    title: 'Instant transfers',
    description: 'Move money between accounts in seconds, not days.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m17 2 4 4-4 4"></path><path d="M3 11v-1a4 4 0 0 1 4-4h14"></path><path d="m7 22-4-4 4-4"></path><path d="M21 13v1a4 4 0 0 1-4 4H3"></path></svg>
    ),
  },
];

const stats = [
  { label: 'Customers', value: '50K+' },
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
    <div className="min-h-screen bg-[#F6F7FB]">
      <Header variant="marketing" />

      <section className="px-6 py-16 sm:py-22">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <h1 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">
              Banking that holds its ground.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
              Anchor Bank pairs everyday checking and savings with real
              people behind the support line — no hidden fees, ever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#"
                className="rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lg active:translate-y-0"
              >
                Open an account
              </a>
              <a
                href="#features"
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition duration-150 hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 hover:shadow-md active:translate-y-0"
              >
                See how it works
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img src={heroImage} alt="Anchor Bank app" className="h-105 w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg">
              <p className="font-heading text-3xl font-extrabold text-accent-500 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Everything you need, nothing you don't.
          </h2>
          <p className="mt-3 text-slate-500">
            Three account tools built to keep your money simple to manage.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl bg-white p-7 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100 text-accent-500">
                {feature.icon}
              </span>
              <h3 className="mt-4 font-heading font-extrabold text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60">
        <div className="mx-auto max-w-7xl px-6 py-16">
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
                <span className="text-sm font-semibold text-accent-500">
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

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            Trusted by customers like you.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl bg-white p-6 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg"
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

      <section className="bg-linear-to-br from-accent-500 to-accent-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-16 text-center text-white">
          <h2 className="max-w-lg font-heading text-3xl font-extrabold tracking-tight sm:text-4xl">
            Open an account in minutes.
          </h2>
          <p className="max-w-md text-accent-100">
            Open an account in minutes and start managing your money the
            simple way.
          </p>
          <a
            href="#"
            className="rounded-lg bg-white px-6 py-3 font-heading text-sm font-extrabold text-accent-800 shadow-md transition duration-150 hover:-translate-y-0.5 hover:bg-accent-100 hover:shadow-xl active:translate-y-0"
          >
            Get started — no fees to open
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
