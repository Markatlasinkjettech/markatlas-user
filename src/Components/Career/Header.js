import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import image from '../company_logo.jpg';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Define the specific paths for each link
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'Career', path: '/career' },
    { name: 'More', path: '/more' },
    { name: 'Contact Us', path: '/contact-us' }
  ];

  // Define the dropdown links for Services
  const serviceLinks = [
    { name: 'Custom Software Development', path: '/service1' },
    { name: 'Cloud Computing Solutions', path: '/service2' },
    { name: 'IT Consulting Services', path: '/service3' }
  ];

  return (
    <header className="flex justify-between items-center p-4 bg-white fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="flex items-center animate-fadeInLeft">
        <img src={image} alt="MarkAtlas Inkjet" className="h-11 w-40" />
      </div>
      <nav className="hidden md:flex space-x-4 animate-fadeInRight">
        {links.map((link, index) => (
          link.name === 'Services' ? (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-600"
              >
                {link.name}
              </button>
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
                  {serviceLinks.map((service, index) => (
                    <Link
                      key={index}
                      to={service.path}
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-600"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={index}
              to={link.path}
              className={`flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300 ${link.name === 'Career' ? 'text-orange-500' : ''}`}
            >
              {link.name}
            </Link>
          )
        ))}
      </nav>
    
      <div className="md:hidden">
        <button
          className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-20 flex flex-col items-end p-4 space-y-4 animate-slideInRight pt-16">
          <button
            className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          {links.map((link, index) => (
            link.name === 'Services' ? (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-lg"
                >
                  {link.name}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10">
                    {serviceLinks.map((service, index) => (
                      <Link
                        key={index}
                        to={service.path}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition-colors duration-300"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsMenuOpen(false);
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                to={link.path}
                className={`text-gray-600 hover:text-orange-500 transition-colors duration-300 text-lg ${link.name === 'Career' ? 'text-orange-500' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
