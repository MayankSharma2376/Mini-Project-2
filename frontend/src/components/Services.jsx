import React from 'react';

const Services = () => {
  const servicesStyle = {
    backgroundColor: '#1a4d2c', // Dark green background
    padding: '4rem 0',
    color: '#fff',
    fontFamily: '"Poppins", sans-serif' // clean modern font
  };

  const containerStyle = {
    width: '90%',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center'
  };

  const headingStyle = {
    fontSize: '2.5rem',
    marginBottom: '3rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#f5f5dc' // cream shade for section heading
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  };

  const itemStyle = {
    backgroundColor: '#f5f5dc', // cream card background
    padding: '2rem',
    borderRadius: '15px',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    color: '#1a4d2c'
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '1.5rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#1a4d2c', // dark green for titles
    fontWeight: '600'
  };

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '0',
    color: '#333'
  };

  const buttonStyle = {
    backgroundColor: '#a8e6cf', // light green accent
    color: '#1a4d2c',
    border: 'none',
    padding: '1rem 2.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: '"Poppins", sans-serif'
  };

  return (
    <section className="services" style={servicesStyle}>
      <div className="container" style={containerStyle}>
        <h2 style={headingStyle}>Our Services</h2>
        <div className="services-grid" style={gridStyle}>
          <div className="service-item" style={itemStyle}>
            <img src="/service1.jpg" alt="Service 1" style={imageStyle} />
            <h3 style={titleStyle}>Heading 1</h3>
            <p style={textStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
          <div className="service-item" style={itemStyle}>
            <img src="/service2.jpg" alt="Service 2" style={imageStyle} />
            <h3 style={titleStyle}>Heading 2</h3>
            <p style={textStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
          <div className="service-item" style={itemStyle}>
            <img src="/service3.jpg" alt="Service 3" style={imageStyle} />
            <h3 style={titleStyle}>Heading 3</h3>
            <p style={textStyle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            </p>
          </div>
        </div>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#fff';
            e.target.style.color = '#1a4d2c';
            e.target.style.transform = 'translateY(-3px)';
            e.target.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#a8e6cf';
            e.target.style.color = '#1a4d2c';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          All Services
        </button>
      </div>
    </section>
  );
};

export default Services;
