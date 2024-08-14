import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const jobDoc = await getDoc(doc(db, 'jobDescription', id));
      if (jobDoc.exists()) {
        setJob(jobDoc.data());
      } else {
        console.error("No such job!");
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div className="flex justify-center items-center min-h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-gray-100 p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800">
            {job.jobTitle}
          </h1>
          <div className="flex justify-between mt-6">
            <p className="text-gray-700 text-lg"><strong>Location:</strong> {job.location}</p>
            <p className="text-gray-700 text-lg"><strong>Experience:</strong> {job.experience}</p>
          </div>
        </div>
        <div className="p-8">
          <div className="text-gray-800 mb-8">
            <strong className="text-xl">Description:</strong>
            <div className="mt-4 text-base" dangerouslySetInnerHTML={{ __html: job.description }} />
          </div>
          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate('/career')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Back
            </button>
            <button
              onClick={() => navigate(`/apply/${id}`)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
