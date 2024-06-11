import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import EditBlogForm from './EditBlogForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogCollection = collection(db, 'blogs');
      const blogSnapshot = await getDocs(blogCollection);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteDoc(doc(db, 'blogs', blogId));
      setBlogs(blogs.filter(blog => blog.id !== blogId));
      toast.success('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog post: ', error);
      toast.error('Error deleting blog post.');
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">Blog Management</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors  sm:mb-0 sm:mr-2">Dashboard</Link>
            <Link to="/blogform" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors">Add New Blog</Link>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-200 font-bold text-gray-700 border-b border-gray-300">
            <div className="col-span-4 border-r border-gray-300 pr-4">Title</div>
            <div className="col-span-4 border-r border-gray-300 pr-4">Description</div>
            <div className="col-span-4">Actions</div>
          </div>
          <ul className="divide-y divide-gray-300">
            {filteredBlogs.map(blog => (
              <li key={blog.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-4 border-r border-gray-300 pr-4">
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                </div>
                <div className="col-span-4 border-r border-gray-300 pr-4">
                  <p className="text-gray-600">{blog.description}</p>
                </div>
                <div className="col-span-4 flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleEditBlog(blog)}
                  >
                    <FaEdit className="inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDeleteBlog(blog.id)}
                  >
                    <FaTrash className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedBlog && (
        <EditBlogForm
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onSave={(updatedBlog) => {
            setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
            setSelectedBlog(null);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default BlogManagement;
