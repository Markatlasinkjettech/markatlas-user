import React, { useState } from 'react';
import { getAuth, updatePassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUserModal = ({ user, onSave, onClose }) => {
  const [name, setName] = useState(user.name);
  const [number, setNumber] = useState(user.number);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null); // General error state
  const [numberError, setNumberError] = useState(null); // Specific error state for number validation
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = (passwordType) => {
    if (passwordType === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (passwordType === 'new') {
      setShowNewPassword(!showNewPassword);
    }
  };

  // Function to handle save operation
  const handleSave = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    try {
      // Re-authenticate the user
      await signInWithEmailAndPassword(auth, user.email, currentPassword);

      // Update the password if new password is provided
      if (newPassword) {
        await updatePassword(currentUser, newPassword);
      }

      // Validate the number
      if (!validateNumber(number)) {
        throw new Error('Number must be a 10-digit number.');
      }

      // Update Firestore document
      await updateDoc(doc(db, 'users', user.id), {
        name,
        number,
      });

      // Reset error states
      setError(null);
      setNumberError(null);

      // Display success message
      toast.success('User updated successfully!');
      onSave(user.id, { name, number });
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);

      // Check if the error is related to number validation
      if (error.message === 'Number must be a 10-digit number.') {
        setNumberError(error.message); // Set specific number error message
        setError(null); // Clear general error message
      } else {
        setError(error.message); // Set general error message
        setNumberError(null); // Clear specific number error message
      }

      // Display error message
      toast.error('Error updating user.');
    }
  };

  // Function to validate the number
  const validateNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  // Function to handle sending password reset email
  const handleForgotPassword = async () => {
    try {
      await sendPasswordResetEmail(getAuth(), user.email);
      toast.success('Password reset email sent! Check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      toast.error('Error sending password reset email.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        {/* Display error message for number condition */}
        {numberError && <p className="text-red-500 mb-4">{numberError}</p>}
        {/* Display general error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <p className="text-gray-600 mb-4">Email: {user.email}</p>
        <input
          className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* Add validation for the number input */}
        <input
          className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
          type="text"
          placeholder="Number (10-digit)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <div className="relative">
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            className="absolute top-0 right-0 mt-3 mr-4 text-gray-500"
            onClick={() => togglePasswordVisibility('current')}
          >
            {showCurrentPassword ? "Hide" : "Show"}
          </button>
        </div>
        <div className="relative">
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password (Optional)"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            className="absolute top-0 right-0 mt-3 mr-4 text-gray-500"
            onClick={() => togglePasswordVisibility('new')}
          >
            {showNewPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Save
        </button>
        <button
          onClick={handleForgotPassword}
          className
          ="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Forgot Password
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Cancel
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUserModal;
