import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourseForm from './components/AddCourseForm';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import AddUsers from './components/AddUsers';
import Navbar from './components/Navbar';
import BlogForm from './components/BlogForm';
import ManageCourses from './components/CourseManagementStep1';
import DownloadPage from './components/DownloadPage';
import ManageSubcourses from './components/ManageSubcourses';
import BlogManagement from './components/BlogManagement';
import EditBlogForm from './components/EditBlogForm';
import UserManagement from './components/UserManagement';
import MoreAddForm from './components/MoreAddForm';
import MoreManagement from './components/MoreManagement';
import PrivateRoute from './components/PrivateRoute';
import EditCourseForm from './components/EditCourseForm';
import FloatingToolbar from './components/FloatingToolbar';
import TextEditorPopup from './components/TextEditorPopup';


import MainCoursePage from './components/MainCoursePage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/Dashboard" element={<AdminDashboard />} />
          <Route path="/CourseForm" element={<AddCourseForm />} />
          <Route path="/ MainCoursePage" element={< MainCoursePage />} />
          <Route path="/AddUsers" element={<AddUsers />} />
          <Route path="/BlogForm" element={<BlogForm />} />
          <Route path="/MoreAddForm" element={<MoreAddForm />} />
          <Route path="/ManageCourses" element={<ManageCourses />} />
          <Route path="/EditCourseForm/:courseid" element={<EditCourseForm />} />
          <Route path="/FloatingToolbar" element={<FloatingToolbar />} />
          <Route path="/TextEditorPopup" element={<TextEditorPopup/>}/>
          <Route path="/DownloadPage" element={<DownloadPage/>}/>
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/manage-subcourses/:courseId" element={<ManageSubcourses />} />
          <Route path="/BlogManagement" element={<BlogManagement />} />
          <Route path="/edit-blog/:id" element={<EditBlogForm />} />
          <Route path="/moremanagement" element={<MoreManagement />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
