import React, { useState, useEffect } from "react";

const Navbar = () => {
  // We need to know if the user has scrolled down
  const [hasScrolled, setHasScrolled] = useState(false);

  // This will run only once when the component appears
  useEffect(() => {
    console.log(window.scrollY);
    // Function to check if the user has scrolled
    const handleScroll = () => {
      // If the user has scrolled more than 50 pixels down, mark as scrolled
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    // Listen for the 'scroll' event on the window
    window.addEventListener("scroll", handleScroll);

    // Clean up: when the component goes away, stop listening for scrolls
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty array means run only on mount and unmount

  return (
    // The main navigation bar
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-slate-50 shadow text-slate-800" // When scrolled: light background, shadow, dark text
          : "bg-slate-900 text-white" // When at top: dark background, white text
      } py-6`} // Add some vertical space (padding)
    >
      {/* Container for the navbar content, keeps it centered */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  flex items-center justify-between">
        {/* Left side: Company Name */}
        <div
          className={`font-bold text-xl ${
            hasScrolled ? "text-slate-800" : "text-white"
          }`}
        >
          Launch
          <span className={`${hasScrolled ? "text-slate-800" : "text-indi"}`}>
            Pad
          </span>
        </div>

        {/* Middle: Creative links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <span className="relative group">
            Raise{" "}
            <span
              className={`absolute -bottom-1 left-0  w-full h-0.5 ${
                hasScrolled ? "bg-indigo-500" : "bg-indigo-300"
              } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></span>{" "}
            Funds
          </span>
          <span className="relative group">
            Explore{" "}
            <span
              className={`absolute -bottom-1 left-0 w-full h-0.5 ${
                hasScrolled ? "bg-green-500" : "bg-green-300"
              } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}
            ></span>{" "}
            Startups
          </span>
        </div>

        {/* Right side: Sign Up and Login */}
        <div className="flex items-center space-x-4 text-sm font-medium">
          <a
            href="/sign-in"
            className={`hover:underline ${
              hasScrolled ? "text-slate-800" : "text-white"
            }`}
          >
            Sign In
          </a>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
