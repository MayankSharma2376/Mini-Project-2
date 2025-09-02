import React from 'react';

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: '#e5e5dc', // beige
        color: '#1b4332',           // dark green text
        padding: '1.5rem 0',
        textAlign: 'center',
        fontFamily: '"Poppins", sans-serif' // handwriting style
      }}
    >
      <div className="container">
        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Copyright © 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
