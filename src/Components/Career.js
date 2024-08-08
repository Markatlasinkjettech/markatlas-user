// import React, { useEffect } from 'react';
// import { fadeInUp, fadeInLeft, fadeInRight } from './animations';
 import Header from './Career/Header';
// import HeroSection from './Career/HeroSection';
// import Whoareyou from './Career/Whoareyou';
 import Footer from './Footer';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const CareerPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900">
      <Header />
      <main className="flex-grow">
        <JoinTeamBanner />
        <WhoWeAre />
        <OurOffice />
        <OurBenefits />
        <OpenPositions />
      </main>
      <Footer />
    </div>
  );
};

const JoinTeamBanner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-white text-white py-20 sm:py-28 text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 px-4">Join Our Team</h1>
    <button className="bg-white text-green-600 px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold shadow-md hover:bg-gray-100 transition duration-300 transform hover:scale-105">
      See Open Positions
    </button>
    <div className="mt-12 flex justify-center space-x-4">
      {/* Add circular profile images here */}
    </div>
  </div>
  );
};

const infoItems = [
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f43a3cef8d3e73a22ca28de11d452bf029cb58567bc361a40bcc155956c5873b?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168",
    title: "Reprehenderit minim",
    description: "Ex cupidatat tempor labore eiusmod exercitation aute est nulla id ea. Ut nisi sit mollit voluptate qui sunt adipisicing laboris nostrud"
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3d847d1e68755c5d6086dbaf231d1f1f677723289e3bf4893e4a4cf34c62a31b?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168",
    title: "Ea aliqua",
    description: "Ex cupidatat tempor labore eiusmod exercitation aut nulla id ea."
  },
  {
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/855260a2dee539a5ffbe9daee6c075162a3aa7bd55be03c990bd9ece94b983e1?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168",
    title: "Id veniam in sunt",
    description: "Consectetur laboris cupidatat dolore duis enim dolor laborum mollit cillum minim deserunt. Enim nulla ex ipsum eiusmod qui nulla incididunt enim qui mollit sint reprehenderit ullamco"
  }
];

