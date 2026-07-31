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
    <header
      className={
        isMarketing ? 'bg-slate-900' : 'border-b border-slate-200 bg-white'
      }
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 ${
          isMarketing ? 'py-5' : 'py-4'
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={anchorIcon}
            alt="Anchor Bank"
            className="h-8 w-8 rounded-full"
          />
          <div>
            <span
              className={`block text-lg font-semibold leading-tight ${
                isMarketing ? 'text-white' : 'text-slate-900'
              }`}
            >
              Anchor Bank
            </span>
            {subtitle && (
              <span className="block text-xs text-slate-500">{subtitle}</span>
            )}
          </div>
        </Link>

        {isMarketing && (
          <>
            <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-slate-300 hover:text-white"
              >
                Log in
              </Link>
              <a
                href="#"
                className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-emerald-400"
              >
                Open an account
              </a>
            </div>
          </>
        )}

        {isDashboard && (
          <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
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
