import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import SignupModal from "./SignupModal";
import { supabase } from "../lib/supabase";

const CTASection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCount, setCurrentCount] = useState(43);

  useEffect(() => {
    fetchCurrentCount();
  }, []);

  const fetchCurrentCount = async () => {
    try {
      const { data, error } = await supabase
        .from('densoftsignupcounter')
        .select('current_count')
        .eq('id', 1)
        .single();

      if (error) throw error;
      if (data) setCurrentCount(data.current_count);
    } catch (err) {
      console.error('Error fetching count:', err);
    }
  };

  return (
    <>
      <div id="cta-section" className="w-full bg-body-bg py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
          <div className="flex flex-col items-center text-center">
            
            {/* CTA Heading */}
            <h2 className="font-playfair text-5xl md:text-6xl font-semibold leading-tight mb-6">
              Don't Become a Member...
            </h2>
            <h3 className="font-playfair text-2xl md:text-3xl text-gray-600 mb-6">
              If You're 100% Sure Your Dental Practice Is Bulletproof
            </h3>
            
            {/* Subheading */}
            <p className="text-lg text-gray-700 mb-4 max-w-2xl">
              But if you're tired of watching competitors with worse skills outrank you on Google? It's time to fix that.
            </p>
            
            <p className="text-lg text-gray-700 mb-8 max-w-2xl">
              <strong>The good news:</strong> You're one of the first 100 dentists to see this. <strong>
                <br />
                Early members save 50% forever.</strong>
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="crafty-button group mb-4"
            >
              <span className="font-semibold">Become a Founding Member</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <p className="text-sm text-gray-600">
              Launching January 20, 2026
            </p>
          </div>
        </div>
      </div>

      {/* Modal */}
      <SignupModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchCurrentCount(); // Refresh count when modal closes
        }} 
      />
    </>
  );
};

export default CTASection;