import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

const MainCourseManagement = () => {
  const [mainCourses, setMainCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [subcourses, setSubcourses] = useState([]);
  const [selectedMainCourse, setSelectedMainCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '', imageUrl: '' });
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mainCoursesSnapshot = await getDocs(collection(db, 'maincourse'));
        const mainCoursesData = mainCoursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMainCourses(mainCoursesData);
        setFilteredCourses(mainCoursesData);

        const subcoursesSnapshot = await getDocs(collection(db, 'subcourses'));
        const subcoursesData = subcoursesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSubcourses(subcoursesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = mainCourses.filter(course =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(results);
  }, [searchTerm, mainCourses]);

  const handleMainCourseSelect = (course) => {
    setSelectedMainCourse(course);
    setEditForm({
      name: course.name,
      description: course.description,
      imageUrl: course.imageUrl || ''
    });
    setNewImage(null);
  };

  const handleEditMainCourse = () => {
    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleSaveEdit = async () => {
    try {
      let imageUrl = editForm.imageUrl;

      if (newImage) {
        const storageRef = ref(storage, `mainCourseImages/${selectedMainCourse.id}`);
        await uploadBytes(storageRef, newImage);
        imageUrl = await getDownloadURL(storageRef);
      }
      

      const updatedCourse = {
        ...editForm,
        imageUrl
      };

      await updateDoc(doc(db, 'maincourse', selectedMainCourse.id), updatedCourse);
      setMainCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === selectedMainCourse.id ? { ...course, ...updatedCourse } : course
        )
      );
      setSelectedMainCourse(prevCourse => ({ ...prevCourse, ...updatedCourse }));
      setShowEditModal(false);
      setNewImage(null);
    } catch (error) {
      console.error('Error updating main course:', error);
    }
  };

  const handleAddSubcourse = async (subcourseId) => {
    try {
      await updateDoc(doc(db, 'maincourse', selectedMainCourse.id), {
        subcourses: arrayUnion(subcourseId)
      });
      setSelectedMainCourse(prevCourse => ({
        ...prevCourse,
        subcourses: [...(prevCourse.subcourses || []), subcourseId]
      }));
    } catch (error) {
      console.error('Error adding subcourse:', error);
    }
  };

  const handleRemoveSubcourse = async (subcourseId) => {
    try {
      await updateDoc(doc(db, 'maincourse', selectedMainCourse.id), {
        subcourses: arrayRemove(subcourseId)
      });
      setSelectedMainCourse(prevCourse => ({
        ...prevCourse,
        subcourses: prevCourse.subcourses.filter(id => id !== subcourseId)
      }));
    } catch (error) {
      console.error('Error removing subcourse:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 pr-4">
          <h3 className="text-2xl font-bold mb-4">List of Main Courses</h3>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <ul className="bg-white shadow-md rounded-lg overflow-hidden">
            {filteredCourses.map(course => (
              <li 
                key={course.id}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:scale-105 ${selectedMainCourse && selectedMainCourse.id === course.id ? 'bg-blue-100' : ''}`}

                onClick={() => handleMainCourseSelect(course)}
              >
                {course.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-2/3 mt-8 md:mt-0">
          {selectedMainCourse && (
            <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-500 ease-in-out transform hover:shadow-xl">
              <h2 className="text-3xl font-bold mb-4">{selectedMainCourse.name}</h2>
              <p className="text-gray-600 mb-4">{selectedMainCourse.description}</p>
              {selectedMainCourse.imageUrl && (
                <img 
                  src={selectedMainCourse.imageUrl} 
                  alt={selectedMainCourse.name} 
                  className="w-full h-64 object-cover rounded-lg mb-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                />
              )}
              <button 
                onClick={handleEditMainCourse}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 transform hover:scale-105"
              >
                Edit Main Course
              </button>
              <h3 className="text-2xl font-bold mt-8 mb-4">Subcourses</h3>
              <ul className="space-y-2">
                {selectedMainCourse.subcourses && selectedMainCourse.subcourses.map(subcourseId => {
                  const subcourse = subcourses.find(sc => sc.id === subcourseId);
                  return subcourse ? (
                    <li key={subcourse.id} className="flex justify-between items-center bg-gray-100 p-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105">
                      <span>{subcourse.name}</span>
                      <button 
                        onClick={() => handleRemoveSubcourse(subcourse.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </li>
                  ) : null;
                })}
              </ul>
              <h4 className="text-xl font-bold mt-8 mb-4">Add Existing Subcourse</h4>
              <ul className="space-y-2">
                {subcourses.filter(subcourse => !selectedMainCourse.subcourses || !selectedMainCourse.subcourses.includes(subcourse.id)).map(subcourse => (
                  <li key={subcourse.id} className="flex justify-between items-center bg-gray-100 p-2 rounded transition-all duration-300 ease-in-out transform hover:scale-105">
                    <span>{subcourse.name}</span>
                    <button 
                      onClick={() => handleAddSubcourse(subcourse.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded text-sm transition-colors duration-200"
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity duration-300 ease-in-out">
          <div className="bg-white rounded-lg p-8 max-w-lg w-full transition-all duration-300 ease-in-out transform scale-100 opacity-100">
            <h2 className="text-2xl font-bold mb-4">Edit Main Course</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Image</label>
                {editForm.imageUrl && (
                  <img src={editForm.imageUrl} alt="Current course image" className="mt-1 w-full h-40 object-cover rounded-md" />
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </form>
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-200 transform hover:scale-105"
              >
                Close
              </button>
              <button 
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 transform hover:scale-105"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCourseManagement;