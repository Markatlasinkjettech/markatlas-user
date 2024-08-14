// import React from 'react';
// import { Twitter, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="bg-gray-800 text-white p-4 md:p-8 lg:p-12">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//         {/* About Section */}
//         <div>
//           <h2 className="text-xl font-bold mb-4 text-blue-300">MARKATLAS INKJET</h2>
//           <p className="text-sm md:text-base text-gray-300 mb-4">
//             AT MARKATLAS INKJET, OUR MISSION IS TO HELP BUSINESSES GROW BY PROVIDING INNOVATIVE IT SOLUTIONS. WE STRIVE TO DELIVER THE HIGHEST QUALITY PRODUCTS AND SERVICES THAT EXCEED OUR CLIENTS' EXPECTATIONS.
//           </p>
//           <div className="flex space-x-4 mt-4">
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
//               <Twitter size={24} />
//             </a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
//               <Instagram size={24} />
//             </a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
//               <Facebook size={24} />
//             </a>
//             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-blue-500">
//               <Linkedin size={24} />
//             </a>
//           </div>
//         </div>

//         {/* Services Section */}
//         <div className="flex flex-col md:flex-row md:justify-center md:space-x-8 lg:space-x-12">
//           <div className="mb-4 md:mb-0">
//             <h3 className="text-lg font-semibold mb-4 text-blue-300">OUR SERVICES</h3>
//             <div className="space-y-2">
//               <Link to="/service1" className="inline-block hover:underline text-gray-300 hover:text-blue-300">CUSTOM SOFTWARE DEVELOPMENT</Link>
//               <Link to="/service2" className="inline-block hover:underline text-gray-300 hover:text-blue-300">CLOUD COMPUTING SOLUTIONS</Link>
//               <Link to="/service3" className="inline-block hover:underline text-gray-300 hover:text-blue-300">IT CONSULTING SERVICES</Link>
//             </div>
//           </div>
//         </div>
//           {/* Quick Links Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-blue-300">QUICK LINKS</h3>
//           <div className="flex flex-col space-y-2">
//             <Link to="/" className="hover:underline text-gray-300 hover:text-blue-300">Home</Link>
//             <Link to="/about" className="hover:underline text-gray-300 hover:text-blue-300">About Us</Link>
//             <Link to="/technologies" className="hover:underline text-gray-300 hover:text-blue-300">Technology</Link>
//             <Link to="/career" className="hover:underline text-gray-300 hover:text-blue-300">Careers</Link>
//           </div>
//         </div>
//         {/* Contact Info Section */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4 text-blue-300">CONTACT INFO</h3>
//           <div className="flex flex-col space-y-3">
//             <div className="flex items-center text-gray-300">
//               <MapPin size={20} className="mr-2 text-blue-300" />
//               <p className="text-sm md:text-base">UPPAL, HYDERABAD, TELANGANA</p>
//             </div>
//             <div className="flex items-center text-gray-300">
//               <Phone size={20} className="mr-2 text-blue-300" />
//               <p className="text-sm md:text-base">+1234567890</p>
//             </div>
//             <div className="flex items-center text-gray-300">
//               <Mail size={20} className="mr-2 text-blue-300" />
//               <p className="text-sm md:text-base lowercase">info@markatlasinkjettechnologies.com</p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links Section */}
        
//       </div>

//       <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
//         <p className="text-sm mb-2">COPYRIGHT © 2021 MARKATLAS INKJET - ALL RIGHTS RESERVED.</p>
//         <Link to="/" className="text-sm hover:underline hover:text-blue-300">TERMS & CONDITIONS</Link>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import { Twitter, Instagram, Facebook, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const socialIcons = [
    { Icon: Twitter, url: "https://twitter.com" },
    { Icon: Instagram, url: "https://instagram.com" },
    { Icon: Facebook, url: "https://facebook.com" },
    { Icon: Linkedin, url: "https://linkedin.com" }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-blue-500 pb-2">MARKATLAS INKJET</h2>
            <p className="text-sm leading-relaxed text-justify">
              At MarkAtlas Inkjet, our mission is to help businesses grow by providing innovative IT solutions. We strive to deliver the highest quality products and services that exceed our clients' expectations.
            </p>
            <div className="flex justify-center space-x-4 mt-4 ">
              {socialIcons.map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-blue-500 transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Centered Services Section */}
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2">OUR SERVICES</h3>
            <ul className="space-y-2">
              {['Custom Software Development', 'IT Consulting Services', 'Cloud Computing Solutions'].map((service, index) => (
                <li key={index} className="transition-transform duration-300 hover:translate-x-1">
                  <Link to={`/service${index + 1}`} className="hover:text-blue-400 text-sm">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 pb-2">CONTACT INFO</h3>
            <div className="flex flex-col p-3 items-left space-y-4">
              {[
                { Icon: MapPin, text: 'Uppal, Hyderabad, Telangana' },
                { Icon: Phone, text: '+1234567890' },
                { Icon: Mail, text: 'info@markatlasinkjettechnologies.com', className: 'lowercase' }
              ].map(({ Icon, text, className }, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="bg-blue-500 p-1.5 rounded-full hover:bg-white transition-colors duration-300">
                    <Icon size={14} className="text-white hover:text-blue-500" />
                  </div>
                  <p className={`text-sm ${className}`}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-center md:text-left">
            Copyright © {new Date().getFullYear()} MarkAtlas Inkjet - All Rights Reserved.
          </p>
          <Link to="/" className="text-xs hover:text-blue-400 transition-colors duration-300">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
