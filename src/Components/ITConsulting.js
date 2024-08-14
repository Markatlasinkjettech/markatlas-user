
import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './Customservices/Header';
import HeroSection from './IT/HeroSection';
import Footer from './Footer';
import Partner from './Partners';
import Services from './IT/Services'
import WhyChooseUs from './IT/WhyChooseUs';
import ContactUs from './IT/ContactUs';
const Home = () => {
  useEffect(() => {
    fadeInUp();
    fadeInLeft();
    fadeInRight();
  }, []);

  return (
    <div className="font-sans">
      <Header />
      <main className="container mx-auto px-4 pt-20 space-y-12">
  <HeroSection />
  <Services />
  <WhyChooseUs />
  <ContactUs />
</main>

      < Partner/>
      <Footer />
    </div>
  );
};

export default Home;
