import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';

const ManageSubCourses = () => {
  const { courseId } = useParams();
  const [subcourses, setSubcourses] = useState(null); // Initialize with null instead of []

  useEffect(() => {
    const fetchSubcourses = async () => {
      try {
        const courseRef = db.collection('courses').doc(courseId);
        const courseDoc = await courseRef.get();
        const courseData = courseDoc.data();
        
        if (courseData && courseData.subCourses) {
          // Assuming subCourses is stored as an object with index keys
          const subcoursesData = Object.keys(courseData.subCourses).map(index => ({
            id: index, // Use index as id
            ...courseData.subCourses[index] // Spread subcourse data
          }));

          setSubcourses(subcoursesData);
        } else {
          setSubcourses([]); // Set to empty array if no subcourses
        }
      } catch (error) {
        console.error('Error fetching subcourses:', error);
        setSubcourses([]); // Set to empty array in case of error
      }
    };

    fetchSubcourses();
  }, [courseId]);

  const handleDelete = async (subcourseId) => {
    try {
      // Assuming subcourses are stored as an object with index keys
      await db.collection('courses').doc(courseId).update({
        [`subCourses.${subcourseId}`]: null // Set subcourse field to null to delete
      });

      // Filter out the deleted subcourse from state
      setSubcourses(prevSubcourses => prevSubcourses.filter(subcourse => subcourse.id !== subcourseId));
      console.log('Subcourse deleted successfully');
    } catch (error) {
      console.error('Error deleting subcourse:', error);
    }
  };

  if (!subcourses) {
    // Show loading or placeholder UI while subcourses are being fetched
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Subcourses</h2>
      <ul>
        {subcourses.map(subcourse => (
          <li key={subcourse.id} className="border-b py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{subcourse.name}</h3> {/* Assuming name is a key in subcourse */}
                <p className="text-gray-500">{subcourse.description}</p> {/* Assuming description is a key in subcourse */}
              </div>
              <div>
                <Link to={`/edit-subcourse/${courseId}/${subcourse.id}`} className="text-blue-500 mr-4">Edit</Link>
                <button onClick={() => handleDelete(subcourse.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSubCourses;
