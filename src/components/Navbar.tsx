import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track scroll position to add background opacity when scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Scroll to CTA section
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu if open
  };

  return (
    <nav 
      className={`py-4 px-4 md:px-10 lg:px-16 fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-body-bg/95 backdrop-blur-sm shadow-sm" : "bg-body-bg/80"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-black font-playfair">Densoft</div>
          </div>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </div> */}

          {/* Right side with buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <button 
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Login
            </button> */}
            <button onClick={scrollToCTA} className="crafty-button group">
              <span className="font-semibold">Get 50% Off Forever</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu - slide-in sidebar from the right side - FULL HEIGHT */}
      {/* {isMenuOpen && (
        <div className="md:hidden fixed inset-0 right-0 z-50 w-[280px] bg-white shadow-lg ml-auto">
          <div className="flex justify-end p-4">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col space-y-6 px-6 pt-4">
            <button onClick={scrollToCTA} className="crafty-button group">
              <span className="font-semibold">Get 50% Off Forever</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      )} */}
      
      {/* Overlay that appears behind the sidebar */}
      {/* {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden" 
          onClick={toggleMenu}
        />
      )} */}
    </nav>
  );
};

// Commented out NavLinks
// const NavLinks = () => (
//   <>
//     <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
//       Product
//     </a>
//     <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
//       Community
//     </a>
//     <a href="#" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
//       Pricing
//     </a>
//     <Link to="/game" className="text-gray-700 font-medium hover:text-gray-900 transition-colors">
//       Play Game
//     </Link>
//   </>
// );

// Commented out MobileNavLinks
// const MobileNavLinks = () => (
//   <>
//     <a href="#" className="text-gray-700 py-2 font-medium">
//       Product
//     </a>
//     <a href="#" className="text-gray-700 py-2 font-medium">
//       Community
//     </a>
//     <a href="#" className="text-gray-700 py-2 font-medium">
//       Pricing
//     </a>
//     <Link to="/game" className="text-gray-700 py-2 font-medium">
//       Play Game
//     </Link>
//     <a href="#" className="text-gray-700 py-2 font-medium">
//       Login
//     </a>
//   </>
// );

export default Navbar;