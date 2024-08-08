import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './Customservices/Header';
import HeroSection from './Customservices/HeroSection';
import Features from './Customservices/Featurer';
import Footer from './Footer';
import Process from './Customservices/Process';
import Technologies from './Customservices/Technologies';
import Partner from './Partners';
import Footers from './Customservices/Footers';
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
       <Features/>
        <Process/>
        <Technologies/>
       
        <Footers />
      </main>
      < Partner/>
      <Footer />
    </div>
  );
};

export default Home;
