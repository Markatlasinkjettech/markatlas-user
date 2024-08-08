import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const JobApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneCountryCode: '+91',
    phoneNumber: '',
    address: '',
    linkedin: '',
    website: '',
    locationPreference: '',
    availabilityDate: '',
    workExperiences: [{ 
      jobTitle: '', 
      companyName: '', 
      startDate: '', 
      endDate: '', 
      responsibilities: '' 
    }],
    educations: [{
        level: '',
        institution: '',
        boardName: '',
        degree: '',
        fieldOfStudy: '',
        location: '',
        graduationDate: '',
        scoreType: '',
        score: ''
      }],
      
    skills: [],
    certifications: [],
    resume: null,
    coverLetter: '',
    heardFrom: '',
    eligibleToWork: false,
    willingToRelocate: false,
    gender: '',
    disabilityStatus: '',
    nationalIdType: '',
    nationalIdNumber: '',
    nationalIdDocument: null
  });
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Lakshadweep",
    "Delhi",
    "Puducherry",
    "Ladakh",
    "Jammu and Kashmir",
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jobDoc = await getDoc(doc(db, 'jobDescription', id));
        if (jobDoc.exists()) {
          setJob(jobDoc.data());
          setFormData(prevState => ({
            ...prevState,
            locationPreference: jobDoc.data().location || 'Hyderabad'
          }));
        } else {
          console.error("No such job!");
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id]);

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneCountryCode') {
      setFormData(prevState => ({
        ...prevState,
        phoneCountryCode: value
      }));
    } else if (name === 'phoneNumber') {
      // Remove any non-digit characters
      const cleanedValue = value.replace(/\D/g, '');
      setFormData(prevState => ({
        ...prevState,
        phoneNumber: cleanedValue
      }));
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperiences = [...formData.workExperiences];
    newWorkExperiences[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      workExperiences: newWorkExperiences
    }));
  };
  const handleEducationChange = (index, field, value) => {
    const newEducations = [...formData.educations];
    newEducations[index][field] = value;
    
    // Reset score when changing score type
    if (field === 'scoreType') {
      newEducations[index].score = '';
    }
    
    setFormData(prevState => ({
      ...prevState,
      educations: newEducations
    }));
  };

  const addWorkExperience = () => {
    setFormData(prevState => ({
      ...prevState,
      workExperiences: [...prevState.workExperiences, { 
        jobTitle: '', 
        companyName: '', 
        startDate: '', 
        endDate: '', 
        responsibilities: '' 
      }]
    }));
  };

  const removeWorkExperience = (index) => {
    setFormData(prevState => ({
      ...prevState,
      workExperiences: prevState.workExperiences.filter((_, i) => i !== index)
    }));
  };

