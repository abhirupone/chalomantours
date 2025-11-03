
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { MenuIcon, CloseIcon, WorldIcon, UserCircleIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

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
            <img
              src="/images/Untitled.png"
              alt="Chaloman Tours and Travels Logo"
              className="h-10 w-auto"
            />
            Chaloman Tours and Travels
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

            {/* User Authentication Section */}
            <div className="hidden md:block relative">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-light hover:text-highlight transition-colors duration-300"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover border-2 border-highlight"
                    />
                    <span className="text-sm font-medium">{user?.name.split(' ')[0]}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                        <p className="text-xs text-green-600 font-medium mt-1">🎉 10% Discount Active</p>
                      </div>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowUserMenu(false)}
                      >
                        My Profile
                      </NavLink>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-highlight text-primary font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
            
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

          {isAuthenticated ? (
            <>
              <div className="flex flex-col items-center gap-2 p-4 bg-primary/10 rounded-lg">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-highlight"
                />
                <p className="text-sm font-medium text-center">{user?.name}</p>
                <p className="text-xs text-green-600 font-medium">🎉 10% Discount Active</p>
              </div>
              <NavLink
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`${inactiveLinkClass} text-xl font-semibold`}
              >
                My Profile
              </NavLink>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className={`${inactiveLinkClass} text-xl font-semibold`}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setShowAuthModal(true);
                setIsOpen(false);
              }}
              className="bg-highlight text-primary font-bold py-3 px-6 rounded-lg hover:bg-opacity-80 transition-colors duration-300 text-xl"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/50 z-[-1] md:hidden"></div>}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </header>
  );
};

export default Header;