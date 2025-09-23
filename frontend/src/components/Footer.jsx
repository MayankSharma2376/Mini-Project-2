import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#e5e5dc] text-[#1b4332] py-6 text-center font-sans">
      <div className="container mx-auto px-4">
        <p className="font-bold text-lg">
          Copyright &copy; {new Date().getFullYear()} Waste Zero.
        </p>
      </div>
    </footer>
  );
};

export default Footer;