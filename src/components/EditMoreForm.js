import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Add this line to avoid accessibility issues with react-modal

const EditMoreForm = ({ moreItem, onClose, onSave }) => {
  const [title, setTitle] = useState(moreItem?.title || '');
  const [description, setDescription] = useState(moreItem?.description || '');
  const [content, setContent] = useState(moreItem?.content || '');
  const [image, setImage] = useState(moreItem?.image || '');
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const storage = getStorage();
    const storageRef = ref(storage, `more-images/${file.name}`);

    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
      setImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image: ', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const moreDoc = doc(db, 'moreadd', moreItem.id);
      const updatedMoreItem = {
        title,
        description,
        content,
        image,
      };
      await updateDoc(moreDoc, updatedMoreItem);
      onSave({ ...updatedMoreItem, id: moreItem.id });
    } catch (error) {
      console.error('Error updating more item: ', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full max-h-4/5 overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Edit More Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-800 font-bold mb-1" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-800 font-bold mb-1" htmlFor="description">
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-800 font-bold mb-1" htmlFor="image">
              Image
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {isUploading && <p>Uploading image...</p>}
            {image && <img src={image} alt="More Item" className="mt-2 max-w-full h-auto max-h-20" />}
          </div>
          <div>
            <label className="block text-gray-800 font-bold mb-1" htmlFor="content">
              Content
            </label>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={() => setIsModalOpen(true)}
            >
              Edit Content
            </button>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Modal for the content editor */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Content"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75"
      >
        <div className="bg-white rounded-lg shadow-lg w-11/12 h-5/6 max-w-5xl mx-auto flex flex-col">
          <div className="sticky top-0 bg-white p-4 border-b border-gray-300">
            <h2 className="text-2xl font-bold italic text-gray-800">Edit Content</h2>
          </div>
          <div className="flex-grow overflow-auto p-4">
            <ReactQuill
              theme="snow"
              value={content}
              onChange={handleContentChange}
              className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm h-full"
              style={{ minHeight: '300px' }}
            />
          </div>
          <div className="p-4 border-t border-gray-300 flex justify-end">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setIsModalOpen(false)}
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditMoreForm;
