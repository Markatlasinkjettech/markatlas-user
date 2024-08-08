import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Cpu, Shield, Code, Database, Clock, Cog } from 'lucide-react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 3) % services.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getServiceSet = () => {
    const set = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % services.length;
      set.push(services[index]);
    }
    return set;
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center text-blue-600 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Our Cloud Computing Services
      </motion.h1>
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {getServiceSet().map((service, index) => (
              <motion.div
                key={index}
                className="bg-orange-100 rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-blue-800">{service.title}</h2>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <service.icon size={32} className="text-orange-500" />
                  </motion.div>
                </div>
                <div className="p-6">
                  {service.description.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="mb-4 flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (index * 0.1) + (idx * 0.1) }}
                    >
                      <div className="w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" />
                      <p className="text-black-700">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: Math.ceil(services.length / 3) }).map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${index === Math.floor(currentIndex / 3) ? 'bg-blue-600' : 'bg-blue-200'}`}
            onClick={() => setCurrentIndex(index * 3)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default CloudServicesCarousel;