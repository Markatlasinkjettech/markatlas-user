import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './Contact/Header';
import HeroSection from './Contact/HeroSection';
import Map from './Contact/Map';

import Footer from './Footer';

import Partner from './Partners';
const Home = () => {
  useEffect(() => {
    fadeInUp();
    fadeInLeft();
    fadeInRight();
  }, []);

  return (
    <div className="font-sans">
      <Header />
      <main className="container mx-auto px-4 pt-20">
        <HeroSection />
     <Map/>
     <Partner/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
