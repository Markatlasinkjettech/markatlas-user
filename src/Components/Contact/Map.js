import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { app, db } from '../../firebase'; // Ensure you have your firebase configurations here
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        timestamp: new Date(),
      });
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="container mx-auto py-16 px-4 md:px-8">
<div className="bg-gradient-to-br  py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h5 variants={itemVariants} className="text-blue-600 text-lg font-bold uppercase tracking-wider mb-2">Contact Us</motion.h5>
          <motion.h1 variants={itemVariants} className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-800 mb-4">
            If You Have Any Query, Feel Free To Contact Us
          </motion.h1>
          <motion.div 
            variants={itemVariants}
            className="w-24 h-1 bg-orange-400 mx-auto"
          ></motion.div>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { icon: FaPhoneAlt, title: 'Call to ask any question', content: '+012 345 6789' },
            { icon: FaEnvelopeOpen, title: 'Email to get free quote', content: 'INFO@MARKATLASINKJETTECHNOLOGIES.COM' },
            { icon: FaMapMarkerAlt, title: 'Visit our office', content: 'UPPAL, HYDERABAD, TELANGANA' },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition duration-300 hover:shadow-2xl transform hover:-translate-y-2"
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-r from-blue-300 to-orange-300 h-2"></div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-400 text-white flex items-center justify-center rounded-full w-16 h-16 flex-shrink-0 transition duration-300 hover:from-blue-500 hover:to-blue-400 mb-4 sm:mb-0 sm:mr-6">
                    <item.icon className="text-2xl" />
                  </div>
                  <div className="flex-grow">
                    <h5 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h5>
                    <p className={`text-sm text-gray-600 break-all sm:break-normal ${
                      item.icon === FaEnvelopeOpen ? 'lowercase' : ''
                    }`}>
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>

    <div className="container mx-auto py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-wrap -mx-4">
        <motion.div
          className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form className="bg-white shadow-2xl rounded-lg p-8" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Send Us a Message</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition duration-300"
                  placeholder="Your Name"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition duration-300"
                  placeholder="Your Email"
                  required
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <motion.input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition duration-300"
                placeholder="Subject"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-blue-400 focus:bg-white transition duration-300"
                rows="4"
                placeholder="Message"
                required
                whileFocus={{ scale: 1.02 }}
              ></motion.textarea>
              <motion.button
                className={`btn bg-gradient-to-r from-orange-500 to-orange-400 text-white px-8 py-3 rounded-md w-full transition duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-500 hover:to-blue-400'
                }`}
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-600 text-center font-semibold bg-green-100 p-3 rounded-md"
                >
                  Message sent successfully!
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-center font-semibold bg-red-100 p-3 rounded-md"
                >
                  Error sending message. Please try again.
                </motion.p>
              )}
            </div>
          </form>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 px-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white shadow-2xl rounded-lg p-4 h-full">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Location</h2>
            <div className="relative w-full h-[400px] rounded-md overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md"
                src="https://www.google.co.in/maps/embed?pb=!1m18!1m12!1m3!1d3916.328517342021!2d78.5528739!3d17.3998302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99002df124d5%3A0x4c8e40380c7e02ae!2sMarkatlas%20Inkjet%20Technologies%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1646398828586!5m2!1sen!2sin"
                frameBorder="0"
                style={{ border: '0' }}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  /</div>
  );
};

export default ContactUs;