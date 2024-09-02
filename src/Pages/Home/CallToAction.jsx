import React from 'react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/images/happy-pet.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
        {/* Headline */}
        <h1 className="text-5xl font-bold mb-4">Give Them a Forever Home</h1>

        {/* Subheadline */}
        <p className="text-xl mb-8">Every pet deserves a loving family. Adopt today and make a difference.</p>

        {/* Buttons */}
        <div className="flex space-x-4">
          <Link to='/petlisting'>
          <button className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition">
            Adopt a Pet
          </button>
          </Link>
          <button className="bg-transparent border-2 border-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-500 hover:text-black transition">
            Learn More
          </button>
        </div>

        {/* Inspirational Images */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg overflow-hidden">
            <img src="https://i.ibb.co/n0TmwKf/images.jpg" alt="" className="w-full h-48 object-cover"/>
            <p className="text-sm mt-2">From Shelter to Home</p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src="https://i.ibb.co/6yg7FRW/MV5-BN2-Rl-Nz-Bh-NDkt-Ym-Jh-NC00-YTEz-LTg0-Nm-Ut-YWNl-Njk2-YTZm-NTMw-Xk-Ey-Xk-Fqc-Gde-QXVy-ODk4-NTI4.jpg" alt="" className="w-full h-48 object-cover"/>
            <p className="text-sm mt-2">A New Beginning</p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img src="https://i.ibb.co/5c1FRQz/777-charlie-1654847954789-1654856251124.jpg" alt="" className="w-full h-48 object-cover"/>
            <p className="text-sm mt-2">A Happy Ending</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
