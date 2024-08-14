import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Cpu, Shield, Code, Database, Clock, Cog } from 'lucide-react';

// ... (services array remains unchanged)
const services = [
  {
    title: 'Cloud Strategy and Consulting',
    icon: Cloud,
    description: [
      'Cloud Readiness Assessment: Evaluate your current IT infrastructure to determine readiness for cloud migration.',
      'Cloud Strategy Development: Create a customized cloud strategy that aligns with your business goals.',
      'Cost-Benefit Analysis: Analyze the financial implications of moving to the cloud to ensure cost-effectiveness.'
    ]
  },
  {
    title: 'Cloud Migration Services',
    icon: Cpu,
    description: [
      'Data Migration: Securely transfer your data to the cloud with minimal downtime.',
      'Application Migration: Migrate your applications to the cloud to improve performance and scalability.',
      'Infrastructure Migration: Move your entire IT infrastructure to the cloud to leverage its full potential.'
    ]
  },
  {
    title: 'Cloud Infrastructure Management',
    icon: Cog,
    description: [
      'Cloud Architecture Design: Design a robust and scalable cloud architecture tailored to your needs.',
      'Cloud Deployment: Deploy cloud infrastructure and services quickly and efficiently.',
      'Resource Optimization: Continuously monitor and optimize cloud resources to ensure cost efficiency and performance.'
    ]
  },
  {
    title: 'Cloud Security and Compliance',
    icon: Shield,
    description: [
      'Security Assessment: Conduct thorough security assessments to identify and mitigate risks.',
      'Compliance Management: Ensure your cloud infrastructure meets industry-specific regulatory requirements.',
      'Identity and Access Management (IAM): Implement robust IAM solutions to secure your cloud environment.'
    ]
  },
  {
    title: 'Cloud-Native Application Development',
    icon: Code,
    description: [
      'Microservices Architecture: Develop cloud-native applications using microservices for better scalability and maintenance.',
      'Containerization: Utilize containers to ensure consistent application deployment across different environments.',
      'Serverless Computing: Leverage serverless computing to build and run applications without managing servers.'
    ]
  },
  {
    title: 'Cloud Backup and Disaster Recovery',
    icon: Database,
    description: [
      'Automated Backup Solutions: Implement automated backup solutions to protect your data.',
      'Disaster Recovery Planning: Develop and execute disaster recovery plans to ensure business continuity.',
      'Data Replication: Replicate data across multiple locations for increased resilience.'
    ]
  },
  {
    title: 'Managed Cloud Services',
    icon: Clock,
    description: [
      '24/7 Monitoring and Support: Provide round-the-clock monitoring and support for your cloud infrastructure.',
      'Performance Management: Ensure optimal performance of your cloud services through continuous monitoring and tuning.',
      'Proactive Maintenance: Conduct regular maintenance to prevent issues and ensure smooth operations.'
    ]
  }
];
const CloudServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getServiceSet = () => {
    if (isMobile) return [services[currentIndex]];
    const set = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % services.length;
      set.push(services[index]);
    }
    return set;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    },
    exit: { 
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
    exit: { 
      y: -50, 
      opacity: 0,
      transition: { type: 'tween', ease: 'easeInOut' }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <motion.h1 
        className="text-3xl md:text-6xl font-bold text-center text-orange-400 mb-8 md:mb-12"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
      >
        Our Cloud Computing Services
      </motion.h1>
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {getServiceSet().map((service, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200"
                variants={itemVariants}
              >
                <div className="bg-gradient-to-r from-blue-400 to-blue-300 p-6 flex items-center justify-between">
                  <h2 className="text-xl md:text-2xl font-semibold text-black">{service.title}</h2>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <service.icon size={32} className="text-white" />
                  </motion.div>
                </div>
                <div className="p-6">
                  {service.description.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="mb-4 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: idx * 0.1 }}
                      />
                      <p className="text-gray-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: services.length }).map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-blue-550'}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </div>
  );
  
};

export default CloudServicesCarousel;