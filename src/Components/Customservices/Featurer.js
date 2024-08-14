import React from 'react';
import { Puzzle, ArrowUpRight, Link, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-orange-500"
  >
    <div className="flex items-center mb-4">
      <div className="bg-blue-500 p-2 rounded-full mr-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold text-blue-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Puzzle,
      title: 'Tailored Fit',
      description: 'Custom software designed to address your specific requirements, ensuring a perfect fit for your business processes and goals.'
    },
    {
      icon: ArrowUpRight,
      title: 'Scalability',
      description: 'As your business grows, custom software can be easily scaled and adapted to meet evolving demands.'
    },
    {
      icon: Link,
      title: 'Integration',
      description: 'Custom solutions seamlessly integrate with your existing systems, improving overall efficiency and reducing redundancy.'
    },
    {
      icon: Award,
      title: 'Competitive Edge',
      description: 'Unique software provides a competitive advantage by offering features not available in standard solutions.'
    }
  ];

  return (
    <section className="bg-gradient-to-b  py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-12 text-center text-blue-800"
        >
          Why Choose Custom Software?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;