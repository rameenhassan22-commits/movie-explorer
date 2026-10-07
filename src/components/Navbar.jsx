import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const count = useSelector((state) => state.watchlist.items.length);
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "bg-white/20 text-white shadow-inner"
        : "text-indigo-100 hover:bg-white/10 hover:text-white hover:scale-105"
    }`;

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-white font-bold text-xl hover:scale-105 transition-transform duration-200"
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
              ▶
            </span>
            <span>MovieExplorer</span>
          </NavLink>

          <div className="hidden md:flex space-x-2 items-center">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/add" className={linkClass}>
              Add Movie
            </NavLink>
            <NavLink to="/watchlist" className={linkClass}>
              Watchlist
              <span className="ml-2 inline-flex items-center justify-center bg-white text-indigo-600 text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px]">
                {count}
              </span>
            </NavLink>
          </div>

          <button
            className="md:hidden text-white text-2xl hover:rotate-90 transition-transform duration-200"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {open && (
          <div className="md:hidden flex flex-col space-y-2 pb-4">
            <NavLink to="/" className={linkClass} end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/add" className={linkClass} onClick={() => setOpen(false)}>
              Add Movie
            </NavLink>
            <NavLink to="/watchlist" className={linkClass} onClick={() => setOpen(false)}>
              Watchlist ({count})
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}