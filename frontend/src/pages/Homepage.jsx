import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Mission from '../components/Mission';
import Pickup from '../components/Pickup';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Mission />
      <Pickup />
      <Footer />
    </div>
  );
};

export default HomePage;