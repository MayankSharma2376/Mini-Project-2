import React, { useState } from 'react';

const Mission = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sectionStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'stretch',
    minHeight: '400px',
  };

  const textBoxStyle = {
    backgroundColor: '#4b7255', // light green box
    color: '#f5f5dc', // cream text
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: '700',
    color: '#f5f5dc',
  };

  const paraStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    color: '#f5f5dc',
  };

  const accordionItem = {
    backgroundColor: '#3d5a40',
    marginBottom: '0.8rem',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #f5f5dc55',
  };

  const accordionHeader = {
    padding: '0.8rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '600',
    backgroundColor: '#2f4f39',
    color: '#f5f5dc',
  };

  const accordionContent = {
    padding: '1rem',
    backgroundColor: '#4b7255',
    fontSize: '0.95rem',
    color: '#f5f5dc',
    transition: 'max-height 0.3s ease',
  };

  return (
    <section style={sectionStyle}>
      {/* Left Side: Image */}
      <div>
        <img
          src="/mission.jpg"
          alt="Our Mission"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Right Side: Text */}
      <div style={textBoxStyle}>
        <h2 style={headingStyle}>Our Mission</h2>
        <p style={paraStyle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum dolore.
        </p>

        {/* Accordion Section */}
        <div>
          {/* Programs */}
          <div style={accordionItem}>
            <div
              style={accordionHeader}
              onClick={() => toggleSection('programs')}
            >
              <span>Programs</span>
              <span>{openSection === 'programs' ? '-' : '+'}</span>
            </div>
            {openSection === 'programs' && (
              <div style={accordionContent}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            )}
          </div>

          {/* Services */}
          <div style={accordionItem}>
            <div
              style={accordionHeader}
              onClick={() => toggleSection('services')}
            >
              <span>Services</span>
              <span>{openSection === 'services' ? '-' : '+'}</span>
            </div>
            {openSection === 'services' && (
              <div style={accordionContent}>
                We offer a wide range of sustainable waste management services to
                keep your community green and clean.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
