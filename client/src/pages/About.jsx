import React from 'react';
import { motion } from 'framer-motion';
import { FaBullseye, FaEye, FaHeart, FaPuzzlePiece, FaChartLine, FaHandshake, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const About = () => {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Team data
  const teamMembers = [
    { id: 1, name: 'Kaustubh Pawar', role: 'CEO & Founder', image: 'https://media-hosting.imagekit.io/693d1cf8dc6445aa/screenshot_1745125942183.png?Expires=1839733944&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=0E9oKQNy50xSe19m3P0vKmmNVPIF~jPFni13BvGgc5KiYxsrszr2TN-UozEgk1ejC7QC1CWyZruGfK94Ma-NqmTslRlmlRK7Bs8uMlmqIEj7FbTADwG-uBWjABI1i4DMouTSuUCsUp6kq-AtA43BApWayEwn8K4B1tGZTF1ujaHHhI2TzIzwcUBPT317yNmWgM~TAlfxG9UTGy-sdly2YCaOnjPPBzFSrjJ~~~cGUx~L7A5H-aN~a2OyN0gWr3wn5kS0ORyqrpbvplSm9Voxos-OCFMhihFqdmhZcQdli0M4pR1SfcO3QmoV6UfuHO4xU8nB6oq6syjB0TRLGDrklA__' },
    { id: 2, name: 'Ganesh Najan', role: 'Creative Director', image: 'https://media-hosting.imagekit.io/3c2ed916f4134839/WhatsApp%20Image%202025-04-20%20at%2010.07.25%20AM.jpeg?Expires=1839733864&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=RicbBlFyccKXM27Kr5eU-da6RG7mjb6EmcomrB~fu3xCx2nH6cg~yTiZ-Ujp2QgCkSR7HA70LG0nKpP9QgQ6mjxwyQkJ7YBLElBywJao3mZAeV3B-E4B-oLM~rz1xjRHAGqiheaLO-ObAhQqBdWq5aXoTbcBcJpFiSfe8w5wcZiCLh5P7h0e0W~rNOI1G207HsdBKOLDNkGsvc3WoE5Ytn5IQM4hJeQQ-jVYaBKS3iUANptJW8G4-r-PoNp2NQWWzSK3aegVZ6TGhoZR~KrxgfpdirpJoU52nQRsKYscAGJWp76rR5DDHE~MUhiJWkN~IO77VHPulF2PsF0SGAEJ7Q__' },
    { id: 3, name: 'Amey Gawade', role: 'CTO', image: 'https://media-hosting.imagekit.io/9a7fab2461d74a5a/amey.jpg?Expires=1839734224&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Axi97BnZj6URmFp4Qm-AG-O6BFtH-iXFNWpQ~CLWedSnvfhz82EZI3ZONmPPqcggNuNk05BR4m6xHJAR-AjZk21u-vS4jSLmQcdwrO9Z2wehhJ7wvdu3Fm~KhI-6H2Zq7GsT4dkGs3fQ-sl0xJB92Cx2fI7o~5v~DBcztpLqk6ISBnRp86s~BKXKacjMeGBxe8xfH1o2LIEZYR9yD7b5AVZkt51W4nqEM~CXKjDOsCG0OtPBGoQptu4n7tpH4d2HcKla~gvDx16ebit7mCzseMabRyjMJv8fyJ9ycZWOjSPx9gojKPfc2f4iurivH6tHAO00~PnqUNrHhHzCzbLElw__' },
    { id: 4, name: 'Kalpesh Patil', role: 'COO', image: 'https://media-hosting.imagekit.io/6d9cc68c7ff944c7/09c84236-9a24-4d8e-9fbb-5c2d61df1d66.jpg?Expires=1839734835&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1W6HEAVeD5RBUWHKnXT4DYushDpkZ80aELDvt8iAl8SMiJapq4maq0VuNK8JBZKMMwHG6cYpg1sjZGAmGLdm~hcdnmj3Y-3hkUPdJ67GoYkDBMenNGaVumP-J5W6krcqyoj353gSrlf6HG~ayscn8WfWq6bCoyHzLb4-Nmoo-E0WRB4Go1WwSHB4WrEdPIi8r7BJ7wEo2NCgBlbOyHJ-62U-a1KtUh11LMfyix0yc4lMbDrDXccfHY6K4jc6k2Umo0F7jl6K0-DiynnjzsqM5J1jXGsUcBrCw6SsyRmpp3-H9hGMaAhX8McZLluCpLj1sUggU881xOjUCjrks2h5DQ__' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-gray-100">
      

      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-900/70 to-purple-900/70 text-white py-24 px-4 text-center relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 font-display"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            About <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Us</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 font-body"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            The visionaries powering tomorrow's innovations today
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Our Story */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Story
          </h2>
          <div className="bg-gray-900/70 backdrop-blur-md p-8 md:p-10 rounded-2xl border border-gray-800 shadow-lg">
            <p className="text-lg md:text-xl text-gray-300 mb-6 font-body">
              Welcome to <span className="font-semibold text-blue-400">LaunchPad</span>—where bold ideas meet visionary investors. 
              Founded in 2020, we began as a passionate team determined to bridge the gap between innovation and capital.
            </p>
            <p className="text-lg md:text-xl text-gray-300 font-body">
              Today, we've become the launch platform of choice for startups worldwide, but our core mission remains unchanged: 
              to accelerate the future by connecting groundbreaking ideas with the resources they need to thrive.
            </p>
          </div>
        </motion.section>

        {/* Mission/Vision/Values */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Core
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaBullseye className="text-3xl text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Mission</h3>
              <p className="text-gray-400 font-body">To democratize access to capital and empower visionary founders</p>
            </motion.div>

            {/* Vision */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 text-center"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FaEye className="text-3xl text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Vision</h3>
              <p className="text-gray-400 font-body">A world where every great idea gets its chance to change the world</p>
            </motion.div>

            {/* Values */}
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaHeart className="text-3xl text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Values</h3>
              <ul className="space-y-3 text-gray-400 font-body">
                <li>Radical Transparency</li>
                <li>Founder-First Mentality</li>
                <li>Data-Driven Decisions</li>
                <li>Community Impact</li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Us */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Why Partner With Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
              variants={fadeInUp}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaPuzzlePiece className="text-3xl text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Strategic Fit</h3>
              <p className="text-gray-400 font-body">We match you with investors who align with your vision and values</p>
            </motion.div>

            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 text-center"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-purple-900/30 rounded-full flex items-center justify-center">
                  <FaChartLine className="text-3xl text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Proven Results</h3>
              <p className="text-gray-400 font-body">$500M+ raised across our portfolio companies</p>
            </motion.div>

            <motion.div 
              className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 text-center"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center">
                  <FaHandshake className="text-3xl text-blue-400" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white font-display">Lifetime Support</h3>
              <p className="text-gray-400 font-body">We're partners for your entire entrepreneurial journey</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section 
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Visionaries
          </h2>
          <p className="text-center mb-12 text-xl text-gray-400 max-w-2xl mx-auto font-body">
            A world-class team of investors, operators, and technologists
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="bg-gray-900/70 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-white mb-2 font-display">{member.name}</h3>
                  <p className="text-blue-400 font-body">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="bg-gradient-to-r from-blue-900/80 to-purple-900/80 text-white rounded-2xl p-12 text-center border border-gray-800 shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">Ready to Launch?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-body">
              Whether you're building or investing, we'll help you reach new heights
            </p>
            <motion.a 
              href="/contact" 
              className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition duration-300 font-display"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect With Us
            </motion.a>
            <div className="flex justify-center mt-10 space-x-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;