import React, { useState, useEffect } from 'react';

const technologies = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Angular', 'Vue.js',
  'Node.js', 'Python', 'Ruby on Rails', 'PHP', 'Java',
  'Swift', 'Kotlin', 'React Native', 'Flutter',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase',
  'AWS', 'Azure', 'Google Cloud'
];

const Technologies = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  return (
    <section className=" p-12">
      <div className="container mx-auto">
        <h2 className={`text-4xl font-bold mb-8 text-center text-orange-500 ${
          animated ? 'animate-fadeIn' : 'opacity-0'
        }`}>
          Technologies We Use
        </h2>
        <div className="flex flex-wrap justify-center">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className={`px-6 py-3 m-2 rounded-full shadow-lg font-semibold 
                bg-blue-100 text-blue-700
                transform hover:scale-110 transition-all duration-300 ease-in-out
                ${animated ? 'animate-popIn' : 'opacity-0 scale-95'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;

{/* Add these styles to your global CSS or a separate stylesheet */}
<style jsx global>{`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes popIn {
    0% { opacity: 0; transform: scale(0.5); }
    70% { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
  }

  .animate-popIn {
    animation: popIn 0.5s ease-out forwards;
  }
`}</style>