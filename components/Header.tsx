
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { MenuIcon, CloseIcon, WorldIcon, UserCircleIcon } from './Icons';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeLinkClass = 'text-highlight';
  const inactiveLinkClass = 'hover:text-highlight transition-colors duration-300';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-secondary/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold font-serif text-light">
            <WorldIcon className="h-8 w-8 text-highlight animate-spin [animation-duration:10s]" />
            Chaloman
          </NavLink>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `${isActive ? activeLinkClass : inactiveLinkClass} font-semibold text-lg`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `hidden md:block ${isActive ? 'text-highlight' : 'text-light hover:text-highlight'} transition-colors duration-300`
                }
                aria-label="User Profile"
            >
                <UserCircleIcon className="h-8 w-8" />
            </NavLink>
            
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-light focus:outline-none">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-secondary shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-6 flex justify-end">
          <button onClick={() => setIsOpen(false)} className="text-light focus:outline-none">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-6 mt-8">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${isActive ? activeLinkClass : inactiveLinkClass} text-2xl font-semibold`
              }
            >
              {link.name}
            </NavLink>
          ))}
           <NavLink
              to="/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${isActive ? activeLinkClass : inactiveLinkClass} text-2xl font-semibold flex items-center gap-2`
              }
            >
              <UserCircleIcon className="h-7 w-7" />
              Profile
            </NavLink>
        </nav>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-[-1] md:hidden"></div>}
    </header>
  );
};

export default Header;