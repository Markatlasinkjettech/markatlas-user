import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './About/Header';
import HeroSection from './About/HeroSection';
import AboutSection from './About/AboutSection';
import HistoryTimeline from './About/History';
import Footer from './Footer';
import Partners from './Partners';
import Projects from './About/Projects';
import ChooseUs from './ChooseUs';
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
        <AboutSection />
        <HistoryTimeline/>
        < ChooseUs/>
       <Partners/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
