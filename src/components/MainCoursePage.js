import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Modal, Button, Form, Spinner, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCourseForm from './AddCourseForm';
import './MainCoursePage.css';

const MainCoursePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [showAddSubcourseModal, setShowAddSubcourseModal] = useState(false);
  const [subcourses, setSubcourses] = useState([]);
  const [selectedSubcourses, setSelectedSubcourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubcourses();
  }, []);

  const fetchSubcourses = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'subcourses'));
      const subcoursesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSubcourses(subcoursesData);
    } catch (error) {
      console.error('Error fetching subcourses:', error);
      setError('Failed to fetch subcourses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSubcourse = () => {
    setShowAddSubcourseModal(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSaveCourse = async () => {
    if (!name || !description) {
      alert('Please enter name and description.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let imageUrl = '';

      if (image) {
        const imageRef = ref(storage, `course-images/${Date.now()}-${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
        console.log('Image uploaded successfully. URL:', imageUrl);
      }

      const courseData = {
        name,
        description,
        imageUrl,
        subcourses: selectedSubcourses,
        createdAt: new Date(),
      };

      console.log('Attempting to save course data:', courseData);

      const docRef = await addDoc(collection(db, 'maincourse'), courseData);

      console.log('Course added successfully with ID:', docRef.id);
      alert('Course added successfully!');
      
      // Reset form
      setName('');
      setDescription('');
      setImage(null);
      setSelectedSubcourses([]);
    } catch (error) {
      console.error('Error adding course:', error);
      setError(`Error adding course: ${error.message}`);
      alert('Error adding course. Please check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubcourseSelect = (id) => {
    setSelectedSubcourses((prev) =>
      prev.includes(id) ? prev.filter((subcourseId) => subcourseId !== id) : [...prev, id]
    );
  };

  const handleCloseModal = () => {
    setShowAddSubcourseModal(false);
    fetchSubcourses(); // Refresh subcourses list after closing modal
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Add Main Course</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>
        <Button variant="primary" onClick={handleAddSubcourse}>
          Add Subcourse
        </Button>
        <Button variant="success" onClick={handleSaveCourse} className="ms-2" disabled={loading}>
          {loading ? 'Saving...' : 'Save Course'}
        </Button>
      </Form>

      <h3 className="mt-4">Available Subcourses</h3>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      ) : (
        <ListGroup className="subcourse-list mt-3">
          {subcourses.map((subcourse) => (
            <ListGroup.Item
              key={subcourse.id}
              className={selectedSubcourses.includes(subcourse.id) ? 'active' : ''}
              onClick={() => handleSubcourseSelect(subcourse.id)}
              action
            >
              <h5 className="mb-1">{subcourse.name}</h5>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Modal show={showAddSubcourseModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Subcourse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCourseForm onSuccess={handleCloseModal} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MainCoursePage;
