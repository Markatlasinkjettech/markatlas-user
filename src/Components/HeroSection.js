import React, { useEffect, useState } from 'react';
import './HeroSection.css';  // Import CSS for additional styles

const HeroSection = () => {
  const [displayText, setDisplayText] = useState("Welcome to MarkAtlas Inkjet");

  useEffect(() => {
    // Change text after 3 seconds
    const timer = setTimeout(() => {
      setDisplayText("Accelerating our company Through Innovative IT solutions");
    }, 3000);
    
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <section className="hero-section flex flex-col justify-center items-center relative min-h-screen overflow-hidden text-center py-12">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">{displayText}</h1>
      <div className="flex justify-center space-x-2 mb-8 animate-fadeInUp" style={{animationDelay: '2s'}}>
        <div className="w-12 h-1 bg-orange-500"></div>
        <div className="w-12 h-1 bg-orange-500"></div>
      </div>
      <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors duration-300 animate-fadeInUp" style={{animationDelay: '0.4s'}}>Explore Our Solutions</button>
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="background-overlay"></div>
      </div>
    </section>
  );
};

export default HeroSection;
