import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

const SignupModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [currentCount, setCurrentCount] = useState(43);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [signupNumber, setSignupNumber] = useState(null);

  // Fetch current count on mount
  useEffect(() => {
    if (isOpen) {
      fetchCurrentCount();
    }
  }, [isOpen]);

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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validation
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
      // 1. Get current count
      const { data: counterData, error: counterError } = await supabase
        .from('densoftsignupcounter')
        .select('current_count')
        .eq('id', 1)
        .single();

      if (counterError) throw counterError;

      const newCount = counterData.current_count + 1;

      // 2. Update counter
      const { error: updateError } = await supabase
        .from('densoftsignupcounter')
        .update({ current_count: newCount })
        .eq('id', 1);

      if (updateError) throw updateError;

      // 3. Insert signup
      const { error: insertError } = await supabase
        .from('densoftsignups')
        .insert([
          {
            email: email.toLowerCase().trim(),
            signup_number: newCount,
          },
        ]);

      if (insertError) {
        // Check if duplicate email
        if (insertError.code === '23505') {
          setError('This email is already on the waitlist!');
          setIsSubmitting(false);
          return;
        }
        throw insertError;
      }

      // Success!
      setCurrentCount(newCount);
      setSignupNumber(newCount);
      setSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Error submitting signup:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setSuccess(false);
    setSignupNumber(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Black overlay - click to close */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={handleClose}
      />

      {/* MODAL CONTAINER - Desktop: 80% width, 90% height | Mobile: 100% both */}
      <div className="relative w-full h-full md:w-[80%] md:h-[90%] md:rounded-2xl overflow-hidden shadow-2xl">
        
        {/* BLURRED BACKGROUND IMAGE */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/saaspicmobile.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
          }}
        />
        <div
          className="hidden md:block absolute inset-0"
          style={{
            backgroundImage: 'url(/lovable-uploads/saaspic.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(4px)',
          }}
        />

        {/* WHITE CONTENT BOX - Centered */}
        <div className="relative h-full flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 md:p-8">
            
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {!success ? (
              <>
                {/* Headline - Centered */}
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 text-center">
                  Join The First 100 Founding Members
                </h2>

                {/* Subtext - Centered */}
                <p className="text-gray-600 mb-6 text-center">
                  🎁 Lock in 50% off for life • Launching January 1, 2026
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="dr.smith@smiledental.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-center md:text-left"
                      disabled={isSubmitting}
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg text-center">
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
              </>
            ) : (
              // Success State
              <div className="text-center py-4">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-3">
                  You're In!
                </h3>
                <p className="text-gray-600 mb-6">
                  We'll reach out with exclusive updates as we build. Keep an eye on your inbox!
                </p>
                <div className="bg-blue-50 rounded-lg p-4 text-left space-y-2 text-sm mb-6">
                  <p className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                    <span>50% off for life when we launch</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                    <span>Exclusive updates as we build</span>
                  </p>
                  <p className="flex items-start">
                    <span className="text-blue-600 mr-2 flex-shrink-0">✓</span>
                    <span>Early access on January 1, 2026</span>
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;