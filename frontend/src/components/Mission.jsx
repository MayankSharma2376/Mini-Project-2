import React, { useState } from 'react';

// Using inline SVG for icons to remove external dependencies
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);


// Data for the accordion to keep the component DRY
const accordionData = [
  {
    id: 'programs',
    title: 'Our Programs',
    content: 'We run various community programs focused on education, waste reduction, and sustainable living practices to empower individuals to make a difference.',
  },
  {
    id: 'services',
    title: 'Our Services',
    content: 'We offer a wide range of sustainable waste management services to keep your community green and clean, including residential and commercial solutions.',
  },
];

const Mission = () => {
  const [openSection, setOpenSection] = useState(null);

  // Toggles the accordion sections
  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Side: Image */}
      <div className="min-h-[400px] md:min-h-0">
        <img
          src="/mission.jpg"
          alt="Community members collaborating on a recycling project"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side: Text and Accordion */}
      <div className="bg-[#4b7255] text-[#f5f5dc] p-8 sm:p-12 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-base leading-relaxed mb-8">
          To build a sustainable future by providing innovative and accessible recycling solutions. We are dedicated to educating communities, empowering individuals, and preserving our planet for generations to come through responsible waste management.
        </p>

        {/* Accordion Section */}
        <div className="space-y-3">
          {accordionData.map((item) => (
            <div key={item.id} className="bg-[#3d5a40] rounded-lg overflow-hidden border border-[#f5f5dc]/30">
              {/* Accordion Header */}
              <div
                className="p-4 cursor-pointer flex justify-between items-center font-semibold bg-[#2f4f39]"
                onClick={() => toggleSection(item.id)}
              >
                <span>{item.title}</span>
                <span>
                  {openSection === item.id ? <MinusIcon /> : <PlusIcon />}
                </span>
              </div>

              {/* Accordion Content (conditionally rendered) */}
              {openSection === item.id && (
                <div className="p-4 bg-[#4b7255] text-sm text-white/90">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;

