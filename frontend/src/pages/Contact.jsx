import Header from '../components/Header';
import Footer from '../components/Footer';

const contactInfo = [
  { label: 'Email', value: 'support@anchorbank.example' },
  { label: 'Phone', value: '1 (800) 555-0182' },
  { label: 'Address', value: '400 Harbor Way, Suite 200, Seattle, WA' },
  { label: 'Hours', value: 'Mon–Fri, 8am–8pm ET' },
];

function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F6F7FB]">
      <Header variant="marketing" />

      <section className="bg-linear-to-br from-accent-500 to-accent-800">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center text-white">
          <h1 className="mx-auto max-w-2xl font-heading text-4xl font-extrabold tracking-tight sm:text-5xl">
            We're here to help.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-accent-100">
            Questions about your account or opening a new one? Reach out and
            a real person will get back to you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl flex-1 px-6 py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Get in touch
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Fill out the form and our team will respond within one
              business day.
            </p>

            <form className="mt-8 space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-100"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-accent-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lg active:translate-y-0 sm:w-auto"
              >
                Send message
              </button>
            </form>
          </div>

          <div className="space-y-5">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-white p-6 shadow-sm transition duration-150 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {item.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
