import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
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

const AddCourseForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [subCourses, setSubCourses] = useState([{ name: '', description: '', additionalContents: [], topics: [] }]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
                placeholder={`Video URL for Topic ${topicIndex + 1}`}
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
                className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                onClick={() => handleRemoveTopic(index, topicIndex)}
              >
                Remove Topic
              </button>
            </div>
          ))}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
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
      <h2 className="text-2xl font-bold mb-4">Step 3: Confirm and Submit</h2>
      <h3 className="text-lg font-semibold mb-2">Sub Courses:</h3>
      <ul className="mb-4">
        {subCourses.map((subCourse, index) => (
          <li key={index}>
            <strong>{subCourse.name}</strong>: {subCourse.description}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Additional Contents:</h3>
      <ul className="mb-4">
        {subCourses.map((subCourse, index) => (
          <li key={index}>
            <strong>{subCourse.name}</strong>:
            {subCourse.additionalContents.map((content, contentIndex) => (
              <span key={contentIndex}>
                {content.type}: {content.value}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mb-2">Topics:</h3>
      <ul className="mb-4">
        {subCourses.map((subCourse, index) => (
          <li key={index}>
            <strong>{subCourse.name}</strong>:
            {subCourse.topics.map((topic, topicIndex) => (
              <span key={topicIndex}>
                {topic.name}: {topic.videoUrl}
              </span>
            ))}
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-8">
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handlePreviousStep}>Previous Step</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border border-gray-300 rounded">
      {showAlert && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4" role="alert">
          {alertMessage}
        </div>
      )}
      {currentStep === 1 && renderStepOne()}
      {currentStep === 2 && renderStepTwo()}
      {currentStep === 3 && renderStepThree()}
      {isUploading && (
        <div className="bg-gray-800 bg-opacity-50 fixed top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <p>Uploading files... {uploadProgress}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
