// src/components/Navbar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("startups"); // <-- Add this line
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md py-4 px-8 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-2">
        <svg
          className="w-8 h-8 text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          LaunchPad
        </span>
      </div>

      <div className="hidden md:flex space-x-8">
        <button
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === "startups"
              ? "bg-blue-600 text-white"
              : "hover:text-blue-400"
          }`}
          onClick={() => {setActiveTab("startups")
            
          }}
         
        >
          Raise Funds
        </button>
        <button
          className={`px-4 py-2 rounded-full transition-all ${
            activeTab === "investors"
              ? "bg-blue-600 text-white"
              : "hover:text-blue-400"
          }`}
          onClick={() => {
            setActiveTab("investors")
            navigate('/explorestartups')
          }}
        >
          Explore Startups
        </button>
      </div>

   
      <Link to='/profile'>
             {currentUser ? (
               <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
             ) : (
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:shadow-lg transition-all transform hover:scale-105">
              Sign In
            </button>
             )}
           </Link>
    </nav>
  );
};

export default Navbar;
