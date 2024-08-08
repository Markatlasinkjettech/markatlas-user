import React, { useEffect, useRef } from 'react';

const TimelineEvent = ({ year, description, isLeft }) => {
  const eventRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (eventRef.current) {
      observer.observe(eventRef.current);
    }

    return () => {
      if (eventRef.current) {
        observer.unobserve(eventRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={eventRef} 
      className={`flex items-center mb-16 opacity-0 translate-y-4 transition-all duration-700 ease-out
                  ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-1/2 px-4 ${isLeft ? 'text-right' : 'text-left'}`}>
        <h3 className="text-4xl font-bold text-orange-500 mb-2">{year}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="w-4 h-4 bg-blue-500 rounded-full mx-4 animate-pulse" />
      <div className="w-1/2" />
    </div>
  );
};

const HistoryTimeline = () => {
  const events = [
    {
      year: 2018,
      description: "Ut non dolor anim cupidatat sunt pariatur labore ex excepteur labore laborum sit Lorem. Dolor non proident amet in exercitation aute anim reprehende"
    },
    {
      year: 2020,
      description: "Ut non dolor anim cupidatat sunt pariatur labore ex excepteur labore laborum sit Lorem. Dolor non proident amet in exercitation aute anim reprehende"
    },
    {
      year: 2022,
      description: "Ut non dolor anim cupidatat sunt pariatur labore ex excepteur labore laborum sit Lorem. Dolor non proident amet in exercitation aute anim reprehende"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center mb-4 animate-fade-in">Our History</h1>
      <p className="text-gray-500 text-center mb-16 animate-fade-in"></p>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gray-300" />
        {events.map((event, index) => (
          <TimelineEvent 
            key={index} 
            year={event.year} 
            description={event.description} 
            isLeft={index % 2 === 0}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;