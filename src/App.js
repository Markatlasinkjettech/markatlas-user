import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';


import Navbar from './components/Navbar';
import BlogForm from './components/BlogForm';
import PrivateRoute from './components/PrivateRoute';

import Career from './components/Career';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/AddJob" element={<Career/>} />
          <Route path="/AddBlog" element={<BlogForm/>} />
          
          
 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
