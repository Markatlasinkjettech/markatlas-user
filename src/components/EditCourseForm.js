import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';

const EditCourseForm = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    courseName: '',
    description: '',
    courseThumbnailURL: '',
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseDoc = doc(db, 'courses', courseId);
        const courseSnapshot = await getDoc(courseDoc);
        if (courseSnapshot.exists()) {
          const courseData = courseSnapshot.data();
          setCourse(courseData);
          setThumbnailPreview(courseData.courseThumbnailURL); // Set initial preview
        } else {
          console.error('Course not found');
        }
      } catch (error) {
        console.error('Error fetching course: ', error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'courseThumbnail') {
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnail(files[0]);
          setThumbnailPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      }
    } else {
      setCourse(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload thumbnail image to Firebase Storage if a new thumbnail was selected
      let imageURL = course.courseThumbnailURL; // Default to existing thumbnail URL
      if (thumbnail) {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(`images/${thumbnail.name}`);
        await imageRef.put(thumbnail);
        imageURL = await imageRef.getDownloadURL();
      }

      // Update course data in Firestore
      const courseDocRef = doc(db, 'courses', courseId);
      await updateDoc(courseDocRef, {
        ...course,
        courseThumbnailURL: imageURL,
      });
      console.log('Course updated successfully');
    } catch (error) {
      console.error('Error updating course: ', error);
    }
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block font-medium text-gray-700">Course Name</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={course.courseName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="4"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="courseThumbnail" className="block font-medium text-gray-700">Thumbnail Image</label>
            <input
              type="file"
              id="courseThumbnail"
              name="courseThumbnail"
              accept="image/*"
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {thumbnailPreview && (
              <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 w-32 h-32 object-cover" />
            )}
          </div>
          <div className="flex justify-between">
            <Link to="/coursemanagement" className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors">Back</Link>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseForm;
