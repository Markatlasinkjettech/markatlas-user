import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import InsightsHeader from './Tech/HeroSection';
import Footer from './Footer';
import Header from './Tech/Header'
import Technologies from './Technologies';
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
        <InsightsHeader />
      
        <Technologies/>
       
     
      </main>
      < Partner/>
      <Footer />
    </div>
  );
};

export default Home;
