// src/components/MoreAddForm.js
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { db, storage } from '../firebase'; // Import db and storage from the firebase file
import FloatingToolbar from './FloatingToolbar'; // Import FloatingToolbar

const MoreAddForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [content, setContent] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageRef = ref(storage, `more-images/${file.name}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImageUrl(url);
      setImage(file);
    } catch (error) {
      console.error('Error uploading image: ', error);
      toast.error('Error uploading image');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add data to Firestore collection
      await addDoc(collection(db, 'moreadd'), {
        title,
        image: imageUrl,
        content,
        description,
        createdAt: new Date(),
      });

      // Clear form fields
      setTitle('');
      setImage(null);
      setImageUrl(null);
      setContent('');
      setDescription('');

      // Show success message
      toast.success('More content added successfully!', { autoClose: 2000 });
    } catch (error) {
      console.error('Error adding more content post: ', error);
      toast.error('Error adding more content post');
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Create a New More Content</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="block text-gray-800 font-bold mb-1" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-800 font-bold mb-1" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-800 font-bold mb-1" htmlFor="image">
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imageUrl && (
              <img src={imageUrl} alt="Uploaded" className="mt-2 w-1/2 h-32 flex items-center justify-center object-cover rounded-md" />
            )}
          </div>
          <div className="mb-2">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              Add Content
            </button>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Post More
          </button>
          <Link
            to="/dashboard"
            className="block w-full text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          >
            Back
          </Link>
          <Link to="/moremanagement" className="block w-full text-center text-blue-500 hover:underline py-2 mt-2">
            Go to More Management
          </Link>
        </form>
      </div>
      <ToastContainer />
      
      {/* Floating Toolbar Modal */}
      <FloatingToolbar
        isVisible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newContent) => setContent(newContent)}
        initialContent={content}
      />
    </div>
  );
};

export default MoreAddForm;
