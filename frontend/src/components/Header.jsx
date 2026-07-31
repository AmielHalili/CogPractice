import { useContext } from 'react';
import { Link } from 'react-router-dom';
import anchorIcon from '../assets/anchoricon.png';
import { AuthContext } from '../context/AuthContext';


const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

function Header({ variant = 'marketing', subtitle }) {
  const isMarketing = variant === 'marketing';
  const isDashboard = variant === 'dashboard';
  const { logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5 mr-auto">
          <img
            src={anchorIcon}
            alt="Anchor Bank"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <span className="block font-heading text-lg font-extrabold leading-tight text-slate-900">
              Anchor Bank
            </span>
            {subtitle && (
              <span className="block text-xs text-slate-500">{subtitle}</span>
            )}
          </div>
        </Link>

        {isMarketing && (
          <>
            <div className="hidden items-center gap-7 text-sm font-semibold text-slate-700 md:flex">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-accent-500">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition duration-150 hover:-translate-y-0.5 hover:bg-accent-600 hover:shadow-lg active:translate-y-0"
              >
                Log in
              </Link>
            </div>
          </>
        )}

        {isDashboard && (
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition duration-150 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md active:translate-y-0"
            onClick={() => {
              logout();
            }}
          >
            Log out
          </button>
        )}

        {variant === 'auth' && (
          <Link
            to="/"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← Back to home
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
