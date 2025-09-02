import React from 'react';
import { FaRecycle } from 'react-icons/fa';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#2f4f39', // solid dark green
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const navListStyle = {
    display: 'flex',
    listStyle: 'none',
    gap: '1.5rem',
    alignItems: 'center',
  };

  const navLinkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s',
    fontSize: '1rem',
  };

  const buttonStyle = {
    backgroundColor: '#6ca06c',
    padding: '8px 18px',
    borderRadius: '25px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '0.95rem',
    transition: 'background-color 0.3s',
  };

  return (
    <header style={headerStyle}>
      <div style={navStyle}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaRecycle style={{ color: '#fff', fontSize: '1.6rem' }} />
          <h1 style={{ color: '#fff', margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>
            Waste Zero
          </h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul style={navListStyle}>
            <li><a href="#about" style={navLinkStyle}>About</a></li>
            <li><a href="#contact" style={navLinkStyle}>Contact Us</a></li>
            <li><a href="#pickup" style={buttonStyle}>Schedule Pickup</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
