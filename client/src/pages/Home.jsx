import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LaunchPad = () => {
  const [activeTab, setActiveTab] = useState("startups");
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [startCounters, setStartCounters] = useState(false);

  const texts = ["Where Bold Ideas", "Meet Bold Investors..."];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [typingForward, setTypingForward] = useState(true);

  const testimonials = [
    {
      quote: "Ignite helped us secure $2M in seed funding within 3 months!",
      author: "Alex Chen",
      role: "Founder, TechNova",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      quote:
        "The investor matching is incredible. Found our lead investor in 2 weeks.",
      author: "Sarah Johnson",
      role: "CEO, GreenSolutions",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      quote: "From pitch to funding in record time. Ignite delivers results.",
      author: "Miguel Rodriguez",
      role: "Co-founder, HealthTrack",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const metrics = [
    { value: 149, label: "Showcase Pitches" },
    { value: 74, label: "Get Mentor Feedback" },
    { value: 14, label: "Track Engagement via Dashboards" },
  ];

  // Scroll reveal animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (window.scrollY > 600) {
        setStartCounters(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const typeText = () => {
      const currentText = texts[currentTextIndex];

      if (typingForward) {
        if (typedText.length < currentText.length) {
          setTypedText(currentText.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setTypingForward(false), 2000);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(typedText.substring(0, typedText.length - 1));
        } else {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setTypingForward(true);
        }
      }
    };

    const timer = setTimeout(typeText, typingForward ? 100 : 50);
    return () => clearTimeout(timer);
  }, [typedText, typingForward, currentTextIndex]);

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Slide every 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const Counter = ({ target, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const startTime = useRef(null);

    useEffect(() => {
      if (!startCounters) return;

      const animateCount = (timestamp) => {
        if (!startTime.current) startTime.current = timestamp;
        const progress = Math.min(
          (timestamp - startTime.current) / (duration * 1000),
          1
        );
        setCount(Math.floor(progress * target));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };

      requestAnimationFrame(animateCount);
    }, [startCounters, target, duration]);

    return (
      <span className="text-5xl font-display">{count.toLocaleString()}+</span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-white overflow-x-hidden font-sans">
      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-blue-400/40 to-purple-500/30 blur-[100px]"
          style={{
            width: "200px",
            height: "200px",
            x: mousePos.x,
            y: mousePos.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ scale: isHovering ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="absolute rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/20 blur-[120px]"
          style={{
            width: "300px",
            height: "300px",
            x: mousePos.x,
            y: mousePos.y,
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{ scale: isHovering ? 1.3 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-6xl md:text-8xl font-display font-extrabold mb-8 leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {typedText}
            <span className="animate-pulse text-white">|</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-3xl mx-auto font-body">
            Ignite empowers startups and investors with innovative matchmaking
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-xl font-display font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Raise Funds</span>
              <svg
                className="w-6 h-6 ml-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.button>
            <motion.button
              className="px-10 py-5 bg-transparent border-2 border-blue-400 rounded-xl text-xl font-display font-semibold hover:bg-blue-900/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Startups
            </motion.button>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <svg
            className="w-10 h-10 text-blue-400 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Empower Your <span className="text-white">Pitch</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-body">
              Everything you need to create, refine, and present winning pitches
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[
              {
                icon: (
                  <svg
                    className="w-14 h-14 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                ),
                title: "Pitch Creation Suite",
                description:
                  "AI-powered tools to craft compelling pitches with real-time feedback",
              },
              {
                icon: (
                  <svg
                    className="w-14 h-14 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
                title: "Mentor Matching",
                description:
                  "Connect with industry experts for personalized feedback sessions",
              },
              {
                icon: (
                  <svg
                    className="w-14 h-14 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                ),
                title: "Engagement Analytics",
                description:
                  "Real-time dashboard to track investor interactions and feedback",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20"
                variants={fadeInUp}
              >
                <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4 text-center text-white">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-center font-body">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section with Sliding Animation */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Success Stories
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body">
              Real results from our community
            </p>
          </motion.div>

          <div className="relative h-[400px] overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.div
                key={currentTestimonial}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="bg-gray-900/80 backdrop-blur-md p-10 rounded-2xl max-w-4xl flex flex-col md:flex-row items-center gap-8">
                  <img
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].author}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-blue-400/20 shadow-lg"
                  />
                  <div className="text-center md:text-left">
                    <blockquote className="text-2xl italic text-gray-200 mb-6 font-body">
                      "{testimonials[currentTestimonial].quote}"
                    </blockquote>
                    <p className="font-semibold text-white font-display">
                      {testimonials[currentTestimonial].author}
                    </p>
                    <p className="text-gray-400 font-body">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-blue-500 w-6"
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-24 bg-gradient-to-br from-gray-950 to-blue-950/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              By The Numbers
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-body">
              Our impact on the startup ecosystem
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl border border-gray-800 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                variants={fadeInUp}
              >
                <h3 className="text-5xl font-display font-extrabold text-blue-400 mb-4">
                  {metric.value}+
                </h3>
                <p className="text-gray-400 text-lg font-body">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Video Section */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 text-white">
              See Ignite in Action
            </h2>
            <p className="text-xl text-gray-300 mb-8 font-body">
              Discover how we connect startups with investors in minutes
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Full Demo
            </motion.button>
          </motion.div>
          <motion.div
            className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </motion.button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Video thumbnail"
              className=" opacity-70"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-950/50 to-purple-950/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/024/107/749/original/beautiful-abstract-wave-line-technology-background-png.png')] opacity-9" />
        <motion.div
          className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
        >
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-8 text-white">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Launch
            </span>{" "}
            Your Vision?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-body">
            Join a thriving community of innovators shaping the future
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <motion.button
              className="px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl text-xl font-display font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started - Free
            </motion.button>
            <motion.button
              className="px-10 py-5 bg-transparent border-2 border-blue-400 rounded-xl text-xl font-display font-semibold hover:bg-blue-900/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </section>


      
    </div>
  );
};

export default LaunchPad;
