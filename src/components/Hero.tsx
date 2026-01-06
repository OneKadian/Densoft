import React, { useState } from "react";
import { supabase } from '../lib/supabase';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [currentCount, setCurrentCount] = useState(43);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email) {
      setError('Email is required');
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: counterData, error: counterError } = await supabase
        .from('densoftsignupcounter')
        .select('current_count')
        .eq('id', 1)
        .single();

      if (counterError) throw counterError;

      const newCount = counterData.current_count + 1;

      const { error: updateError } = await supabase
        .from('densoftsignupcounter')
        .update({ current_count: newCount })
        .eq('id', 1);

      if (updateError) throw updateError;

      const { error: insertError } = await supabase
        .from('densoftsignups')
        .insert([
          {
            email: email.toLowerCase().trim(),
            signup_number: newCount,
          },
        ]);

      if (insertError) {
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
          setIsSubmitting(false);
          return;
        }
        throw insertError;
      }

      setCurrentCount(newCount);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Error submitting signup:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-body-bg pt-4 pb-10 md:py-12 min-h-screen md:min-h-[92vh] flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center">
          {/* Mobile: Image at top */}
          <div className="w-full md:hidden mb-4">
            <img
              src="/lovable-uploads/heroDentist.png"
              alt="Feature showcase"
              className="w-[85%] md:w-[90%] mx-auto h-auto object-contain rounded-2xl shadow-2xl"
            />
          </div>

          {/* Left side with content */}
          <div className="w-full md:w-1/2 text-left md:pr-10 lg:pr-16">
            <h1 className="font-playfair text-3xl md:text-5xl font-semibold leading-tight text-center md:text-left mb-4 md:mb-8">
              Rank #1 When Patients Search 'Best Dentist Near Me'
            </h1>
            
            <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-lg text-center md:text-left">
              We get you more reviews, optimize your profile, and make you the go-to choice in your area, all on autopilot.
            </p>
            
            {/* Email signup form */}
            {!success ? (
              <div className="max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dr.smith@smiledental.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-left"
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg text-left">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#ff3d00',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e63900'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff3d00'}
                  >
                    {isSubmitting ? 'Saving Your Spot...' : 'Save My Spot'}
                  </button>
                </form>
                <div className="text-xs mt-2 text-gray-700 text-center md:text-left">
                  Lock in 50% off for life • Launching January 20, 2026
                </div>
              </div>
            ) : (
              <div className="max-w-md bg-green-50 border border-green-200 rounded-lg p-6 text-left">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="font-playfair text-xl font-bold mb-2">
                  You're In!
                </h3>
                <p className="text-gray-600 text-sm">
                  We'll reach out with exclusive updates as we build. Keep an eye on your inbox!
                </p>
              </div>
            )}
          </div>
          
          {/* Desktop: Single image on right */}
          <div className="hidden md:block w-1/2 mt-10 md:mt-0">
            <div className="p-2 flex justify-center">
              <img
                src="/lovable-uploads/heroDentist.png"
                alt="Feature showcase"
                className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;