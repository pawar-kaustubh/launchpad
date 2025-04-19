import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
 import { useParams } from "react-router-dom";

const StartUpDetails = () => {

     const { id } = useParams();
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });


  const [startup, setStartup] = useState({});
  

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
        // Fetch by ID
        const fetchStartup = async () => {
          try {
            console.log("hii")
            const res = await fetch(`http://localhost:3000/api/startup/get/${id}`);
            const data = await res.json();
            console.log(data)
            setStartup(data);
           
          } catch (err) {
            console.error("Error loading startup details:", err);
          }
        };
        fetchStartup();
      }, [id]);














  const handleGenerateSummary = () => {
    setIsLoading(true);

    // Simulate API call with actual startup data
    setTimeout(() => {
      let newSummary = `Based on your criteria: "${criteria}"\n\n`;

      // Financial highlights
      newSummary += `• ${
        startup.profit > 0 ? "Profitable" : "Pre-revenue"
      } with ${formatCurrency(startup.revenue)} annual revenue\n`;
      if (startup.profit > 0) {
        newSummary += `• Net profit of ${formatCurrency(
          startup.profit
        )} (${Math.round((startup.profit / startup.revenue) * 100)}% margin)\n`;
      } else {
        newSummary += `• Currently operating at a loss of ${formatCurrency(
          startup.loss
        )}\n`;
      }
      newSummary += `• ${startup.customers} paying customers with ${startup.satisfaction}% satisfaction\n`;
      newSummary += `• Growing at ${startup.growthRate}% YoY\n\n`;

      // Custom analysis based on criteria
      if (criteria.toLowerCase().includes("growth")) {
        newSummary += `This startup shows exceptional growth potential with its ${startup.growthRate}% YoY growth rate. `;
        newSummary += `The expansion into ${startup.marketExpansion} new markets indicates scalability.\n\n`;
      }

      if (criteria.toLowerCase().includes("profit")) {
        if (startup.profit > 0) {
          newSummary += `The company is already profitable - a strong indicator of sustainable operations. `;
          newSummary += `With a ${Math.round(
            (startup.profit / startup.revenue) * 100
          )}% profit margin, it demonstrates efficient cost management.\n\n`;
        } else {
          newSummary += `While not yet profitable, the ${startup.growthRate}% growth rate suggests potential for future profitability. `;
          newSummary += `Current runway of ${startup.runway} months provides adequate time to reach breakeven.\n\n`;
        }
      }

      if (criteria.toLowerCase().includes("team")) {
        newSummary += `The team consists of ${startup.team}, with half working remotely. `;
        newSummary += `The ${
          startup.founded ? new Date().getFullYear() - startup.founded : "N/A"
        } years of operation demonstrates experience in this sector.\n\n`;
      }

      newSummary += `Overall, ${startup.startupname} shows ${
        startup.profit > 0 ? "strong" : "promising"
      } potential in the ${startup.industry} sector.`;

      setSummary(newSummary);
      setIsLoading(false);
    }, 1500);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
  };

  const getProfitabilityClass = (value) => {
    return value > 0 ? "text-green-400" : "text-red-400";
  };

  const getGrowthClass = (value) => {
    return value >= 50
      ? "text-green-400"
      : value >= 20
      ? "text-yellow-400"
      : "text-red-400";
  };

  const getRunwayClass = (value) => {
    return value < 6
      ? "text-red-400"
      : value < 12
      ? "text-yellow-400"
      : "text-green-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      {/* Floating particles */}
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

      <Navbar />

      {/* Cover Section */}
      <div className="relative h-64">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=300&q=80"
          alt="Startup cover"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 flex items-end p-6 gap-4">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80"
            alt="Startup logo"
            className="w-16 h-16 rounded-lg border-2 border-blue-400/50"
          />
          <div>
            <h1 className="text-3xl font-bold">{startup.startupname}</h1>
            <p className="text-blue-300">{startup.startupdesc}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Startup Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Overview */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Company Overview
            </h2>
            <p className="text-gray-300">
              {startup.startupdesc} Founded in {startup.founded}, headquartered
              in {startup.location}, {startup.country}.
            </p>
          </div>

          {/* About */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              About
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Industry</p>
                <p className="text-white">{startup.industry}</p>
              </div>
              <div>
                <p className="text-gray-400">Website</p>  
                <a
                  href={`https://${startup.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {startup.website}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Social Media</p>
                <p className="text-white">{startup.socials}</p>
              </div>
              <div>
                <p className="text-gray-400">YouTube</p>
                <a
                  href={startup.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  {/* {startup.youtube.replace("https://", "")} */}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Email</p>
                <a
                  href={`mailto:${startup.email}`}
                  className="text-blue-400 hover:underline"
                >
                  {startup.email}
                </a>
              </div>
              <div>
                <p className="text-gray-400">Phone</p>
                <p className="text-white">{startup.phone}</p>
              </div>
              <div>
                <p className="text-gray-400">Location</p>
                <p className="text-white">
                  {startup.location}, {startup.country}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Pitch Deck</p>
                <a
                  href={startup.pitchdeck}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View Pitch Deck
                </a>
              </div>
            </div>
          </div>

          {/* Recognition & Validation */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Recognition & Validation
            </h2>
            <div className="flex flex-wrap gap-2">
              {/* {startup.recognitions.map((recognition, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm"
                >
                  {recognition}
                </span>
              ))} */}
              {startup.profit > 0 && (
                <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-sm">
                  Profitable
                </span>
              )}
              {startup.revenue > 1000000 && (
                <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm">
                  $1M+ Revenue
                </span>
              )}
            </div>
          </div>

          {/* Team */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400">Founded</p>
                <p className="text-white">
                  {startup.createdAt} (
                  {new Date().getFullYear() - startup.founded} years ago)
                </p>
              </div>
              <div>
                <p className="text-gray-400">Headquarters</p>
                <p className="text-white">
                  {startup.location}, {startup.country}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Team Size</p>
                <p className="text-white">{startup.team}</p>
              </div>
              <div>
                <p className="text-gray-400">Founder</p>
                <p className="text-white">
                  {startup.username}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Metrics */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Financial Metrics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  startup.revenue > 10000
                    ? "bg-blue-900/30 border border-blue-400/30"
                    : "bg-gray-700/50"
                }`}
              >
                <h3 className="text-gray-400">Annual Revenue</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(startup.revenue)}
                </p>
                <p className="text-sm text-gray-400">Total sales</p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  getProfitabilityClass(startup.profit).includes("green")
                    ? "bg-green-900/30 border border-green-400/30"
                    : "bg-red-900/30 border border-red-400/30"
                }`}
              >
                <h3 className="text-gray-400">Net Profit</h3>
                <p
                  className={`text-2xl font-bold ${getProfitabilityClass(
                    startup.profit
                  )}`}
                >
                  {formatCurrency(startup.profit)}
                </p>
                <p className="text-sm text-gray-400">
                  {startup.profit > 0
                    ? `${Math.round(
                        (startup.profit / startup.revenue) * 100
                      )}% margin`
                    : "Operating at loss"}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-gray-400">Customers</h3>
                <p className="text-2xl font-bold">
                  {formatNumber(startup.customers)}
                </p>
                <p className="text-sm text-gray-400">Paying customers</p>
              </div>
            </div>
          </div>

          {/* Growth & Operations */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Growth & Operations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  getGrowthClass(startup.growthRate).includes("green")
                    ? "bg-green-900/30 border border-green-400/30"
                    : getGrowthClass(startup.growthRate).includes("yellow")
                    ? "bg-yellow-900/30 border border-yellow-400/30"
                    : "bg-red-900/30 border border-red-400/30"
                }`}
              >
                <h3 className="text-gray-400">Growth Rate</h3>
                <p
                  className={`text-2xl font-bold ${getGrowthClass(
                    startup.growthRate
                  )}`}
                >
                  {Math.round(Math.random()*100) < 50 ? Math.round(Math.random()*100)+20 :Math.round(Math.random()*100) }%
                </p>
                <p className="text-sm text-gray-400">Year over year</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-gray-400">Customer Satisfaction</h3>
                <p className="text-2xl font-bold text-green-400">
                  {Math.round(Math.random()*100) < 50 ? Math.round(Math.random()*100)+20 :Math.round(Math.random()*100) }%
                </p>
                <p className="text-sm text-gray-400">Positive feedback</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-gray-400">Market Expansion</h3>
                <p className="text-2xl font-bold">{startup.marketExpansion}</p>
                <p className="text-sm text-gray-400">New markets</p>
              </div>
            </div>
          </div>

          {/* Burn Rate & Runway */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Burn Rate & Runway
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  startup.burnrate > 200000
                    ? "bg-red-900/30 border border-red-400/30"
                    : "bg-yellow-900/30 border border-yellow-400/30"
                }`}
              >
                <h3 className="text-gray-400">Monthly Burn</h3>
                <p
                  className={`text-2xl font-bold ${
                    startup.burnrate > 200000
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {formatCurrency(startup.burnrate)}
                </p>
                <p className="text-sm text-gray-400">Cash expenditure</p>
              </div>
              <div
                className={`p-4 rounded-lg ${
                  getRunwayClass(startup.runway).includes("green")
                    ? "bg-green-900/30 border border-green-400/30"
                    : getRunwayClass(startup.runway).includes("yellow")
                    ? "bg-yellow-900/30 border border-yellow-400/30"
                    : "bg-red-900/30 border border-red-400/30"
                }`}
              >
                <h3 className="text-gray-400">Runway</h3>
                <p
                  className={`text-2xl font-bold ${getRunwayClass(
                    startup.runway
                  )}`}
                >
                  {startup.runway} months
                </p>
                <p className="text-sm text-gray-400">At current burn</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-700/50">
                <h3 className="text-gray-400">Valuation</h3>
                <p className="text-2xl font-bold">
                  {formatCurrency(startup.valuation)}
                </p>
                <p className="text-sm text-gray-400">Current estimate</p>
              </div>
            </div>
          </div>

          {/* Funding History */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Funding History
            </h2>
            <div className="space-y-4 pl-4 border-l-2 border-blue-400/30">
              {/* {startup.fundingRounds.map((round, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute w-3 h-3 rounded-full bg-blue-400 -left-[7px] top-2"></div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-bold">
                      {round.type} Round - {round.year}
                    </h3>
                    <p className="text-blue-300">
                      {formatCurrency(round.amount)}
                    </p>
                  </div>
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* Right Column - AI Assistant */}
        <div className="sticky top-4 h-fit">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-bold">Investment Analysis</h2>
              <p className="text-blue-100">
                Get instant insights about this startup
              </p>
            </div>

            <div className="p-6 border-b border-gray-700">
              <label className="block text-gray-300 mb-2">
                Your Investment Criteria
              </label>
              <textarea
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="What matters most in your investment? (e.g., growth rate, sector, team)"
                rows="4"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="p-6">
              <button
                onClick={handleGenerateSummary}
                disabled={isLoading || !criteria}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isLoading || !criteria
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  "Generate Analysis"
                )}
              </button>

              {summary && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold">Analysis Results</h3>
                    <span className="bg-green-500 text-xs px-2 py-1 rounded-full">
                      New
                    </span>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    {summary.split("\n").map((line, i) => (
                      <p key={i} className="mb-3 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        ></path>
                      </svg>
                      Export PDF
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        ></path>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Valuation</p>
                    <p className="text-xl font-bold">
                      {formatCurrency(startup.valuation)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p
                      className={`text-xl font-bold ${
                        startup.revenue > 1000000 ? "text-green-400" : ""
                      }`}
                    >
                      {formatCurrency(startup.revenue)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Profit</p>
                    <p
                      className={`text-xl font-bold ${getProfitabilityClass(
                        startup.profit
                      )}`}
                    >
                      {formatCurrency(startup.profit)}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Growth</p>
                    <p
                      className={`text-xl font-bold ${getGrowthClass(
                        startup.growthRate
                      )}`}
                    >
                      {startup.growthRate}%
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Runway</p>
                    <p
                      className={`text-xl font-bold ${getRunwayClass(
                        startup.runway
                      )}`}
                    >
                      {startup.runway} mo
                    </p>
                  </div>
                  <div className="bg-gray-700/50 p-3 rounded-lg">
                    <p className="text-gray-400 text-sm">Equity</p>
                    <p className="text-xl font-bold">{startup.equity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartUpDetails;


