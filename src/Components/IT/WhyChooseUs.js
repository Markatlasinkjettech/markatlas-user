import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const listItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.h2 
          className="text-center text-4xl font-extrabold text-blue-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div 
          className="bg-white shadow-lg rounded-xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ul className="space-y-6">
            {[
             "Customized Solutions: Tailoring our services to meet your unique business needs.",
             "Proven Expertise: Leveraging our extensive knowledge and industry best practices.",
             "Customer-Centric Approach: Focusing on your success and building long-term partnerships.",
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start space-x-4"
                variants={listItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 text-lg">{item}</p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
