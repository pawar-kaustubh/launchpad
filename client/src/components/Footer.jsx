import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Add this import at the top of Footer.jsx


export default function Footer() {

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  

  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-950/90 border-t border-gray-700 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-3 mb-4">
                <svg
                  className="w-10 h-10 text-blue-400"
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
                <span className="text-3xl font-display font-bold text-white">
                  LaunchPad
                </span>
              </div>
              <p className="text-gray-500 font-body">
                Empowering the future of startups
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-display font-semibold mb-4 text-white">
                For Startups
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Raise Funds
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Pitch Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Mentorship
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-display font-semibold mb-4 text-white">
                For Investors
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Explore Startups
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Deal Flow
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Due Diligence
                  </Link>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-lg font-display font-semibold mb-4 text-white">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="./About"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-400 hover:text-blue-400 transition font-body"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <p className="text-gray-500 mb-4 md:mb-0 font-body">
              © 2025 LaunchPad. All rights reserved.
            </p>
            <div className="flex space-x-5">
              <Link
                to="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </Link>
              <Link
                to="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-7 h-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
