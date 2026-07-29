import Header from '../components/Header';
import Footer from '../components/Footer';

const stats = [
  { label: 'Founded', value: '2010' },
  { label: 'Customers', value: '50k+' },
  { label: 'Assets managed', value: '$2B+' },
  { label: 'Customer rating', value: '4.8/5' },
];

const values = [
  {
    title: 'Security first',
    description:
      'Every account is protected with bank-grade encryption and continuous fraud monitoring.',
  },
  {
    title: 'Radical transparency',
    description:
      'No hidden fees, no fine print. What you see when you open an account is what you get.',
  },
  {
    title: 'Real support',
    description:
      'Every customer can reach a real person, day or night, no phone trees required.',
  },
];

function About() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header variant="marketing" />

      <section className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Banking built around people, not fees.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-300">
            Anchor Bank started with a simple idea: banking should be
            straightforward, fair, and easy to understand.
          </p>
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

      <section className="mx-auto max-w-7xl flex-1 px-6 py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
              Our mission
            </h2>
            <p className="mt-4 text-slate-500">
              We believe everyone deserves a bank that respects their time and
              their money. That means no surprise fees, no confusing account
              tiers, and no waiting on hold for hours to get a simple answer.
            </p>
            <p className="mt-4 text-slate-500">
              Since 2010, we've grown from a small community bank into a
              trusted partner for tens of thousands of customers, all while
              keeping the same principles we started with.
            </p>
          </div>

          <div className="space-y-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <h3 className="font-semibold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
