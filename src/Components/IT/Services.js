import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Cpu, Shield, Code, Database, Clock, Cog } from 'lucide-react';

const services = [
  {
    title: "Strategic IT Planning",
    icon: Cloud,
    description: "Effective IT planning is crucial for aligning technology with your business objectives.",
    details: [
      "Technology Assessment: Evaluating your current IT environment to identify strengths, weaknesses, and opportunities.",
      "IT Roadmap Development: Creating a strategic plan that outlines technology investments, timelines, and milestones.",
      "Business Alignment: Ensuring that IT initiatives are aligned with your business goals and objectives."
    ]
  },
  {
    title: "Infrastructure Design",
    icon: Cpu,
    description: "A well-designed IT infrastructure forms the backbone of your business operations.",
    details: [
      "Infrastructure Assessment: Analyzing your existing infrastructure to identify areas for improvement.",
      "System Design: Developing a robust and scalable infrastructure architecture tailored to your needs.",
      "Performance Optimization: Implementing best practices and technologies to optimize system performance and efficiency."
    ]
  },
  {
    title: "Project Management",
    icon: Clock,
    description: "Successful IT projects require meticulous planning and execution.",
    details: [
      "Project Planning: Defining project scope, objectives, and deliverables.",
      "Resource Management: Allocating and managing resources effectively to meet project goals.",
      "Risk Management: Identifying potential risks and developing mitigation strategies to address them.",
      "Progress Monitoring: Tracking project progress and making adjustments as needed to stay on track."
    ]
  },
  {
    title: "Technology Selection",
    icon: Code,
    description: "Choosing the right technology solutions is critical for achieving your business objectives.",
    details: [
      "Vendor Evaluation: Assessing and recommending technology vendors and solutions based on your requirements.",
      "Implementation Planning: Developing a detailed implementation plan that outlines key activities and timelines.",
      "System Integration: Ensuring seamless integration of new technologies with your existing systems."
    ]
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    description: "Protecting your business from cyber threats and minimizing risks is a top priority.",
    details: [
      "Security Assessment: Evaluating your current security posture and identifying vulnerabilities.",
      "Risk Management: Developing strategies to manage and mitigate security risks.",
      "Compliance Support: Assisting with compliance requirements and standards such as GDPR, HIPAA, and more."
    ]
  },
  {
    title: "Cloud Solutions",
    icon: Database,
    description: "Embracing cloud technologies can offer significant benefits, including flexibility, scalability, and cost savings.",
    details: [
      "Cloud Strategy: Developing a cloud strategy that aligns with your business goals.",
      "Migration Planning: Creating a detailed migration plan to ensure a smooth transition to the cloud.",
      "Cloud Management: Providing ongoing support and management of your cloud environment."
    ]
  },
  {
    title: "IT Support",
    icon: Cog,
    description: "Ongoing support and maintenance are essential for keeping your IT systems running smoothly.",
    details: [
      "Help Desk Support: Providing technical support and troubleshooting for your IT systems.",
      "System Monitoring: Continuously monitoring your IT environment to detect and resolve issues proactively.",
      "Maintenance Services: Performing regular maintenance tasks to keep your systems up to date and functioning efficiently."
    ]
  }
];

const CloudServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const CurrentIcon = services[currentIndex].icon;

  return (
    <div className="bg-white p-8">
      <motion.h1 
        className="text-4xl md:text-6xl font-bold text-center text-blue-600 mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Our Services
      </motion.h1>
      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            className="max-w-4xl w-full"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-orange-100 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-blue-800">{services[currentIndex].title}</h2>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  {CurrentIcon && <CurrentIcon size={32} className="text-orange-500" />}
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">{services[currentIndex].description}</p>
                {services[currentIndex].details.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="mb-4 flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    <p className="text-gray-700">{item}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-8 space-x-2">
        {services.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-600' : 'bg-blue-200'}`}
            onClick={() => setCurrentIndex(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
};

export default CloudServicesCarousel;
