import { useState, useEffect, useRef, Component } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Navbar from "../components/Navbar";

// ======================
// Error Boundary Component
// ======================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("3D Viewer Error:", error);
  }

  render() {
    return this.state.hasError ? (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
        <p className="text-white">3D visualization unavailable</p>
      </div>
    ) : (
      this.props.children
    );
  }
}



// ======================
// 3D Model Component
// ======================
function FloatingStartupModel() {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/low-poly-sphere/model.glb"
  );

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
      group.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
    }
  });

  if (!nodes || !materials) return null;

  return (
    <group ref={group} dispose={null}>
      <mesh geometry={nodes.Sphere.geometry} material={materials.Material} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </group>
  );
}

// ======================
// Main Component
// ======================
const LaunchPad = () => {
  // State management
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
      quote: "LaunchPad helped us secure $2M in seed funding within 3 months!",
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
      quote:
        "From pitch to funding in record time. LaunchPad delivers results.",
      author: "Miguel Rodriguez",
      role: "Co-founder, HealthTrack",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    },
  ];

  const metrics = [
    { value: 500, label: "Startups" },
    { value: 250, label: "Investors" },
    { value: 50, label: "Funds Raised ($M)" },
    { value: 35, label: "Countries" },
  ];

  // Animation effects
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
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
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

  // Testimonial auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Counter component
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

    return <span>{count.toLocaleString()}+</span>;
  };

  // Inject styles
  useEffect(() => {
    const styles = `
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .animate-float { animation: float 5s infinite ease-in-out; }
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      .animate-bounce { animation: bounce 2s infinite; }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      .animate-pulse { animation: pulse 1.5s infinite; }
    `;
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Floating particles */}
      // Replace the glow effect with this brighter version:
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full bg-gradient-to-br from-blue-400/50 to-purple-500/40 blur-[70px]"
          style={{
            width: "120px",
            height: "120px",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.08s ease-out, top 0.08s ease-out",
          }}
        />
        <div
          className="absolute rounded-full bg-gradient-to-br from-blue-500/40 to-purple-600/30 blur-[90px]"
          style={{
            width: "180px",
            height: "180px",
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.12s ease-out, top 0.12s ease-out",
          }}
        />
      </div>
      {/* Navigation */}

      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        <ErrorBoundary>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 50 }}
              className="w-full h-full opacity-20"
            >
              <ambientLight intensity={0.5} />
              <FloatingStartupModel />
              <OrbitControls enableZoom={false} autoRotate />
            </Canvas>
          </div>
        </ErrorBoundary>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {typedText}
            </span>
            <span className="animate-pulse">|</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Launchpad helps startups and investors grow together through
            innovative matchmaking
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <span>Raise Funds</span>
              <svg
                className={`w-5 h-5 ml-2 transition-transform ${
                  isHovering ? "translate-x-2" : ""
                }`}
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
            </button>

            <button className="px-8 py-4 bg-transparent border-2 border-blue-400 rounded-full text-lg font-semibold hover:bg-blue-900/30 transition-all transform hover:scale-105">
              Explore Startups
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
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
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Future
              </span>{" "}
              of Startup Funding
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with human expertise
              to create perfect matches
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-400"
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
                ),
                title: "Lightning Fast Matching",
                description:
                  "Our AI finds investors tailored to your startup in seconds",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                ),
                title: "Secure Platform",
                description:
                  "Enterprise-grade security for your sensitive data",
              },
              {
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
                title: "Verified Network",
                description:
                  "All investors are thoroughly vetted before joining",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-400 transition-all hover:-translate-y-2"
              >
                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Success{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it
            </p>
          </div>

          <div className="relative h-96">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  currentTestimonial === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="bg-gray-800/70 backdrop-blur-sm p-8 md:p-12 rounded-xl h-full flex flex-col md:flex-row items-center gap-8">
                  <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      className="w-full h-full rounded-full object-cover border-4 border-blue-400/30"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <blockquote className="text-xl md:text-2xl italic text-gray-200 mb-6">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="font-bold text-white">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentTestimonial === index
                    ? "bg-blue-500 w-6"
                    : "bg-gray-600"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Metrics Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              By The{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Numbers
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our impact in the startup ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-400 transition-all"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                  <Counter target={metric.value} duration={2} />
                </h3>
                <p className="text-gray-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Demo Video Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              See LaunchPad in Action
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Watch how our platform connects startups with investors in minutes
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
              Watch Full Demo
            </button>
          </div>
          <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-all duration-300 transform hover:scale-110">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </button>
            </div>
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-70"
            />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Launch
            </span>{" "}
            Your Vision?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of startups and investors already changing the world
            together
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:shadow-xl transition-all transform hover:scale-105">
              Get Started - It's Free
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-blue-400 rounded-full text-lg font-semibold hover:bg-blue-900/30 transition-all transform hover:scale-105">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900/80 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
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
                <span className="text-2xl font-bold">LaunchPad</span>
              </div>
              <p className="text-gray-400">
                The future of startup funding and investment
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Startups</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Raise Funds
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Pitch Deck Tools
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Mentorship
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">For Investors</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Explore Startups
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Deal Flow
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Due Diligence
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2023 LaunchPad. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LaunchPad;
