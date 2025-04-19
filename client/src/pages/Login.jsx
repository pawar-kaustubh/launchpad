import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex flex-col items-center justify-center px-6 py-10 text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Choose Your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
          Sign In
        </span>{" "}
        Type
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        Whether you're here to invest or launch your startup, we've got a smooth
        onboarding just for you.
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-center items-center">
        {/* Investor Card */}
        <div className="bg-[#111827] border border-purple-500/30 hover:border-purple-500 transition-all rounded-2xl shadow-xl p-8 w-full md:w-1/2 hover:scale-105 transform duration-300 cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="text-purple-400 text-4xl mb-4">💼</div>
            <h2 className="text-2xl font-semibold mb-2">Sign In as Investor</h2>
            <p className="text-gray-400 mb-6">
              Discover groundbreaking startups and manage your investments all
              in one place.
            </p>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full font-semibold hover:opacity-90 transition">
              Continue as Investor
            </button>
          </div>
        </div>

        {/* Startup Card */}
        <div className="bg-[#111827] border border-blue-500/30 hover:border-blue-500 transition-all rounded-2xl shadow-xl p-8 w-full md:w-1/2 hover:scale-105 transform duration-300 cursor-pointer">
          <div className="flex flex-col items-center text-center">
            <div className="text-blue-400 text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold mb-2">Sign In as Startup</h2>
            <p className="text-gray-400 mb-6">
              Get matched with top investors and bring your ideas to life with
              our powerful tools.
            </p>
            <Link to="/startupform">
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full font-semibold hover:opacity-90 transition">
                Continue as Startup
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
