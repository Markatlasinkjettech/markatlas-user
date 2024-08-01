import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

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

const AddCourseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [subCourses, setSubCourses] = useState([{ name: '', description: '', additionalContents: [], topics: [] }]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const uploading = subCourses.some(subCourse =>
      subCourse.additionalContents.some(content => content.uploading)
    );
    setIsUploading(uploading);
  }, [subCourses]);

  const handleAdditionalContentChange = (subCourseIndex, contentIndex, value) => {
    setSubCourses(prevSubCourses => {
      const updatedSubCourses = [...prevSubCourses];
      updatedSubCourses[subCourseIndex].additionalContents[contentIndex].value = value;
      return updatedSubCourses;
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
    else handleSubmit();
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleAddTopic = (subCourseIndex) => {
    const updatedSubCourses = [...subCourses];
    updatedSubCourses[subCourseIndex].topics.push({ name: '', videoUrl: '' });
    setSubCourses(updatedSubCourses);
  };

  const handleRemoveTopic = (subCourseIndex, topicIndex) => {
    const updatedSubCourses = [...subCourses];
    updatedSubCourses[subCourseIndex].topics.splice(topicIndex, 1);
    setSubCourses(updatedSubCourses);
  };

  const handleFileUpload = async (event, subCourseIndex, contentIndex) => {
    try {
      const uploadedFile = event.target.files[0];
      const storagePath = `additional/${uploadedFile.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, uploadedFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading file:', error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setSubCourses(prevSubCourses => {
              const updatedSubCourses = [...prevSubCourses];
              updatedSubCourses[subCourseIndex].additionalContents[contentIndex].value = downloadURL;
              return updatedSubCourses;
            });
          });
        }
      );
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isUploading) {
        setAlertMessage('Please wait for all files to finish uploading.');
        setShowAlert(true);
        return;
      }

      const batch = [];
      subCourses.forEach(subCourse => {
        const formattedSubCourse = {
          name: subCourse.name,
          description: subCourse.description,
          additionalContents: subCourse.additionalContents.map(content => ({
            type: content.type,
            value: content.value
          })),
          topics: subCourse.topics.map(topic => ({
            name: topic.name,
            videoUrl: topic.videoUrl
          }))
        };
        batch.push(addDoc(collection(db, 'subcourses'), formattedSubCourse));
      });

      await Promise.all(batch);

      setAlertMessage('Course added successfully');
      setShowAlert(true);

      setSubCourses([{ name: '', description: '', additionalContents: [], topics: [] }]);
      setCurrentStep(1);
    } catch (error) {
      setAlertMessage('Error adding course. Please try again.');
      setShowAlert(true);
      console.error('Error adding course:', error);
    }
  };

  const renderStepOne = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 1: Add Sub Courses</h2>
      {subCourses.map((subCourse, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder={`Sub Course ${index + 1} Name`}
            className="w-full border border-gray-300 rounded p-2 mb-1"
            value={subCourse.name}
            onChange={(e) => {
              const updatedSubCourses = [...subCourses];
              updatedSubCourses[index].name = e.target.value;
              setSubCourses(updatedSubCourses);
            }}
            required
          />
          <textarea
            placeholder={`Sub Course ${index + 1} Description`}
            className="w-full border border-gray-300 rounded p-2 mb-1"
            value={subCourse.description}
            onChange={(e) => {
              const updatedSubCourses = [...subCourses];
              updatedSubCourses[index].description = e.target.value;
              setSubCourses(updatedSubCourses);
            }}
            required
          />
          {subCourse.additionalContents.map((content, contentIndex) => (
            <div key={contentIndex} className="flex items-center mb-1">
              <select
                className="border border-gray-300 rounded p-2 mr-2"
                value={content.type}
                onChange={(e) => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[index].additionalContents[contentIndex].type = e.target.value;
                  setSubCourses(updatedSubCourses);
                }}
              >
                <option value="assignment">Assignment</option>
                <option value="notes">Notes</option>
                <option value="recordings">Recordings</option>
                <option value="others">Others</option>
              </select>
              {content.type !== 'recordings' && (
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded p-2"
                  onChange={(e) => handleFileUpload(e, index, contentIndex)}
                  required
                />
              )}
              {content.type === 'recordings' && (
                <input
                  type="text"
                  placeholder="Video URL"
                  className="w-full border border-gray-300 rounded p-2"
                  value={content.value}
                  onChange={(e) => handleAdditionalContentChange(index, contentIndex, e.target.value)}
                  required
                />
              )}
              <button
                className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
                onClick={() => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[index].additionalContents.splice(contentIndex, 1);
                  setSubCourses(updatedSubCourses);
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            onClick={() => {
              const updatedSubCourses = [...subCourses];
              updatedSubCourses[index].additionalContents.push({ type: 'assignment', value: '' });
              setSubCourses(updatedSubCourses);
            }}
          >
            Add Additional Content
          </button>
        </div>
      ))}
     
      <div className="flex justify-between mt-8">
       
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Next Step</button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 2: Add Topics</h2>
      {subCourses.map((subCourse, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{subCourse.name}</h3>
          {subCourse.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="mb-2">
              <input
                type="text"
                placeholder={`Topic ${topicIndex + 1} Name`}
                className="w-full border border-gray-300 rounded p-2 mb-1"
                value={topic.name}
                onChange={(e) => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[index].topics[topicIndex].name = e.target.value;
                  setSubCourses(updatedSubCourses);
                }}
                required
              />
              <input
                type="text"
                placeholder={`Topic ${topicIndex + 1} Video URL`}
                className="w-full border border-gray-300 rounded p-2"
                value={topic.videoUrl}
                onChange={(e) => {
                  const updatedSubCourses = [...subCourses];
                  updatedSubCourses[index].topics[topicIndex].videoUrl = e.target.value;
                  setSubCourses(updatedSubCourses);
                }}
                required
              />
              <button
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
                onClick={() => handleRemoveTopic(index, topicIndex)}
              >
                Remove Topic
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleAddTopic(index)}
          >
            Add Topic
          </button>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Previous Step</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleNextStep}>Next Step</button>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Step 3: Review & Submit</h2>
      {subCourses.map((subCourse, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Sub Course {index + 1}</h3>
          <p><strong>Name:</strong> {subCourse.name}</p>
          <p><strong>Description:</strong> {subCourse.description}</p>
          <p><strong>Additional Contents:</strong></p>
          <ul className="list-disc list-inside">
            {subCourse.additionalContents.map((content, contentIndex) => (
              <li key={contentIndex}><strong>{content.type}:</strong> {content.value}</li>
            ))}
          </ul>
          <p><strong>Topics:</strong></p>
          <ul className="list-disc list-inside">
            {subCourse.topics.map((topic, topicIndex) => (
              <li key={topicIndex}><strong>{topic.name}:</strong> {topic.videoUrl}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Previous Step</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">Add Course Form</h1>
        <button 
          className="bg-purple-500 text-white px-4 py-2 rounded" 
          onClick={() => navigate('/EditSubcoursesForm')}
        >
          SubCourseManagement
        </button>
      </div>
      {showAlert && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{alertMessage}</span>
          <button onClick={() => setShowAlert(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 5.652a1 1 0 0 0-1.415 0L10 8.586 7.066 5.652a1 1 0 0 0-1.415 1.415L8.586 10l-2.935 2.934a1 1 0 1 0 1.415 1.415L10 11.414l2.934 2.935a1 1 0 0 0 1.415-1.415L11.414 10l2.935-2.934a1 1 0 0 0 0-1.414z"/></svg>
          </button>
        </div>
      )}
      {currentStep === 1 && renderStepOne()}
      {currentStep === 2 && renderStepTwo()}
      {currentStep === 3 && renderStepThree()}
    </div>
  );
};

export default AddCourseForm;
