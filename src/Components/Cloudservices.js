
import React, { useEffect } from 'react';
import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
import Header from './Customservices/Header';
import HeroSection from './Cloud/HeroSection';
import Footer from './Footer';
import Partner from './Partners';
import CloudService from './Cloud/CloudServices';
import CloudBenefits from './Cloud/CloudBenefits';
import WhyChooseUs from './Cloud/WhyChooseUs';
import ContactUs from './Cloud/ContactUs';
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
      <CloudService/>
      <CloudBenefits/>
      <WhyChooseUs/>
      <ContactUs/>
      </main>
      < Partner/>
      <Footer />
    </div>
  );
};

export default Home;
