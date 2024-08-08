import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import Comments from './Comments.js';
import { motion } from 'framer-motion';
import Header from './Header.js';
import Partner from './Partners.js';
import Footer from './Footer.js';

const BlogPost = () => {
  const [blog, setBlog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, 'blogs', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching blog post: ', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-gray-700"
      >
        Loading...
      </motion.div>
    </div>
  );

  const contentSections = blog.content.split('<h2>').filter(Boolean).map(section => `<h2>${section}`);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : contentSections.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < contentSections.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Hero section */}
          <div className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-8 max-w-4xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight"
                >
                  {blog.title}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90"
                >
                  {new Date(blog.createdAt.toDate()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Blog content with slider */}
          <div className="relative bg-white py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="prose prose-lg max-w-none mb-16"
              >
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  {blog.description || "A captivating journey through the author's thoughts and experiences."}
                </p>
                <div className="relative">
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: `-${currentIndex * 100}%` }}
                      transition={{ duration: 0.5 }}
                      className="flex transition-transform duration-300"
                    >
                      {contentSections.map((section, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-full px-4 py-6 bg-gray-50 rounded-lg shadow-md"
                        >
                          <div
                            dangerouslySetInnerHTML={{ __html: section }}
                            className="text-gray-800 leading-relaxed"
                          />
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-r-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
                    aria-label="Previous"
                  >
                    &#9664;
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-l-lg shadow-lg hover:bg-gray-800 transition-colors duration-300"
                    aria-label="Next"
                  >
                    &#9654;
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Comments blogId={id} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
      <Partner />
      <Footer />
    </div>
  );
};

export default BlogPost;
