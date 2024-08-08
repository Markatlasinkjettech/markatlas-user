import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelopeOpen, FaMapMarkerAlt } from 'react-icons/fa';
import { app, db } from '../../firebase'; // Ensure you have your firebase configurations here
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

  return (
    <div className="container mx-auto py-16 px-4 ">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h5 className="text-primary text-lg font-bold uppercase tracking-wider mb-2">Contact Us</h5>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">If You Have Any Query, Feel Free To Contact Us</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: FaPhoneAlt, title: 'Call to ask any question', content: '+012 345 6789' },
          { icon: FaEnvelopeOpen, title: 'Email to get free quote', content: 'INFO@MARKATLASINKJETTECHNOLOGIES.COM' },
          { icon: FaMapMarkerAlt, title: 'Visit our office', content: 'UPPAL, HYDERABAD, TELANGANA' },
        ].map((item, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:shadow-xl transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="bg-primary text-white flex items-center justify-center rounded-full w-16 h-16 flex-shrink-0 transition duration-300 hover:bg-primary-dark">
                <item.icon className="text-2xl" />
              </div>
              <div className="ml-6">
                <h5 className="text-lg font-semibold mb-1 text-gray-800">{item.title}</h5>
                <h4 className={`text-xs mb-1 ${item.icon === FaEnvelopeOpen ? 'text-sm' : ''} text-gray-600`}>{item.content}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <form className="bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-200"
                  placeholder="Your Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-200"
                  placeholder="Your Email"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-input w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-200"
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-textarea w-full bg-gray-100 px-4 py-3 rounded-md focus:ring-2 focus:ring-primary transition duration-300 hover:bg-gray-200"
                rows="4"
                placeholder="Message"
                required
              ></textarea>
              <button
                className={`btn bg-primary text-black px-8 py-3 rounded-md w-full transition duration-300 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-dark transform hover:-translate-y-1'
                }`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center font-semibold">Message sent successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center font-semibold">Error sending message. Please try again.</p>
              )}
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-white shadow-lg rounded-lg p-2 h-full">
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.google.co.in/maps/embed?pb=!1m18!1m12!1m3!1d3916.328517342021!2d78.5528739!3d17.3998302!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99002df124d5%3A0x4c8e40380c7e02ae!2sMarkatlas%20Inkjet%20Technologies%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1646398828586!5m2!1sen!2sin"
              frameBorder="0"
              style={{ border: '0', minHeight: '400px' }}
              allowFullScreen
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
