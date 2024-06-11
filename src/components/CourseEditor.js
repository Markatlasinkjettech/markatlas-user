// src/components/CourseEditor.js
import React, { useState } from 'react';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const CourseEditor = ({ course, onUpdateCourses }) => {
  const [courseName, setCourseName] = useState(course.courseName);
  const [description, setDescription] = useState(course.description);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailURL, setThumbnailURL] = useState(course.thumbnailURL);
  const [subCourses, setSubCourses] = useState(course.subCourses || []);

  const handleUpdateCourse = async () => {
    let newThumbnailURL = thumbnailURL;

    if (thumbnail) {
      const storageRef = ref(storage, `thumbnails/${thumbnail.name}`);
      const uploadTask = uploadBytesResumable(storageRef, thumbnail);
      await uploadTask;
      newThumbnailURL = await getDownloadURL(storageRef);
    }

    const updatedCourse = {
      courseName,
      description,
      thumbnailURL: newThumbnailURL,
      subCourses,
    };

    await updateDoc(doc(db, 'courses', course.id), updatedCourse);
    onUpdateCourses(prevCourses => prevCourses.map(c => c.id === course.id ? updatedCourse : c));
  };

  return (
    <div>
      <h2>Edit Course</h2>
      <form onSubmit={handleUpdateCourse}>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
        <button type="submit">Save Changes</button>
      </form>
      {/* Add sub-course management UI here */}
    </div>
  );
};

export default CourseEditor;
