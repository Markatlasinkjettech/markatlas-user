import React from 'react';
import { motion } from 'framer-motion';

const CloudBenefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <motion.h2
        className="text-4xl font-bold text-center text-orange-500 mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Benefits of Our Cloud Computing Solutions
      </motion.h2>
      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          "Improved Efficiency: Streamline your operations with on-demand access to computing resources.",
          "Cost Savings: Reduce IT costs by paying only for the resources you use.",
          "Scalability: Easily scale your resources up or down based on your business needs.",
          "Enhanced Security: Protect your data with advanced security measures and compliance solutions.",
          "Business Agility: Quickly adapt to changing market conditions with flexible cloud services.",
          "Innovation: Foster innovation with access to cutting-edge cloud technologies and tools."
        ].map((benefit, index) => (
          <motion.li
            key={index}
            className="bg-white border-2 border-transparent p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-50 hover:border-blue-500"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="flex items-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: "spring" }}
            >
              <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 hover:bg-blue-600">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-700">{benefit.split(':')[0]}</h3>
            </motion.div>
            <p className="text-gray-700">{benefit.split(':')[1]}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default CloudBenefits;