//   const handleEducationChange = (index, field, value) => {
//     const newEducations = [...formData.educations];
//     newEducations[index][field] = value;
//     setFormData(prevState => ({
//       ...prevState,
//       educations: newEducations
//     }));
//   };

  const addEducation = () => {
    setFormData(prevState => ({
      ...prevState,
      educations: [...prevState.educations, {
        level: '',
        institution: '',
        degree: '',
        fieldOfStudy: '',
        graduationDate: '',
        percentage: '',
        cgpa: ''
      }]
    }));
  };

  const removeEducation = (index) => {
    setFormData(prevState => ({
      ...prevState,
      educations: prevState.educations.filter((_, i) => i !== index)
    }));
  };


  const handleSkillAdd = () => {
    setFormData(prevState => ({
      ...prevState,
      skills: [...prevState.skills, '']
    }));
  };

  const handleSkillDelete = (index) => {
    setFormData(prevState => ({
      ...prevState,
      skills: prevState.skills.filter((_, i) => i !== index)
    }));
  };

  const handleCertificationDelete = (index) => {
    setFormData(prevState => ({
      ...prevState,
      certifications: prevState.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prevState => ({
      ...prevState,
      skills: newSkills
    }));
  };

  const handleCertificationAdd = () => {
    setFormData(prevState => ({
      ...prevState,
      certifications: [...prevState.certifications, { name: '', document: null }]
    }));
  };

  const handleCertificationChange = (index, field, value) => {
    const newCertifications = [...formData.certifications];
    newCertifications[index][field] = value;
    setFormData(prevState => ({
      ...prevState,
      certifications: newCertifications
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        resume: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let applicationData = { ...formData };

      // Upload resume
      if (formData.resume) {
        const resumeRef = ref(storage, `resumes/${formData.fullName}-${Date.now()}.pdf`);
        await uploadBytes(resumeRef, formData.resume);
        applicationData.resumeUrl = await getDownloadURL(resumeRef);
        delete applicationData.resume; // Remove the File object
      }

      // Upload certifications
      applicationData.certifications = await Promise.all(
        formData.certifications.map(async (cert) => {
          if (cert.document) {
            const certRef = ref(storage, `certifications/${cert.name}-${Date.now()}`);
            await uploadBytes(certRef, cert.document);
            const certUrl = await getDownloadURL(certRef);
            return { name: cert.name, documentUrl: certUrl };
          }
          return { name: cert.name };
        })
      );

      // Upload national ID document
      if (formData.nationalIdDocument) {
        const nationalIdRef = ref(storage, `national-ids/${formData.nationalIdType}-${Date.now()}`);
        await uploadBytes(nationalIdRef, formData.nationalIdDocument);
        applicationData.nationalIdDocumentUrl = await getDownloadURL(nationalIdRef);
        delete applicationData.nationalIdDocument; // Remove the File object
      }

      // Submit application to Firestore
      await addDoc(collection(db, 'jobApplications'), {
        ...applicationData,
        jobId: id,
        appliedAt: new Date()
      });

      alert('Application submitted successfully!');
      navigate('/jobs');
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert(`Error submitting application: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8">
          <h1 className="text-3xl font-extrabold text-center text-white">
            Apply for {job.jobTitle}
          </h1>
          <p className="mt-2 text-center text-white">Join our team and make a difference!</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Basic Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="middleName" className="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                <input
                  id="middleName"
                  name="middleName"
                  type="text"
                  value={formData.middleName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
        <div className="flex">
          <select
            id="phoneCountryCode"
            name="phoneCountryCode"
            value={formData.phoneCountryCode}
            onChange={handlePhoneChange}
            className="w-20 px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            {/* Add more country codes as needed */}
          </select>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            required
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            placeholder="Phone number"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile (optional)</label>
                <input
                  id="linkedin"
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Personal Website (optional)</label>
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Position Details */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Position Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="locationPreference" className="block text-sm font-medium text-gray-700 mb-1">Location Preference</label>
                <select
                  id="locationPreference"
                  name="locationPreference"
                  value={formData.locationPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Location</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Bangalore">Bangalore</option>
                </select>
              </div>
              <div>
                <label htmlFor="availabilityDate" className="block text-sm font-medium text-gray-700 mb-1">Availability/Start Date</label>
                <input
                  id="availabilityDate"
                  type="date"
                  name="availabilityDate"
                  value={formData.availabilityDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>
          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Work Experience</h2>
            {formData.workExperiences && formData.workExperiences.map((exp, index) => (
              <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
                <h3 className="text-lg font-medium mb-2">Experience {index + 1}</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.jobTitle}
                    onChange={(e) => handleWorkExperienceChange(index, 'jobTitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={exp.companyName}
                    onChange={(e) => handleWorkExperienceChange(index, 'companyName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <input
                    type="date"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <textarea
                  placeholder="Responsibilities"
                  value={exp.responsibilities}
                  onChange={(e) => handleWorkExperienceChange(index, 'responsibilities', e.target.value)}
                  className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                ></textarea>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeWorkExperience(index)}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addWorkExperience}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add Work Experience
            </button>
          </section>

          <section>
  <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Education</h2>
  {formData.educations && formData.educations.map((edu, index) => (
    <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
      <h3 className="text-lg font-medium mb-2">Education {index + 1}</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          value={edu.level}
          onChange={(e) => handleEducationChange(index, 'level', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Level</option>
          <option value="10th">10th</option>
          <option value="12th">12th</option>
          <option value="Bachelor's">Bachelor's</option>
          <option value="Master's">Master's</option>
          <option value="PhD">PhD</option>
        </select>
        <input
          type="text"
          placeholder="Institution Name"
          value={edu.institution}
          onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        {(edu.level === '10th' || edu.level === '12th') ? (
          <input
            type="text"
            placeholder="Board Name"
            value={edu.boardName}
            onChange={(e) => handleEducationChange(index, 'boardName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <>
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.fieldOfStudy}
              onChange={(e) => handleEducationChange(index, 'fieldOfStudy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </>
        )}
        <select
          value={edu.location}
          onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select State</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor={`graduationYear-${index}`} className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
          <input
            id={`graduationYear-${index}`}
            type="date"
            value={edu.graduationDate}
            onChange={(e) => handleEducationChange(index, 'graduationDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={edu.scoreType}
            onChange={(e) => handleEducationChange(index, 'scoreType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Score Type</option>
            <option value="percentage">Percentage</option>
            <option value="cgpa">CGPA</option>
          </select>
        </div>
        {edu.scoreType && (
          <input
            type="number"
            step="0.01"
            min="0"
            max={edu.scoreType === 'percentage' ? 100 : 10}
            placeholder={edu.scoreType === 'percentage' ? 'Percentage' : 'CGPA'}
            value={edu.score}
            onChange={(e) => handleEducationChange(index, 'score', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        )}
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={() => removeEducation(index)}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Remove
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={addEducation}
    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Add Education
  </button>
</section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Skills</h2>
            {formData.skills.map((skill, index) => (
              <div key={index} className="flex mb-4">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  placeholder={`Skill ${index + 1}`}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button" 
                  onClick={() => handleSkillDelete(index)}
                  className="ml-2 px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleSkillAdd}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Skill
            </button>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Certifications</h2>
            {formData.certifications.map((cert, index) => (
              <div key={index} className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleCertificationChange(index, 'name', e.target.value)}
                  placeholder="Certification Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="file"
                  onChange={(e) => handleCertificationChange(index, 'document', e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button 
                  type="button" 
                  onClick={() => handleCertificationDelete(index)}
                  className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
            <button 
              type="button" 
              onClick={handleCertificationAdd}
              className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Certification
            </button>
          </section>

          {/* Resume Upload */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Resume Upload</h2>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume *</label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {formData.resume && (
                <p className="mt-2 text-sm text-gray-600">Selected file: {formData.resume.name}</p>
              )}
            </div>
          </section>

          {/* Cover Letter */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Cover Letter</h2>
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">Cover Letter (optional)</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
          </section>


          {/* National ID Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">National ID Information</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="nationalIdType" className="block text-sm font-medium text-gray-700 mb-1">National ID Type</label>
                <select
                  id="nationalIdType"
                  name="nationalIdType"
                  value={formData.nationalIdType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select ID Type</option>
                  <option value="Aadhar">Aadhar</option>
                  <option value="PAN">PAN</option>
                  <option value="Driving License">Driving License</option>
                </select>
              </div>
              <div>
                <label htmlFor="nationalIdNumber" className="block text-sm font-medium text-gray-700 mb-1">National ID Number</label>
                <input
                  id="nationalIdNumber"
                  name="nationalIdNumber"
                  type="text"
                  value={formData.nationalIdNumber}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="nationalIdDocument" className="block text-sm font-medium text-gray-700 mb-1">Upload National ID Document</label>
              <input
                id="nationalIdDocument"
                name="nationalIdDocument"
                type="file"
                onChange={handleChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </section>

          {/* Additional Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Additional Information</h2>
            
            <div>
              <label htmlFor="heardFrom" className="block text-sm font-medium text-gray-700 mb-1">How Did You Hear About Us?</label>
              <select
                id="heardFrom"
                name="heardFrom"
                value={formData.heardFrom}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select an option</option>
                <option value="Social Media">Social Media</option>
                <option value="Job Board">Job Board</option>
                <option value="Company Website">Company Website</option>
                <option value="Referral">Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </section>

          {/* Legal Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Legal Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="eligibleToWork"
                    name="eligibleToWork"
                    type="checkbox"
                    checked={formData.eligibleToWork}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="eligibleToWork" className="font-medium text-gray-700">
                    I am eligible to work in the country
                  </label>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="willingToRelocate"
                    name="willingToRelocate"
                    type="checkbox"
                    checked={formData.willingToRelocate}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="willingToRelocate" className="font-medium text-gray-700">
                    I am willing to relocate if necessary
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Diversity and Inclusion */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">Diversity and Inclusion (Optional)</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Prefer not to say</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="disabilityStatus" className="block text-sm font-medium text-gray-700 mb-1">Disability Status</label>
                <select
                  id="disabilityStatus"
                  name="disabilityStatus"
                  value={formData.disabilityStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Prefer not to say</option>
                  <option value="No disability">No disability</option>
                  <option value="Disability">Disability</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-between mt-8">
            <button
                onClick={() => navigate('/career')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                Back
                </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobApplication;