import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const [animated, setAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAnimated(true);
  }, []);

  const handleGetStartedClick = () => {
    navigate('/contact-us'); // Change '/contact-us' to your contact page route
  };

  return (
    <>
      <footer className="bg-white p-8 border-t-4 border-blue-600">
        <div className="container mx-auto text-center">
          <p className={`text-gray-700 mb-6 max-w-2xl mx-auto ${
            animated ? 'animate-fadeIn' : 'opacity-0'
          }`}>
            Ready to transform your business with a custom software solution? 
            Contact us today to discuss your project requirements and learn 
            how we can help you achieve your goals.
          </p>
          <div className={`${animated ? 'animate-slideUp' : 'opacity-0 translate-y-4'}`}>
            <button 
              onClick={handleGetStartedClick}
              className="bg-orange-500 text-white px-6 py-3 rounded-full 
                shadow-lg transition duration-300 ease-in-out transform hover:scale-105 
                hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
              Get Started
            </button>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }

        .bg-white {
          background-color: #ffffff;
        }

        .bg-orange-500 {
          background-color: #ed8936;
        }

        .text-white {
          color: #ffffff;
        }

        .border-t-4 {
          border-top-width: 4px;
        }

        .border-blue-600 {
          border-color: #3182ce;
        }

        .hover\\:bg-orange-600:hover {
          background-color: #dd6b20;
        }

        .focus\\:ring-2:focus {
          ring-width: 2px;
        }

        .focus\\:ring-orange-500:focus {
          ring-color: #ed8936;
        }

        .focus\\:ring-opacity-50:focus {
          ring-opacity: 0.5;
        }

        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .transition {
          transition: all 0.2s;
        }

        .duration-300 {
          transition-duration: 300ms;
        }

        .ease-in-out {
          transition-timing-function: ease-in-out;
        }

        .transform {
          transform: translateZ(0);
        }

        .hover\\:scale-105:hover {
          transform: scale(1.05);
        }

        .rounded-full {
          border-radius: 9999px;
        }

        .focus\\:outline-none:focus {
          outline: 0;
        }

        .text-gray-700 {
          color: #4a5568;
        }
      `}</style>
    </>
  );
};

export default Footer;
