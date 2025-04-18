// src/pages/Home.jsx
import NavbarComponent from '../components/Navbar';
import { useState, useEffect } from 'react';

const Home = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const typingSpeed = 150; // Speed of typing (ms per character)
  const deletingSpeed = 100; // Speed of deleting (ms per character)
  const pauseDuration = 2000; // Pause between cycles (ms)

  const phrases = [
    'Pitch to Mentors',
    'Launch Your Startup Dreams',
    'Connect with Investors',
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[textIndex];
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % phrases.length);
        }
      }
    };

    const timer = setInterval(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearInterval(timer);
  }, [charIndex, isDeleting, textIndex, phrases]);

  return (
    <>
      <NavbarComponent />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="text-center lg:text-left lg:pl-12 -ml-35 mt-20" >
            <div className="mb-6 ">
              <h2 className="text-4xl md:text-5xl font-serif text-white animate-pulse">
                {displayText}
                <span className="animate-blink">|</span>
              </h2>
            </div>
            <p className="text-2xl md:text-2xl mb-6 max-w-prose mx-auto lg:mx-0">
              Ready to Take Your Startup to the Next Level?
            </p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-200">
              Get Started for Free
            </button>
          </div>
          <div className="hidden lg:block mt-12">
            {/* Context-relevant image */}
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Startup team meeting with investors"
              className="h-64 w-full object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        {/* Wave Transition */}
        <div className="absolute bottom-0 w-full h-16 bg-white clip-path-wave"></div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose LaunchPad?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We provide all the tools startups need to create compelling pitches and connect with the right investors.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Mentor Feedback</h3>
              <p className="text-gray-600">Get insights from experts who’ve been where you are.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Engagement Analytics</h3>
              <p className="text-gray-600">Track investor interactions and optimize your pitch.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-200 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Investor Matching</h3>
              <p className="text-gray-600">Connect with investors interested in your industry.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Trusted by Startups
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <blockquote className="italic text-gray-700">"LaunchPad transformed our pitch and helped us secure funding!"</blockquote>
              <p className="mt-2 text-right font-semibold text-gray-800">- Alex, Founder</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
              <blockquote className="italic text-gray-700">"The mentor feedback was invaluable for our growth."</blockquote>
              <p className="mt-2 text-right font-semibold text-gray-800">- Sarah, Startup CEO</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-600">Startups</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">250+</h3>
            <p className="text-gray-600">Investors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">$50M+</h3>
            <p className="text-gray-600">Funds Raised</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">35+</h3>
            <p className="text-gray-600">Countries</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Startup to the Next Level?</h2>
          <p className="text-lg mb-6 max-w-prose mx-auto">
            Join hundreds of startups who’ve found their perfect investors through LaunchPad.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-100 transition duration-200">
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Connecting promising startups with the right investors since 2020.</h3>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Create a Pitch</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Find Investors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Startup Resources</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Browse Startups</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Investment Opportunities</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Due Diligence Tools</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Portfolio Management</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">About Us</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex justify-between items-center flex-col sm:flex-row">
            <p className="text-sm">© 2025 LaunchPad. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 2.87 8.16 6.84 9.47.5.09.68-.22.68-.48 0-.24-.01-1.01-.01-1.85-2.79.6-3.38-1.34-3.38-1.34-.46-1.16-1.12-1.47-1.12-1.47-.91-.62.07-.61.07-.61 1.01.07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33s1.7.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.41-.01 2.74 0 .27.18.58.69.48C19.13 20.16 22 16.41 22 12c0-5.52-4.48-10-10-10z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;