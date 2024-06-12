import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTrash } from 'react-icons/fa';

const DownloadDataPage = () => {
  const [formData, setFormData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTime, setSearchTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const formDataCollection = collection(db, 'formData');
      const formDataSnapshot = await getDocs(formDataCollection);
      const formDataData = formDataSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFormData(formDataData);
    };

    fetchData();
  }, []);

  const convertToCSV = (data) => {
    const header = ['name', 'email', 'phone', 'Date','time'];
    const rows = data.map(obj => [
      obj.name,
      obj.email,
      obj.phone,
      new Date(obj.filledAt.seconds * 1000).toLocaleString(),
      
    ].join(','));
    return `${header.join(',')}\n${rows.join('\n')}`;
  };

  const handleDownload = () => {
    const csvData = convertToCSV(formData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formData.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'formData', id));
      setFormData(formData.filter(data => data.id !== id));
      toast.success('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data: ', error);
      toast.error('Error deleting data.');
    }
  };

  const filteredFormData = formData.filter(data =>
    (data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.phone.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (searchTime === '' ||
    new Date(data.filledAt.seconds * 1000).toLocaleString().includes(searchTime))
  );

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Brochure Form Data</h2>
          <button onClick={handleDownload} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Download CSV</button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search by name, email, phone, or timing (e.g., '2022-12-31 12:00:00')"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 bg-gray-200 font-bold text-gray-700 border-b border-gray-300">
            <div className="col-span-2 border-r border-gray-300 pr-4">Name</div>
            <div className="col-span-2 border-r border-gray-300 pr-4">Email</div>
            <div className="col-span-2 border-r border-gray-300 pr-4">Phone</div>
            <div className="col-span-3 border-r border-gray-300 pr-4">Filled At</div>
            <div className="col-span-3">Actions</div>
          </div>
          <ul className="divide-y divide-gray-300">
            {filteredFormData.map(data => (
              <li key={data.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-2 border-r border-gray-300 pr-4">
                  <h3 className="text-base font-semibold">{data.name}</h3>
                </div>
                <div className="col-span-2 border-r border-gray-300 pr-4">
                  <p className="text-sm text-gray-600">{data.email}</p>
                </div>
                <div className="col-span-2 border-r border-gray-300 pr-4">
                  <p className="text-sm text-gray-600">{data.phone}</p>
                </div>
                <div className="col-span-3 border-r border-gray-300 pr-4">
                  <p className="text-sm text-gray-600">{new Date(data.filledAt.seconds * 1000).toLocaleString()}</p>
                </div>
                <div className="col-span-3 flex justify-start">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDelete(data.id)}
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
      <ToastContainer />
    </div>
  );
};

export default DownloadDataPage;
