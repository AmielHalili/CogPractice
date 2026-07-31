import { Link } from 'react-router-dom';
import anchorIcon from '../assets/anchoricon.png';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Products',
    links: [
      { label: 'Checking', href: '/services' },
      { label: 'Savings', href: '/services' },
      { label: 'Transfers', href: '/services' },
      { label: 'Business banking', href: '/services' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '#' },
      { label: 'Terms of service', href: '#' },
      { label: 'Security', href: '#' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={anchorIcon}
                alt="Anchor Bank"
                className="h-6 w-6 rounded-full"
              />
              <span className="font-heading font-extrabold text-slate-900">Anchor Bank</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Simple, secure banking with no hidden fees.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="text-sm font-semibold text-slate-900">
                {column.title}
              </p>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-500 hover:text-accent-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-sm text-slate-500">
          © 2026 Anchor Bank. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
