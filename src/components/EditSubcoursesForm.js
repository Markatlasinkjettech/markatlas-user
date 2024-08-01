import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4qjcP40hgzx-gWKqVB6c9h9OKpecZobw",
    authDomain: "lms-1-36b1f.firebaseapp.com",
    projectId: "lms-1-36b1f",
    storageBucket: "lms-1-36b1f.appspot.com",
    messagingSenderId: "568729903010",
    appId: "1:568729903010:web:5e85a998503b1054f9dcfb",
    measurementId: "G-Z5844EFCH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const EditSubcoursesForm = () => {
  const [subcourses, setSubcourses] = useState([]);
  const [filteredSubcourses, setFilteredSubcourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSubcourses();
  }, []);

  useEffect(() => {
    const filtered = subcourses.filter(subcourse =>
      subcourse.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubcourses(filtered);
  }, [searchTerm, subcourses]);

  const fetchSubcourses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'subcourses'));
      const subcoursesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSubcourses(subcoursesData);
      setFilteredSubcourses(subcoursesData);
    } catch (error) {
      console.error('Error fetching subcourses:', error);
      setAlertMessage('Error fetching subcourses. Please try again.');
      setShowAlert(true);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setCurrentStep(1);
  };

  const handleSave = async (index) => {
    try {
      const subcourse = subcourses[index];
      const subcourseRef = doc(db, 'subcourses', subcourse.id);
      await updateDoc(subcourseRef, {
        name: subcourse.name,
        description: subcourse.description,
        additionalContents: subcourse.additionalContents,
        topics: subcourse.topics
      });
      setEditingIndex(null);
      setAlertMessage('Subcourse updated successfully');
      setShowAlert(true);
    } catch (error) {
      console.error('Error updating subcourse:', error);
      setAlertMessage('Error updating subcourse. Please try again.');
      setShowAlert(true);
    }
  };

  const handleChange = (field, value) => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex][field] = value;
    setSubcourses(updatedSubcourses);
  };

  const handleTopicChange = (topicIndex, field, value) => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].topics[topicIndex][field] = value;
    setSubcourses(updatedSubcourses);
  };

  const handleAdditionalContentChange = (contentIndex, field, value) => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].additionalContents[contentIndex][field] = value;
    setSubcourses(updatedSubcourses);
  };

  const handleFileUpload = async (event, contentIndex) => {
    try {
      const file = event.target.files[0];
      const storagePath = `additional/${file.name}`;

      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      setIsUploading(true);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updatedSubcourses = [...subcourses];
            updatedSubcourses[editingIndex].additionalContents[contentIndex].value = downloadURL;
            setSubcourses(updatedSubcourses);
            setUploadProgress(0);
            setIsUploading(false);
          });
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else handleSave(editingIndex);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddTopic = () => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].topics.push({ name: '', videoUrl: '' });
    setSubcourses(updatedSubcourses);
  };

  const handleRemoveTopic = (topicIndex) => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].topics.splice(topicIndex, 1);
    setSubcourses(updatedSubcourses);
  };

  const handleAddAdditionalContent = () => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].additionalContents.push({ type: 'assignment', value: '' });
    setSubcourses(updatedSubcourses);
  };

  const handleRemoveAdditionalContent = (contentIndex) => {
    const updatedSubcourses = [...subcourses];
    updatedSubcourses[editingIndex].additionalContents.splice(contentIndex, 1);
    setSubcourses(updatedSubcourses);
  };

  const renderStepOne = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 1: Edit Basic Information</h2>
      <input
        type="text"
        placeholder="Subcourse Name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={subcourses[editingIndex].name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      <textarea
        placeholder="Subcourse Description"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={subcourses[editingIndex].description}
        onChange={(e) => handleChange('description', e.target.value)}
        required
        rows="4"
      />
      <button 
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
        onClick={handleNextStep}
      >
        Next Step
      </button>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 2: Edit Additional Contents</h2>
      {subcourses[editingIndex].additionalContents.map((content, contentIndex) => (
        <div key={contentIndex} className="p-4 bg-gray-100 rounded-md space-y-2">
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={content.type}
            onChange={(e) => handleAdditionalContentChange(contentIndex, 'type', e.target.value)}
          >
            <option value="assignment">Assignment</option>
            <option value="notes">Notes</option>
            <option value="recordings">Recordings</option>
            <option value="others">Others</option>
          </select>
          {content.type === 'recordings' ? (
            <input
              type="text"
              placeholder="Video URL"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={content.value}
              onChange={(e) => handleAdditionalContentChange(contentIndex, 'value', e.target.value)}
              required
            />
          ) : (
            <input
              type="file"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => handleFileUpload(e, contentIndex)}
            />
          )}
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            onClick={() => handleRemoveAdditionalContent(contentIndex)}
          >
            Remove Content
          </button>
        </div>
      ))}
      <button
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        onClick={handleAddAdditionalContent}
      >
        Add Additional Content
      </button>
      <div className="flex justify-between">
        <button 
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          onClick={handlePreviousStep}
        >
          Previous Step
        </button>
        <button 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={handleNextStep}
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Step 3: Edit Topics</h2>
      {subcourses[editingIndex].topics.map((topic, topicIndex) => (
        <div key={topicIndex} className="p-4 bg-gray-100 rounded-md space-y-2">
          <input
            type="text"
            placeholder="Topic Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={topic.name}
            onChange={(e) => handleTopicChange(topicIndex, 'name', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Video URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={topic.videoUrl}
            onChange={(e) => handleTopicChange(topicIndex, 'videoUrl', e.target.value)}
            required
          />
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
            onClick={() => handleRemoveTopic(topicIndex)}
          >
            Remove Topic
          </button>
        </div>
      ))}
      <button
        className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
        onClick={handleAddTopic}
      >
        Add Topic
      </button>
      <div className="flex justify-between">
        <button 
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
          onClick={handlePreviousStep}
        >
          Previous Step
        </button>
        <button 
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => handleSave(editingIndex)}
        >
          Save Subcourse
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Subcourses</h1>
      <input
        type="text"
        placeholder="Search Subcourses"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
      {showAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{alertMessage}</span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setShowAlert(false)}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
            </svg>
          </span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Description</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubcourses.map((subcourse, index) => (
              <tr key={subcourse.id}>
                <td className="border px-4 py-2">{subcourse.name}</td>
                <td className="border px-4 py-2">{subcourse.description}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editingIndex !== null && (
        <div className="mt-4">
          {currentStep === 1 && renderStepOne()}
          {currentStep === 2 && renderStepTwo()}
          {currentStep === 3 && renderStepThree()}
        </div>
      )}
    </div>
  );
};

export default EditSubcoursesForm;