import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'blogs'));
        const blogData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBlogs(blogData);
      } catch (error) {
        console.error('Error fetching blogs: ', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="relative bg-white py-8">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Blog Posts</h1>

      <div className="relative overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-6 px-6 py-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          <AnimatePresence>
            {blogs.map(blog => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-none w-full sm:w-72 md:w-80 lg:w-96 xl:w-1/4 bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
              >
                <img 
                  src={blog.image || 'https://via.placeholder.com/500x200'} 
                  alt={blog.title}
                  className="w-full h-32 sm:h-40 md:h-48 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 mb-2">{blog.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-2">{blog.description}</p>
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="inline-block bg-indigo-500 text-white font-medium py-2 px-4 rounded-full hover:bg-indigo-600 transition duration-300 ease-in-out"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
