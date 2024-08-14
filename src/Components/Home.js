import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import Footer from './Footer';
import Technologies from './Technologies';
import BlogSection from './Blogasection';
import ChooseUs from './ChooseUs';
import Partner from './Partners';
import BlogList from './Bloglist';
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
        <ServicesSection />
        <Technologies/>
        < ChooseUs/>
        <BlogList/>
        < Partner/>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
