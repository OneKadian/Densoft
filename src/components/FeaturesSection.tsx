import React, { useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const FeaturesSection = () => {
  // refs for each section
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  // scroll handler
  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // scroll to CTA section
  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-body-bg">
{/* 1️⃣ Feature One */}
<section
        id="feature-1"
        ref={section1Ref}
        className="min-h-screen flex items-center py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:order-1">
              <div className="p-2 flex justify-center md:justify-start">
                <img
                  src="/lovable-uploads/dentistpic.png"
                  alt="Get more reviews on autopilot"
                  className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pl-10 lg:pl-16 md:order-2">
              <div className="mb-2 text-[#8B4513] font-medium uppercase tracking-wide">
                YOUR BIGGEST PROBLEM
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Your Patients Love You. Google Doesn't Know It Yet.
              </h2>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Imagine having 2,000+ glowing reviews without begging patients or chasing them down. Our system asks at the perfect moment, makes it stupid-simple, and handles everything for you.
              </p>
              <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                Just imagine—next time someone searches for a dentist, YOUR practice shows up first. With a wall of five-star reviews.
              </p>
              <button
                onClick={scrollToCTA}
                className="crafty-button group"
              >
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Feature Two */}
      <section
        ref={section2Ref}
        className="min-h-screen flex items-center py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Right - Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:order-2">
              <div className="p-2 flex justify-center">
                <img
                  src="/lovable-uploads/dentistpic2.png"
                  alt="AI-powered review analysis"
                  className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Left - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pr-10 lg:pr-16 md:order-1">
              <div className="mb-2 text-[#8B4513] font-medium uppercase tracking-wide">
                STOP GUESSING
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Your Reviews Are Telling You Something. Are You Listening?
              </h2>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Before you make up your mind about what's wrong with your practice, let's look at what your patients are <em>actually</em> saying.
              </p>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Our AI reads every review from Google, Facebook, Yelp, Healthgrades, and 50+ other sites—then tells you:
              </p>
              <div className="space-y-3 mb-6 max-w-lg mx-auto md:mx-0 text-left">
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>What patients love most</strong> (do more of this)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>What's driving them away</strong> (fix this first)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>The exact words they use</strong> (goldmine for your marketing)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>AI-powered replies</strong> that sound like you (one click, done)</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                Stop logging into 12 different platforms. One dashboard. Real-time insights. No guesswork.
              </p>
              <button
                onClick={scrollToCTA}
                className="crafty-button group"
              >
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ Feature Three */}
      <section
        ref={section3Ref}
        className="min-h-screen flex items-center py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:order-1">
              <div className="p-2 flex justify-center md:justify-start">
                <img
                  src="/lovable-uploads/dentistpic3.png"
                  alt="Video testimonials made easy"
                  className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pl-10 lg:pl-16 md:order-2">
              <div className="mb-2 text-[#8B4513] font-medium uppercase tracking-wide">
                BUILD TRUST INSTANTLY
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                People Book Appointments With Faces, Not Stars
              </h2>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Here's the thing: text reviews are great. But a smiling patient saying "Dr. Sarah changed my life"? That's <em>money</em>.
              </p>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                We handle everything:
              </p>
              <div className="space-y-3 mb-6 max-w-lg mx-auto md:mx-0 text-left">
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Record & host videos</strong> (patients approve with one click—fully permission-based)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Embed on your website</strong> (no designer needed)</span>
                </div>
                <div className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700"><strong>Boost your SEO</strong> with fresh, authentic content Google loves</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                The good news is: you don't lift a finger. We make it embarrassingly easy.
              </p>
              <button
                onClick={scrollToCTA}
                className="crafty-button group"
              >
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4️⃣ Feature Four */}
      <section
        ref={section4Ref}
        className="min-h-screen flex items-center py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Right - Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:order-2">
              <div className="p-2 flex justify-center">
                <img
                  src="/lovable-uploads/dentistpic4.png"
                  alt="Smart review filtering"
                  className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Left - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pr-10 lg:pr-16 md:order-1">
              <div className="mb-2 text-[#8B4513] font-medium uppercase tracking-wide">
                SMART FILTERING
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                What If You Could Stop Bad Reviews Before They Happen?
              </h2>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                You have three options when a patient isn't thrilled:
              </p>
              <div className="space-y-3 mb-6 max-w-lg mx-auto md:mx-0 text-left">
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3 font-semibold">1.</span>
                  <span className="text-gray-700">Hope they don't leave a review (risky)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3 font-semibold">2.</span>
                  <span className="text-gray-700">Let them trash you on Google (ouch)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3 font-semibold">3.</span>
                  <span className="text-gray-700">Use our system that detects unhappy patients and gives you a chance to make it right BEFORE they go public</span>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                We automatically send happy patients to Google. Unhappy ones? We route them to you privately so you can fix it.
              </p>
              <p className="text-lg text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                If you decide to give this a try, then I promise—you'll never worry about a one-star review tanking your reputation again.
              </p>
              <button
                onClick={scrollToCTA}
                className="crafty-button group"
              >
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5️⃣ Feature Five */}
      <section
        ref={section5Ref}
        className="min-h-screen flex items-center py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-16 w-full">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left - Image */}
            <div className="w-full md:w-1/2 mb-10 md:mb-0 md:order-1">
              <div className="p-2 flex justify-center md:justify-start">
                <img
                  src="/lovable-uploads/dentist.gif"
                  alt="Personalized video messages"
                  className="w-[90%] h-auto object-contain rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right - Text */}
            <div className="w-full md:w-1/2 text-center md:text-left md:pl-10 lg:pl-16 md:order-2">
              <div className="mb-2 text-[#8B4513] font-medium uppercase tracking-wide">
                AUTOMATION THAT FEELS HUMAN
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
                Hey Sarah, Hey Mike, Hey Thomas... (They'll Never Know It's Automated)
              </h2>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Just imagine: your patients getting a personal video message from YOU, with their name in it. They feel special. They leave a review. You did nothing.
              </p>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                Record one 30-second clip. We personalize it for every patient with their name—video, email subject line, everything. It's like having a marketing assistant who never sleeps.
              </p>
              <p className="text-lg text-gray-700 mb-4 max-w-lg mx-auto md:mx-0">
                As I see it, you can either:
              </p>
              <div className="space-y-3 mb-8 max-w-lg mx-auto md:mx-0 text-left">
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3">•</span>
                  <span className="text-gray-700">Keep manually texting patients for reviews (exhausting)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3">•</span>
                  <span className="text-gray-700">Pay someone to chase them down (expensive)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-700 mr-3">•</span>
                  <span className="text-gray-700">Let us handle it while you see patients (genius)</span>
                </div>
              </div>
              <button
                onClick={scrollToCTA}
                className="crafty-button group"
              >
                <span className="font-semibold">Lock In 50% Off For Life</span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesSection;