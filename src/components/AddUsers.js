import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AddUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUp = async () => {
    try {
      if (!validatePassword(password)) {
        throw new Error(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one special character, and one number.'
        );
      }

      // Add validation for number
      if (!validateNumber(number)) {
        throw new Error('Number must be a 10-digit number.');
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        number: number
      });

      toast.success('Account created successfully!', { autoClose: 2000 });
      setEmail('');
      setPassword('');
      setName('');
      setNumber('');
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    return (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      specialCharRegex.test(password) &&
      numberRegex.test(password)
    );
  };

  // Function to validate the number
  const validateNumber = (number) => {
    return /^\d{10}$/.test(number);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="flex justify-center w-full max-w-7xl mx-auto mb-8">
        <h2 className="text-2xl font-bold">Add new users</h2>
      </div>
      <hr className="border-t-2 border-gray-300 w-full mb-8" />
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute top-0 right-0 px-3 py-2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <input
            className="block w-full px-4 py-2 border border-gray-300 rounded mb-4"
            type="text"
            placeholder="Number (10-digit)"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <button
            onClick={signUp}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
          >
            Create
          </button>
          <Link
            to="/dashboard"
            className="block w-full text-center bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Back
          </Link>
          <Link to="/usermanagement" className="block w-full text-center text-blue-500 hover:underline py-2 mt-4">
            Go to User Management
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddUsers;
