import React, { useState } from 'react';
import { FaRecycle } from 'react-icons/fa';
import { FiMenu, FiX } from 'react-icons/fi'; // Icons for hamburger menu

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#contact', text: 'Contact Us' },
  ];

  return (
    <header className="bg-[#2f4f39] sticky top-0 z-50 py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <FaRecycle className="text-white text-2xl" />
          <h1 className="text-white text-2xl font-bold">Waste Zero</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-white font-medium text-base hover:text-green-200 transition-colors duration-300"
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#pickup"
            className="bg-[#6ca06c] text-white font-semibold py-2 px-5 rounded-full text-sm hover:bg-[#5a8a5a] transition-colors duration-300"
          >
            Schedule Pickup
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (conditionally rendered) */}
      {isMenuOpen && (
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col items-center gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium text-base hover:text-green-200"
                >
                  {link.text}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#pickup"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#6ca06c] text-white font-semibold py-2 px-5 rounded-full text-sm hover:bg-[#5a8a5a] w-full text-center block"
              >
                Schedule Pickup
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;