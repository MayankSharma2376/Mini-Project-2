import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  
  const heroStyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/hero.jpg')`, // Dark overlay added
    backgroundSize: 'cover', // Ensures image covers entire section
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', // Prevents repeating
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 5%',
    color: '#fff',
    textAlign: 'left',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: '800',
    lineHeight: '1.2',
    marginBottom: '1.5rem',
    maxWidth: '500px',
    textTransform: 'uppercase',
  };

  const buttonStyle = {
    backgroundColor: '#6ca06c',
    padding: '14px 28px',
    borderRadius: '30px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <section style={heroStyle}>
      <div>
        <h1 style={headingStyle}>
          MAKE A <br /> DIFFERENCE FOR <br /> THE PLANET
        </h1>
        <button
          style={buttonStyle}
          onClick={() => navigate('/register')}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#588b58';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#6ca06c';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          Get Started <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Hero;