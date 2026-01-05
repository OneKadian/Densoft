import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Array of images for the slideshow
  const images = [
    "/lovable-uploads/dentistpic.png",
    "/lovable-uploads/dentistpic2.png",
    "/lovable-uploads/dentistpic3.png",
    "/lovable-uploads/dentistpic4.png",
    "/lovable-uploads/dentist.gif"
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Scroll to CTA section
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-body-bg pt-8 pb-10 md:py-12 min-h-[92vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Mobile: Image at top */}
          <div className="w-full md:hidden mb-6">
            <img
              src="/lovable-uploads/dentistpic.png"
              alt="Feature showcase"
              className="w-full mx-auto h-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Left side with content */}
          <div className="w-full md:w-1/2 text-center md:text-left md:pr-10 lg:pr-16">
            <h1 className="font-playfair text-5xl md:text-5xl font-semibold leading-tight mb-6 md:mb-8">
              From 100 Reviews to 2,000+ Reviews (While You Focus on Patients)
            </h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
              You're a great dentist. But when someone Googles "best dentist near me," they see your competitor with 10x more reviews. We fix that—automatically.
            </p>
            
            {/* CTA button below subheading */}
            <div className="flex flex-col items-center w-fit mx-auto md:mx-0">
              <button onClick={scrollToCTA} className="crafty-button group whitespace-nowrap">
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              <div className="text-xs mt-2 text-gray-700 text-center">No signup • No credit card</div>
            </div>
          </div>
          
          {/* Desktop: Slideshow on right */}
          <div className="hidden md:block w-1/2 mt-10 md:mt-0">
            <div className="p-2 flex justify-center relative">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Feature showcase ${index + 1}`}
                  className={`w-[90%] h-auto object-contain rounded-2xl shadow-2xl absolute top-0 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    position: index === 0 ? 'relative' : 'absolute'
                  }}
                />
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? 'bg-[#8B4513] w-6' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;