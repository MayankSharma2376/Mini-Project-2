import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const heroStyle = {
    backgroundImage: `url('/hero.jpg')`,
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center text-white"
      style={heroStyle}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-tight mb-6">
            Make a <br /> Difference For <br /> The Planet
          </h1>
          <button
            onClick={() => navigate('/register')}
            className="inline-flex items-center gap-3 bg-[#6ca06c] text-white font-semibold text-base sm:text-lg py-3 px-6 sm:py-4 sm:px-8 rounded-full transition-all duration-300 ease-in-out transform hover:bg-[#5a8a5a] hover:-translate-y-1"
          >
            Get Started <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;