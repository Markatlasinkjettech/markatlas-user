import React from 'react';
import { Clock, CheckSquare, Users, Star } from 'lucide-react';
import Imges from './image.png';

const StatItem = ({ icon: Icon, value, label }) => (
  <div className="w-full p-4 transform hover:scale-105 transition-transform duration-300">
    <div className="bg-orange-500 text-white p-3 inline-block rounded-lg mb-4 animate-bounce">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-orange-500">{value}</h3>
    <p className="text-gray-700">{label}</p>
  </div>
);

const WhyChooseUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h2 className="text-center text-orange-500 font-semibold mb-2 animate-pulse">WHY CHOOSE US</h2>
      <h1 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-8 animate-fadeIn">
        We Are Here to Grow Your<br />Business Exponentially
      </h1>
      <div className="flex flex-wrap justify-center items-center">
        {/* Content to the left of the image */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-wrap">
            <StatItem 
              icon={Clock} 
              value="20+" 
              label="Years of Experience" 
            />
            <StatItem 
              icon={CheckSquare} 
              value="500" 
              label="Complete Projects" 
            />
          </div>
        </div>
        {/* Image in the middle */}
        <div className="w-full md:w-1/2 lg:w-auto p-4 flex justify-center">
          <img src={Imges} alt="Team meeting" className="w-full max-w-xs h-auto rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300" />
        </div>
        {/* Content to the right of the image */}
        <div className="w-full md:w-1/2 lg:w-1/3 p-4">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-wrap">
            <StatItem 
              icon={Users} 
              value="100+" 
              label="Employees" 
            />
            <StatItem 
              icon={Star} 
              value="300+" 
              label="5 Star Rating" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  /* Responsive styles */
  .max-w-6xl {
    max-width: 90%; /* Increase max width on small screens */
  }

  .text-center {
    text-align: center;
  }

  .text-orange-500 {
    color: #f97316;
  }

  .text-gray-800 {
    color: #1f2937;
  }

  .text-gray-700 {
    color: #374151;
  }

  .bg-white {
    background-color: #ffffff;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .p-4 {
    padding: 1rem;
  }

  .mb-2 {
    margin-bottom: 0.5rem;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .font-semibold {
    font-weight: 600;
  }

  .w-full {
    width: 100%;
  }

  .md\\:w-1\\/2 {
    width: 50%;
  }

  .lg\\:w-1\\/3 {
    width: 33.333333%;
  }

  .lg\\:w-auto {
    width: auto;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }

  .hover\\:shadow-2xl:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  }

  .transition-shadow {
    transition: box-shadow 0.3s ease-in-out;
  }

  .transition-transform {
    transition: transform 0.3s ease-in-out;
  }

  .transform:hover {
    transform: scale(1.05);
  }

  .max-w-xs {
    max-width: 20rem;
  }

  .bg-gray-100 {
    background-color: #f3f4f6;
  }

  /* Flex layout adjustments for mobile */
  .flex-wrap {
    flex-wrap: wrap;
  }
`}</style>
