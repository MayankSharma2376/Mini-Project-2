import React from 'react';

// Data for the stats and images to keep the component DRY
const statsData = [
  { value: '250+', label: 'Total Pickups Completed' },
  { value: '631kg', label: 'Waste Collected' },
  { value: '8', label: 'Opportunities Applied' },
];

const imageData = [
  { src: 'img1.png', alt: 'People sorting recycling', zIndex: 'z-30' },
  { src: 'img2.png', alt: 'Bags of collected waste', zIndex: 'z-20' },
  { src: 'img3.png', alt: 'Community cleanup event', zIndex: 'z-10' },
];

const Stats = () => {
  return (
    <section className="bg-[#e5e5dc] py-16 sm:py-20 text-[#1b4332]">
      <div className="container mx-auto px-4">
        {/* Stats Row */}
        <div className="flex flex-wrap justify-around gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="text-4xl md:text-5xl font-bold mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium max-w-[200px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Images Row with Overlap */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center">
          {imageData.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`
                w-64 h-48 md:w-72 md:h-52  /* Responsive sizing */
                rounded-2xl object-cover relative /* Basic styling */
                shadow-[0_4px_12px_rgba(0,0,0,0.4)] /* Custom shadow */
                ${image.zIndex} /* Z-index for layering */
                ${index > 0 ? '-mt-16 md:mt-0 md:-ml-20' : ''} /* Responsive overlap logic */
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;