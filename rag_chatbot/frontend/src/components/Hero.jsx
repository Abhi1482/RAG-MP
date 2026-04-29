import React from 'react';

const Hero = ({ onExplore }) => {
  const handleExplore = () => {
    if (onExplore) {
      onExplore();
    } else {
      const linksSection = document.getElementById('important-links');
      if (linksSection) {
        linksSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"
        }}
      >
        <span id="blackOverlay" className="w-full h-full absolute opacity-70 bg-black"></span>
      </div>
      
      {/* Content */}
      <div className="container relative mx-auto px-4 z-10">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
            <h1 className="text-white font-bold text-5xl md:text-6xl drop-shadow-lg">
              Welcome to Chandigarh University
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow">
              Empowering students with knowledge and innovation for a better tomorrow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="https://cucet.cuchd.in/"
                target="_blank" rel="noopener noreferrer"
                className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
              >
                Apply Now
              </a>
              <button 
                onClick={handleExplore}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-full shadow-lg border border-white/30 transition-transform transform hover:-translate-y-1"
              >
                Explore Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
