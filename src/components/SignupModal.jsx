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
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchCurrentCount();
      
      // Preload images
      const images = [
        '/lovable-uploads/saaspicmobile.png',
        '/lovable-uploads/saaspic.png'
      ];
      
      let loadedCount = 0;
      const totalImages = images.length;
      
      images.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true); // Show modal even if images fail
          }
        };
        img.src = src;
      });
    } else {
      setImagesLoaded(false); // Reset when modal closes
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
      {/* Black overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={handleClose}
      />

      {/* Loading state - show while images load */}
      {!imagesLoaded && (
        <div className="relative z-10 text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* MODAL CONTAINER - Only show when images are loaded */}
      <div 
        className={`relative w-full h-full md:w-[80%] md:h-[90%] md:rounded-2xl overflow-hidden shadow-2xl transition-opacity duration-300 ${
          imagesLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        
        {/* BLURRED BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 md:hidden"
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

        {/* WHITE CONTENT BOX */}
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
                <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-3 text-center">
                  Join The First 100 Founding Members
                </h2>

                <p className="text-gray-600 mb-6 text-center">
                  🎁 Lock in 50% off for life • Launching January 1, 2026
                </p>

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