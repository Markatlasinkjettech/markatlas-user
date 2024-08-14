import React, { useState } from 'react';
import { Shield, BarChart2, Code, Smartphone, Search, Cloud } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`p-6 rounded-lg transition-all duration-300 ease-in-out
                  ${isHovered ? 'scale-105 shadow-2xl bg-blue-400 text-black' : 'scale-100 shadow-md bg-white text-gray-600'}
                  animate-fadeIn`}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mb-4 transition-all duration-300 ${isHovered ? 'scale-110 text-white' : 'scale-100 text-orange-500'}`}>
        <Icon size={40} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${isHovered ? 'text-white' : 'text-gray-800'}`}>{title}</h3>
      <p className={`${isHovered ? 'text-white' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Cyber Security",
      description: "We offer a range of cybersecurity services to protect your business from cyber threats. Our services include vulnerability assessments, penetration testing, and threat intelligence."
    },
    {
      icon: BarChart2,
      title: "Data Analytics",
      description: "Our data analytics services help you gain actionable insights and drive business growth through effective data management and analysis."
    },
    {
      icon: Code,
      title: "Web Development",
      description: "We create custom websites tailored to your brand and business needs. Our web development services enhance user experience and showcase your brand effectively."
    },
    {
      icon: Smartphone,
      title: "Apps Development",
      description: "We specialize in mobile app development for iOS and Android platforms, creating apps that engage your customers and support your business goals."
    },
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Our cloud services offer cost reduction and flexibility with cloud migration, infrastructure management, and security."
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Improve your online visibility and drive organic traffic with our comprehensive SEO optimization services."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-orange-500 mb-8 lg:mb-12">Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;