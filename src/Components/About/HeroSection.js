import React from 'react';
import { motion } from 'framer-motion';

const InsightsHeader = () => {
  return (
    <div className="relative w-full h-[40vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        
      </div>

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-white-200 opacity-70"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-orange-500 text-white p-6 max-w-xl"
        >
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <div className="w-12 h-1 bg-white mb-4"></div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-0 left-0 h-1 bg-blue-300"
      ></motion.div>
    </div>
  );
};

export default InsightsHeader;