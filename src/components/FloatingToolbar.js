// src/components/FloatingToolbar.js
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const FloatingToolbar = ({ isVisible, onClose, onSave, initialContent }) => {
  const [content, setContent] = useState(initialContent || '');

  useEffect(() => {
    setContent(initialContent || '');
  }, [initialContent]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isVisible ? 'visible' : 'hidden'}`}>
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
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingToolbar;
