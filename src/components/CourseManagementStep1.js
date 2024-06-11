import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseCollection = collection(db, 'courses');
        const courseSnapshot = await getDocs(courseCollection);
        const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCourses(courseList);
      } catch (error) {
        console.error('Error fetching courses: ', error);
      }
    };

    fetchCourses();
  }, []);

  const handleEditCourse = (course) => {
    navigate(`/EditCourse/${course.id}`);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteDoc(doc(db, 'courses', courseId));
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Error deleting course: ', error);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">Course Management</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors sm:mb-0 sm:mr-2">Dashboard</Link>
            <Link to="/addcourse" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors">Add New Course</Link>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        />
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-200 font-bold text-gray-700 border-b border-gray-300">
            <div className="col-span-3 border-r border-gray-300 pr-4">Name</div>
            <div className="col-span-6 border-r border-gray-300 pr-4">Description</div>
            <div className="col-span-3">Actions</div>
          </div>
          <ul className="divide-y divide-gray-300">
            {filteredCourses.map(course => (
              <li key={course.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-3 border-r border-gray-300 pr-4">
                  <h3 className="text-lg font-semibold">{course.courseName}</h3>
                </div>
                <div className="col-span-6 border-r border-gray-300 pr-4">
                  <p className="text-gray-600">{course.description}</p>
                </div>
                <div className="col-span-3 flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
