import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import EditUserModal from './EditUserModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (userId, updatedData) => {
    setUsers(users.map(user => (user.id === userId ? { ...user, ...updatedData } : user)));
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user.');
    }
  };

  const closeModal = () => {
    setEditingUser(null);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">User Management</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/dashboard" className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors sm:mb-0 sm:mr-2">Dashboard</Link>
            <Link to="/addusers" className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors">Add New User</Link>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by name, email, or number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-200 font-bold text-gray-700 border-b border-gray-300">
            <div className="col-span-3 border-r border-gray-300 pr-4">Name</div>
            <div className="col-span-3 border-r border-gray-300 pr-4">Email</div>
            <div className="col-span-3 border-r border-gray-300 pr-4">Number</div>
            <div className="col-span-3">Actions</div>
          </div>
          <ul className="divide-y divide-gray-300">
            {filteredUsers.map(user => (
              <li key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-3 border-r border-gray-300 pr-4">
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                </div>
                <div className="col-span-3 border-r border-gray-300 pr-4">
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="col-span-3 border-r border-gray-300 pr-4">
                  <p className="text-gray-600">{user.number}</p>
                </div>
                <div className="col-span-3 flex space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleEditUser(user)}
                  >
                    <FaEdit className="inline-block mr-1" />
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <FaTrash className="inline-block mr-1" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSave={handleUpdateUser}
          onClose={closeModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default UserManagement;
