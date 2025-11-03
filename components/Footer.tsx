
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { WorldIcon } from './Icons';

const Footer: React.FC = () => {

  return (
    <footer className="bg-secondary text-light mt-16">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
             <NavLink to="/" className="flex items-center gap-2 text-2xl font-bold font-serif text-light">
                <img 
                  src="/images/Untitled.png" 
                  alt="Chaloman Tours and Travels Logo" 
                  className="h-8 w-auto"
                />
                Chaloman Tours and Travels
            </NavLink>
            <p className="mt-4 text-accent">Crafting unforgettable journeys, one adventure at a time.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <NavLink to={link.path} className="hover:text-highlight transition-colors duration-300">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://facebook.com/chalomantours" target="_blank" rel="noopener noreferrer" className="hover:text-highlight transition-colors duration-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com/chalomantours" target="_blank" rel="noopener noreferrer" className="hover:text-highlight transition-colors duration-300">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com/chalomantours" target="_blank" rel="noopener noreferrer" className="hover:text-highlight transition-colors duration-300">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/company/chaloman-tours" target="_blank" rel="noopener noreferrer" className="hover:text-highlight transition-colors duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-4">Join Our Newsletter</h3>
            <p className="text-accent mb-4">Get the latest travel deals and inspiration.</p>
            <form className="flex">
              <input type="email" placeholder="Your Email" className="w-full bg-accent/50 text-light px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-highlight" />
              <button type="submit" className="bg-highlight text-primary font-bold px-4 py-2 rounded-r-md hover:bg-opacity-80 transition-colors">
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-accent pt-8 text-center text-accent">
          <p>&copy; {new Date().getFullYear()} Chaloman Tours and Travels. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