const WhoWeAre = () => {
  return (
    <div className="flex justify-center px-4 sm:px-6">
      <section className="z-10 self-center px-6 sm:px-12 py-12 -mt-14 w-full bg-white rounded-3xl max-w-[992px] shadow-lg">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="w-full sm:w-[26%]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-400 leading-tight sm:leading-[1.2]">
              Who we are?
            </h2>
          </div>
          <div className="w-full sm:w-[74%] mt-6 sm:mt-0">
            <div className="flex flex-col w-full text-lg sm:text-xl text-zinc-700">
              {infoItems.map((item, index) => (
                <React.Fragment key={index}>
                  <InfoItem icon={item.icon} title={item.title} description={item.description} />
                  {index < infoItems.length - 1 && <ImageDisplay src="https://cdn.builder.io/api/v1/image/assets/TEMP/bebcfa039efdce2cc133ed2f48ca824e72d70ae8acaf1d1e16439b807d2bb99f?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoItem = ({ icon, title, description }) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <img loading="lazy" src={icon} alt="" className="w-6 h-6 object-contain" />
        <div className="font-semibold">{title}</div>
      </div>
      <div className="mt-2 ml-8 text-sm sm:text-base leading-6">
        {description}
      </div>
    </>
  );
};

const ImageDisplay = ({ src }) => {
  return (
    <img
      loading="lazy"
      src={src}
      alt=""
      className="object-contain mt-6 w-full border border-solid border-zinc-200"
    />
  );
};
const ImageCard = ({ src, alt, title }) => {
    return (
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-expand">
        <img
          src={src}
          alt={alt}
          className="w-full h-64 object-cover transition-transform transform hover:scale-110"
        />
        <div className="p-4 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white text-center">
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      </div>
    );
  };

const images = [
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5851bdeca3c2b3ab6a2fe534d80bf301dc04da0b2011951dec6c00573ca7b593?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168", aspectRatio: "1.09", width: "33%" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6c178f3ea8e7161e0e978d1c2ee2b5b2b60338dfd6c9af08dee5c7f6660d1c5d?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168", aspectRatio: "2.22", width: "67%" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1db705d01d5612425d306c3546f3654415f4c85a3c01e7db301f263616e8462a?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168", aspectRatio: "2.23", width: "67%" },
  { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/606b382eece05cdf941a6d446f1f8729872f48d667f8702338ceacf641c8d835?apiKey=f5a1544773e84a5e8caa693d48d1a168&&apiKey=f5a1544773e84a5e8caa693d48d1a168", aspectRatio: "1.09", width: "33%" }
];


const OurOffice = () => {
    return (
      <div className="flex items-center justify-center min-h-screen py-10 ">
        <div className="container mx-auto px-6">
          <section className="flex flex-col items-center w-full max-w-[1176px]">
            <h1 className="text-5xl font-bold leading-none text-center text-orange-500 mb-10">
              Our Office
            </h1>
            <div className="flex flex-col gap-5 max-w-full">
              <div className="flex flex-row gap-5">
                <ImageCard {...images[0]} />
                <ImageCard {...images[1]} />
              </div>
              <div className="flex flex-row gap-5">
                <ImageCard {...images[2]} />
                <ImageCard {...images[3]} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  };
const OurBenefits = () => {
  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-orange-500">Our Benefits</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <BenefitCard
            title="Competitive Salary & Equity"
            description="We offer top-tier compensation packages"
            gradient="from-blue-200 to-indigo-600"
          />
          <BenefitCard
            title="Health, Dental & Vision Insurance"
            description="Comprehensive health plans for you and your family"
            gradient="from-red-200 to-pink-600"
          />
          <BenefitCard
            title="Flexible Work Hours & Remote Work"
            description="Work from anywhere, anytime"
            gradient="from-green-200 to-teal-600"
          />
        </div>
      </div>
    </div>
  );
};


const BenefitCard = ({ title, description, gradient }) => {
    return (
      <div className={`bg-gradient-to-br ${gradient} text-white p-6 sm:p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:rotate-1`}>
        <h3 className="text-xl sm:text-2xl font-semibold mb-4">{title}</h3>
        <p className="text-base sm:text-lg">{description}</p>
      </div>
    );
  };

const OpenPositions = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const querySnapshot = await getDocs(collection(db, 'jobDescription'));
      const jobData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobData);
    };
    fetchJobs();
  }, []);

  return (
    <div className=" py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-orange-500">
          Open Positions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};



const JobCard = ({ job }) => {
  const [viewDetailsClicked, setViewDetailsClicked] = useState(false);
  const [applyNowClicked, setApplyNowClicked] = useState(false);

  const handleViewDetailsClick = () => {
    setViewDetailsClicked(true);
    setTimeout(() => setViewDetailsClicked(false), 300); // Reset after animation
  };

  const handleApplyNowClick = () => {
    setApplyNowClicked(true);
    setTimeout(() => setApplyNowClicked(false), 300); // Reset after animation
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 transition duration-300 hover:shadow-xl">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{job.jobTitle}</h3>
      <p className="text-gray-700 mb-2"><strong>Experience:</strong> {job.experience} years</p>
      <p className="text-gray-700 mb-4"><strong>Location:</strong> {job.location}</p>
      <div className="flex justify-between items-center">
        <Link
          to={`/job/${job.id}`}
          className={`text-blue-600 hover:text-orange-500 text-sm font-medium transition duration-300 ${viewDetailsClicked ? 'animate-pulse' : ''}`}
          onClick={handleViewDetailsClick}
        >
          View Details
        </Link>
        <Link
          to={`/apply/${job.id}`}
          className={`px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300 ${applyNowClicked ? 'animate-pulse' : ''}`}
          onClick={handleApplyNowClick}
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};



export default CareerPage;