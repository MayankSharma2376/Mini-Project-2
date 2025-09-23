import React from 'react';

// Data for the service cards to keep the component DRY and easy to update
const servicesData = [
  {
    imgSrc: '/service1.jpg',
    imgAlt: 'Service 1',
    title: 'Heading 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    imgSrc: '/service2.jpg',
    imgAlt: 'Service 2',
    title: 'Heading 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
  {
    imgSrc: '/service3.jpg',
    imgAlt: 'Service 3',
    title: 'Heading 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
  },
];

const Services = () => {
  return (
    <section className="bg-[#1a4d2c] text-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold uppercase mb-12 md:mb-16 text-[#f5f5dc]">
          Our Services
        </h2>
        
        {/* Responsive Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-[#f5f5dc] text-[#1a4d2c] p-8 rounded-2xl text-center transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={service.imgSrc}
                alt={service.imgAlt}
                className="w-full h-52 object-cover rounded-xl mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-800 text-base leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call-to-Action Button */}
        <button
          className="bg-[#a8e6cf] text-[#1a4d2c] font-semibold text-lg py-4 px-10 rounded-full transition-all duration-300 ease-in-out transform hover:bg-white hover:-translate-y-1 hover:shadow-lg"
        >
          All Services
        </button>
      </div>
    </section>
  );
};

export default Services;
