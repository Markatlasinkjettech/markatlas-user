import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUsers, FaBook, FaBlogger, FaBoxes, FaDownload } from 'react-icons/fa'; // Added FaDownload icon for download button

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [totalMoreAdds, setTotalMoreAdds] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await getDocs(collection(db, 'users'));
        const courseSnapshot = await getDocs(collection(db, 'maincourse'));
        const blogSnapshot = await getDocs(collection(db, 'blogs'));
        const moreAddSnapshot = await getDocs(collection(db, 'moreadd'));
        setTotalUsers(userSnapshot.size);
        setTotalCourses(courseSnapshot.size);
        setTotalBlogs(blogSnapshot.size);
        setTotalMoreAdds(moreAddSnapshot.size);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDownloadData = () => {
    navigate('/DownloadPage'); // Navigate to '/download' route when download button is clicked
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto relative">
        {/* Download Button */}
        <button
          onClick={handleDownloadData}
          className="absolute top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded flex items-center"
        >
          <FaDownload className="mr-2" />
          Download
        </button>

        {/* Welcome Note */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 animate-bounce">
            Welcome, Admin!
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 animate-pulse">
            Manage your Learning Management System efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Dashboard Cards */}
          <DashboardCard
            icon={<FaUsers className="text-4xl" />}
            title="Total Users"
            count={totalUsers}
            onClick={() => navigate('/usermanagement')}
            color="bg-blue-500"
          />
          <DashboardCard
            icon={<FaBook className="text-4xl" />}
            title="Total Courses"
            count={totalCourses}
            onClick={() => navigate('/MainCourseManagement')}
            color="bg-green-500"
          />
          <DashboardCard
            icon={<FaBlogger className="text-4xl" />}
            title="Total Blogs"
            count={totalBlogs}
            onClick={() => navigate('/blogmanagement')}
            color="bg-purple-500"
          />
          <DashboardCard
            icon={<FaBoxes className="text-4xl" />}
            title="More"
            count={totalMoreAdds}
            onClick={() => navigate('/moremanagement')}
            color="bg-yellow-500"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

const DashboardCard = ({ icon, title, count, onClick, color }) => {
  return (
    <div
      className={`text-white p-8 rounded-lg shadow-xl border-t-4 border-b-4 border-gray-300 cursor-pointer transition-transform transform hover:scale-105 ${color}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          {icon}
          <h3 className="text-2xl font-semibold mt-4">{title}</h3>
        </div>
        <p className="text-6xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
