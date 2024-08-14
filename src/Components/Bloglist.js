import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Icons for arrows

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

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 transition"
        onClick={onClick}
      >
        <FaArrowLeft />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600 transition"
        onClick={onClick}
      >
        <FaArrowRight />
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    customPaging: (i) => (
      <div
        className="h-2 w-2 md:h-3 md:w-3 bg-gray-300 rounded-full hover:bg-indigo-500"
      ></div>
    ),
    dotsClass: "slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">Blog Posts</h1>
      <div className="bg-white p-6 rounded-lg relative">
        <Slider {...settings}>
          {blogs.map(blog => (
            <div key={blog.id} className="p-4">
              <div className="h-full flex flex-col items-center justify-center bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
                <img
                  src={blog.image || 'https://via.placeholder.com/500x200'}
                  alt={blog.title}
                  className="max-h-40 w-full object-cover rounded-t-lg"
                />
                <div className="p-5 text-center">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h2>
                  <p className="text-gray-700 mb-4 line-clamp-2">{blog.description}</p>
                  <Link 
                    to={`/blog/${blog.id}`} 
                    className="inline-block bg-white text-indigo-500 font-medium py-2 px-4 rounded-full border border-indigo-500 transition duration-300 ease-in-out hover:bg-indigo-500 hover:text-white"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BlogList;
