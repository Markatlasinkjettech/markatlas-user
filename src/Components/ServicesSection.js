// ServicesComponent.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import image from './image.png'; // Ensure this path is correct

const services = [
  {
    title: 'Custom Software Development',
    description: 'We specialize in building custom software solutions for our clients. Whether you need a web, mobile, or desktop application, we deliver high-quality products that meet your unique needs.',
    path: '/service1'
  },
  {
    title: 'Cloud Computing Solutions',
    description: 'Leverage the power of the cloud for your business. We offer a variety of cloud computing solutions to improve efficiency, reduce costs, and increase scalability.',
    path: '/service2'
  },
  {
    title: 'IT Consulting Services',
    description: 'Navigate the complex landscape of modern technology with our experienced IT consultants. From infrastructure planning to project management, we help your business succeed.',
    path: '/service3'
  }
];

const ServicesComponent = () => (
  <div className="bg-white min-h-screen p-4 lg:p-8">
    <motion.h1 
      className="text-4xl lg:text-5xl font-bold text-center text-orange-500 mb-8 lg:mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Our Services
    </motion.h1>
    <div className="flex flex-col lg:flex-row justify-center items-stretch max-w-7xl mx-auto">
      <motion.div 
        className="lg:w-1/2 p-2 lg:p-4 mb-4 lg:mb-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-full">
          <img
            src={image}
            alt="Tech visualization"
            className="rounded-lg shadow-2xl w-full h-full object-cover"
          />
        </div>
      </motion.div>
      <div className="lg:w-1/2 p-2 lg:p-4">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-lg p-4 lg:p-6 mb-4 lg:mb-6 transition-all duration-300 hover:shadow-xl border border-blue-200"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-xl lg:text-2xl font-semibold text-blue-600 mb-2 lg:mb-3">{service.title}</h2>
            <p className="text-gray-700 mb-3 lg:mb-4">{service.description}</p>
            <motion.div 
              className="flex items-center text-orange-500 font-semibold"
              whileHover={{ x: 5 }}
            >
              <Link to={service.path}>Learn More <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default ServicesComponent;
