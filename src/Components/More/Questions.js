import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiPlus, FiMinus, FiSearch } from 'react-icons/fi';

const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px -5% 0px" });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-102 transition-transform duration-300 border-l-4 border-orange-500"
    >
      <button
        className="w-full p-6 text-left focus:outline-none flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-orange-100 p-2 rounded-full"
        >
          {isOpen ? <FiMinus className="text-orange-600 text-xl" /> : <FiPlus className="text-orange-600 text-xl" />}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-gray-700 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState([]);

  // ... (keep your existing faqData array)
  const faqData = [
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of IT services, including web development, software development, mobile app development, cybersecurity, cloud computing, and more."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We have experience working with various industries, such as finance, healthcare, education, retail, and more."
    },
    {
      question: "How long does it take to complete a project?",
      answer: "The duration of a project depends on its complexity, but we always strive to deliver it on time and within budget."
    },
    {
      question: "What is your approach to project management?",
      answer: "We use a collaborative and transparent approach to project management, incorporating agile methodologies. Our team works closely with clients to define project goals, deliverables, and timelines, ensuring regular updates and feedback throughout the project lifecycle."
    },
    {
      question: "Do you provide support and maintenance after the project is completed?",
      answer: "Yes, we offer post-project support and maintenance services. This includes troubleshooting, updates, and ongoing support to ensure that your system remains functional and up-to-date."
    },
    {
      question: "Can you help with website redesigns?",
      answer: "Absolutely. We specialize in both creating new websites and redesigning existing ones to improve functionality, aesthetics, and user experience."
    },
    {
      question: "What technologies and tools do you use for development?",
      answer: "We use a variety of technologies and tools tailored to the specific needs of each project. This includes modern programming languages, frameworks, and tools such as React, Node.js, Python, and more. We ensure to stay updated with the latest industry trends and technologies."
    },
    {
      question: "How do you ensure the security of the software you develop?",
      answer: "We implement robust security measures throughout the development process, including regular security audits, code reviews, and compliance with industry standards. Our team follows best practices to protect your data and ensure the security of your applications."
    },
    {
      question: "Can you integrate third-party services or APIs into our application?",
      answer: "Yes, we can integrate various third-party services and APIs into your application to extend its functionality and improve user experience. Whether it's payment gateways, social media, or other services, we handle all integration requirements."
    },
    {
      question: "What is your pricing model?",
      answer: "Our pricing model varies based on the scope and complexity of the project. We offer customized quotes based on your specific needs and requirements. Please contact us for a detailed proposal and pricing information."
    },
    {
      question: "Do you offer training for the systems you develop?",
      answer: "Yes, we provide training sessions for your team to ensure they are comfortable and proficient in using the systems we develop. This training can be customized based on your specific needs and the complexity of the system."
    },
    {
      question: "How do you handle project changes or revisions?",
      answer: "We accommodate changes and revisions based on your feedback throughout the development process. Any significant changes will be discussed and agreed upon to ensure they fit within the project scope and timeline."
    },
    {
      question: "What is your process for ensuring quality in your deliverables?",
      answer: "We follow a rigorous quality assurance process, including comprehensive testing (unit testing, integration testing, and user acceptance testing) to ensure that all deliverables meet high-quality standards and perform as expected."
    },
  ];

  useEffect(() => {
    setFilteredFAQs(
      faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-center mb-12 text-gray-700 text-lg"
        >
          Can't find an answer? Email us at{' '}
          <a href="mailto:info@markatlasinkjettechnologies.com" className="text-blue-600 hover:text-orange-500 font-semibold transition-colors duration-300">
            info@markatlasinkjettechnologies.com
          </a>
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mb-12 relative"
        >
          <input
            type="text"
            placeholder="Search FAQs..."
            className="w-full p-5 pl-12 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg transition-shadow duration-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-orange-400 text-xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
        >
          {filteredFAQs.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;