import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditorPopup = ({ content, onClose, onSave }) => {
  const [editorContent, setEditorContent] = useState(content);

  const handleContentChange = (value) => {
    setEditorContent(value);
  };

  const handleSave = () => {
    onSave(editorContent); // Pass the updated content back to the parent component
    onClose(); // Close the popup
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Edit Description</h2>
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={handleContentChange}
          className="shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          style={{ maxHeight: '300px', overflowY: 'auto' }} // Add scrollbar to the editor
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditorPopup;
