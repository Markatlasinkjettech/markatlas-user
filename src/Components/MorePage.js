import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import InsightsHeader from './More/HeroSection';
import Footer from './Footer';
import Header from './More/Header'
import Questions from './More/Questions';
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
      <Questions/>
      
       
     
      </main>
      < Partner/>
      <Footer />
    </div>
  );
};

export default Home;
