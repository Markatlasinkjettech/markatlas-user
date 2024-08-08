import React from 'react';

const steps = [
  {
    step: 'Consultation and Analysis',
    description: 'We begin by understanding your business needs, goals, and challenges. Our team conducts a thorough analysis to define the project scope and requirements.'
  },
  {
    step: 'Planning and Design',
    description: 'We create a detailed project plan outlining timelines, milestones, and deliverables. Our designers craft intuitive and user-friendly interfaces that enhance user experience.'
  },
  {
    step: 'Development and Testing',
    description: 'Our skilled developers build the software using the latest technologies and best practices. We conduct rigorous testing to ensure the software is robust, secure, and performs flawlessly.'
  },
  {
    step: 'Deployment and Training',
    description: 'Once the software is ready, we handle the deployment process, ensuring a smooth transition. We provide training to your team, ensuring they are equipped to use the new system effectively.'
  },
  {
    step: 'Maintenance and Support',
    description: "Our commitment doesn't end with deployment. We offer ongoing maintenance and support to keep your software running smoothly and efficiently."
  }
];

const Process = () => {
  return (
    <section className="bg-white p-6">
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .step {
          opacity: 0;
          animation: fadeInScale 0.6s ease-out forwards;
        }
        .step:nth-child(1) { animation-delay: 0.2s; }
        .step:nth-child(2) { animation-delay: 0.4s; }
        .step:nth-child(3) { animation-delay: 0.6s; }
        .step:nth-child(4) { animation-delay: 0.8s; }
        .step:nth-child(5) { animation-delay: 1s; }
        .line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawLine 4s ease-out forwards;
        }
        .step-number {
          animation: pulse 2s infinite;
        }
        .step-content {
          transition: all 0.3s ease;
        }
        .step-content:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
      `}</style>
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-800">Our Development Process</h2>
        <div className="relative">
          <svg className="absolute top-0 left-6 h-full w-1" style={{zIndex: 0}}>
            <line x1="0" y1="0" x2="0" y2="100%" stroke="#3B82F6" strokeWidth="4" className="line" />
          </svg>
          {steps.map((step, index) => (
            <div key={index} className={`flex mb-16 step ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              <div className="step-number w-12 h-12 flex-shrink-0 bg-orange-500 rounded-full text-white flex items-center justify-center font-bold text-lg z-10 shadow-lg">
                {index + 1}
              </div>
              <div className={`step-content mx-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md flex-grow ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                <h3 className="text-xl font-bold mb-2 text-blue-700">{step.step}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;