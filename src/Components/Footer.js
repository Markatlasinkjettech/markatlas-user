import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">MARKATLAS INKJET</h2>
          <p className="text-sm">
            AT MARKATLAS INKJET, OUR MISSION IS TO HELP BUSINESSES GROW BY PROVIDING INNOVATIVE IT SOLUTIONS. WE STRIVE TO DELIVER THE HIGHEST QUALITY PRODUCTS AND SERVICES THAT EXCEED OUR CLIENTS' EXPECTATIONS.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        {/* Services Section */}
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">OUR SERVICES</h3>
          <ul className="text-center">
            <li className="mb-2">
              <Link to="/service1" className="hover:underline">CUSTOM SOFTWARE DEVELOPMENT</Link>
            </li>
            <li className="mb-2">
              <Link to="/service3" className="hover:underline">IT CONSULTING SERVICES</Link>
            </li>
            <li>
              <Link to="/service2" className="hover:underline">CLOUD COMPUTING SOLUTIONS</Link>
            </li>
          </ul>
        </div>
        
        {/* Contact Info Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT INFO</h3>
          <div className="flex items-center mb-2">
            <MapPin size={16} className="mr-2" />
            <p>UPPAL, HYDERABAD, TELANGANA</p>
          </div>
          <div className="flex items-center mb-2">
            <Phone size={16} className="mr-2" />
            <p>+1234567890</p>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            <p className="lowercase">info@markatlasinkjettechnologies.com</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 mt-8 pt-4 flex justify-between items-center">
        <p className="text-sm">COPYRIGHT © 2021 MARKATLAS INKJET - ALL RIGHTS RESERVED.</p>
        <Link to="/" className="text-sm hover:underline">TERMS & CONDITIONS</Link>
      </div>
    </footer>
  );
};

export default Footer;
