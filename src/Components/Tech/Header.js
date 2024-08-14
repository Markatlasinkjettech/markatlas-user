import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import image from '../Images/company_logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Career', path: '/career' },
    { name: 'Services', path: '/services' },
    { name: 'Technologies', path: '/technologies' },
    { name: 'More', path: '/more' },
  ];

  const serviceLinks = [
    { name: 'Custom Software Development', path: '/service1' },
    { name: 'Cloud Computing Solutions', path: '/service2' },
    { name: 'IT Consulting Services', path: '/service3' }
  ];

  // Toggle dropdown based on index
  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={() => setActiveDropdown(null)}
              ref={dropdownRef}
            >
              <button
                className="flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300"
              >
                {link.name} 
                <ChevronDown className={`ml-1 w-4 h-4 transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === index && (
                <div className="absolute left-0 mt-1/4 w-64 bg-white shadow-lg rounded-md z-10 py-4 max-h-96 overflow-y-auto">
                  {serviceLinks.map((service, serviceIndex) => (
                    <Link
                      key={serviceIndex}
                      to={service.path}
                      className="block px-4 py-3 text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-300"
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
              className={`flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300 ${link.name === 'Technologies' ? 'text-orange-500' : ''}`}
            >
              {link.name}
            </Link>
          )
        ))}
      </nav>
      <Link
        to="/contact-us"
        className="hidden md:flex items-center text-gray-600 hover:text-orange-500 transition-colors duration-300"
      >
        Contact Us
      </Link>
    
      <div className="md:hidden">
        <button
          className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-20 flex flex-col items-end p-4 space-y-4 animate-slideInRight pt-16 overflow-y-auto">
          <button
            className="absolute top-4 right-4 p-2 text-gray-600 hover:text-orange-500 transition-colors duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={24} />
          </button>
          {[...links, { name: 'Contact Us', path: '/contact-us' }].map((link, index) => (
            <div key={index} className="w-full text-right">
              {link.name === 'Services' ? (
                <div className="w-full">
                  <button
                    className="flex justify-end items-center w-full text-right text-gray-600 hover:text-orange-500 transition-colors duration-300 text-lg"
                    onClick={() => toggleDropdown(index)}
                  >
                    <ChevronDown className={`mr-1 w-4 h-4 transform transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`} />
                    {link.name}
                  </button>
                  <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${activeDropdown === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    {serviceLinks.map((service, serviceIndex) => (
                      <Link
                        key={serviceIndex}
                        to={service.path}
                        className="block py-2 pr-4 text-gray-600 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-300 text-right"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setActiveDropdown(null);
                        }}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`block text-gray-600 hover:text-orange-500 transition-colors duration-300 text-lg ${link.name === 'Technologies' ? 'text-orange-500' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
