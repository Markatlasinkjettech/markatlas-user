import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './Header.js';
import Footer from './Footer.js';
import Partner from './Partners.js'; // Import Partner component

const Comments = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    website: '',
    comment: ''
  });

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    const q = query(
      collection(db, 'comments'),
      where('blogId', '==', blogId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    setComments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleInputChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'comments'), {
        ...newComment,
        blogId,
        createdAt: new Date()
      });
      setNewComment({ name: '', email: '', website: '', comment: '' });
      fetchComments();
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  return (
    <>
      <Header /> {/* Add Header at the top */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-orange-500 text-white p-6 mb-8 rounded-lg shadow-lg"
          >
            <h2 className="text-4xl font-bold mb-2">Comments</h2>
            <div className="w-12 h-1 bg-white mb-4"></div>
          </motion.div>

          <AnimatePresence>
            {comments.map(comment => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-8 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img src={`https://avatars.dicebear.com/api/initials/${comment.name}.svg`} alt="Avatar" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <p className="font-bold text-lg text-gray-800">{comment.name}</p>
                    <p className="text-sm text-gray-500">{new Date(comment.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="mt-12 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Leave A Comment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={newComment.name}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={newComment.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                required
              />
            </div>
            <input
              type="url"
              name="website"
              placeholder="Website (optional)"
              value={newComment.website}
              onChange={handleInputChange}
              className="w-full p-3 mt-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            />
            <textarea
              name="comment"
              placeholder="Your Comment"
              value={newComment.comment}
              onChange={handleInputChange}
              className="w-full p-3 mt-6 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-4 rounded-md hover:bg-indigo-700 mt-6 font-semibold transition-transform duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
      {/* Add Footer at the bottom */}
    </>
  );
};

export default Comments;
