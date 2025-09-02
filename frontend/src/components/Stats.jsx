import React from 'react';

const Stats = () => {
  return (
    <section
      className="stats"
      style={{
        padding: '4rem 0',
        backgroundColor: '#e5e5dc', // new beige/cream color
        fontFamily: '"Poppins", sans-serif',
        color: '#1b4332',
      }}
    >
      {/* Stats Row */}
      <div
        className="container"
        style={{
          width: '90%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          textAlign: 'center',
          flexWrap: 'wrap',
          gap: '2rem',
        }}
      >
        <div
          className="stat-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '250px',
          }}
        >
          <h3
            style={{
              fontSize: '2.8rem',
              color: '#1b4332', // dark green for numbers
              marginBottom: '0.5rem',
              fontWeight: '700',
            }}
          >
            250+
          </h3>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#1b4332',
              fontWeight: '500',
            }}
          >
            Total Pickups Completed
          </p>
        </div>

        <div
          className="stat-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '250px',
          }}
        >
          <h3
            style={{
              fontSize: '2.8rem',
              color: '#1b4332',
              marginBottom: '0.5rem',
              fontWeight: '700',
            }}
          >
            631kg
          </h3>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#1b4332',
              fontWeight: '500',
            }}
          >
            Waste Collected
          </p>
        </div>

        <div
          className="stat-item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: '250px',
          }}
        >
          <h3
            style={{
              fontSize: '2.8rem',
              color: '#1b4332',
              marginBottom: '0.5rem',
              fontWeight: '700',
            }}
          >
            8
          </h3>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#1b4332',
              fontWeight: '500',
            }}
          >
            Opportunities Applied
          </p>
        </div>
      </div>

      {/* Images Row with Overlap */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
          position: 'relative',
        }}
      >
        <img
          src="/img1.png"
          alt="Pickups Completed"
          style={{
            width: '280px',
            height: '200px',
            borderRadius: '15px',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 3,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        />
        <img
          src="/img2.png"
          alt="Waste Collected"
          style={{
            width: '280px',
            height: '200px',
            borderRadius: '15px',
            objectFit: 'cover',
            marginLeft: '-80px',
            position: 'relative',
            zIndex: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        />
        <img
          src="/img3.png"
          alt="Opportunities Applied"
          style={{
            width: '280px',
            height: '200px',
            borderRadius: '15px',
            objectFit: 'cover',
            marginLeft: '-80px',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        />
      </div>
    </section>
  );
};

export default Stats;
