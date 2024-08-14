// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AboutPage from './Components/AboutPage';
// import ServicesPage from './Components/ServicesPage';
import TechnologiesPage from './Components/TechnologiesPage';
 import Career from './Components/Career'; import MorePage from './Components/MorePage';
import ContactPage from './Components/ContactUs';
import JobDetail from './Components/Career/JobDetail';
import JobApplication from './Components/Career/JobApplication';
import BlogPost from './Components/BlogPost';
import CustomServices from './Components/CustomServices';
import Cloudservices from './Components/Cloudservices';
import ITConsulting from './Components/ITConsulting';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/service1" element={<CustomServices />} />
        <Route path="/service2" element={<Cloudservices />} />
        <Route path="/service3" element={<ITConsulting />} />
         <Route path="/technologies" element={<TechnologiesPage />} />
        
        <Route path="/more" element={<MorePage />} />

        <Route path="/contact-us" element={<ContactPage />} /> 
        <Route path="/career" element={<Career />} />
        <Route path="/job/:id" element={<JobDetail />} />
        <Route path="/apply/:id" element={<JobApplication />} />
        <Route path="/blog/:id" element={<BlogPost/>}/>
        
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
