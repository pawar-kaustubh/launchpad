import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const StartUpDetails = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredMetric, setHoveredMetric] = useState(null);

  // Sample startup data
  const [startup] = useState({
    username: "founder_john",
    startupname: "EcoEnergy Solutions",
    startupdesc: "Sustainable energy management platform for commercial holdings.",
    email: "contact@ecoenergy.com",
    country: "United States",
    location: "80m Trenches, CA",
    website: "www.ecoenergy.com",
    phone: 1234567890,
    industry: "CleanTech",
    socials: "@ecoenergy",
    team: "30 employees, 50% remote",
    totalsales: 2500000,
    revenue: 2500000,
    profit: 500000,
    loss: 0,
    valuation: 25000000,
    equity: 15,
    pitchdeck: "https://ecoenergy.com/pitchdeck.pdf",
    burnrate: 150000,
    runway: 18,
    youtube: "https://youtube.com/ecoenergy",
    founded: 2018,
    customers: 205,
    satisfaction: 94,
    growthRate: 97,
    marketExpansion: 2,
    fundingRounds: [
      { year: 2018, type: "Seed", amount: 500000 },
      { year: 2020, type: "Series A", amount: 2000000 },
      { year: 2022, type: "Series B", amount: 5000000 }
    ],
    recognitions: [
      "Y-combinator WC21",
      "Tech Innovator 2023",
      "ISO 27001 certified"
    ],
    milestones: [
      { date: "2018 Q1", event: "Company Founded" },
      { date: "2018 Q4", event: "First Product Launch" },
      { date: "2020 Q2", event: "Series A Funding" },
      { date: "2021 Q1", event: "Expanded to EU Market" },
      { date: "2022 Q3", event: "Reached Profitability" }
    ]
  });

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

  const handleGenerateSummary = () => {
    setIsLoading(true);
    
    // Simulate API call with actual startup data
    setTimeout(() => {
      let newSummary = `Based on your criteria: "${criteria}"\n\n`;
      
      // Financial highlights
      newSummary += `• ${startup.profit > 0 ? 'Profitable' : 'Pre-revenue'} with ${formatCurrency(startup.revenue)} annual revenue\n`;
      if (startup.profit > 0) {
        newSummary += `• Net profit of ${formatCurrency(startup.profit)} (${Math.round((startup.profit/startup.revenue)*100)}% margin)\n`;
      } else {
        newSummary += `• Currently operating at a loss of ${formatCurrency(startup.loss)}\n`;
      }
      newSummary += `• ${startup.customers} paying customers with ${startup.satisfaction}% satisfaction\n`;
      newSummary += `• Growing at ${startup.growthRate}% YoY\n\n`;
      
      // Custom analysis based on criteria
      if (criteria.toLowerCase().includes('growth')) {
        newSummary += `This startup shows exceptional growth potential with its ${startup.growthRate}% YoY growth rate. `;
        newSummary += `The expansion into ${startup.marketExpansion} new markets indicates scalability.\n\n`;
      }
      
      if (criteria.toLowerCase().includes('profit')) {
        if (startup.profit > 0) {
          newSummary += `The company is already profitable - a strong indicator of sustainable operations. `;
          newSummary += `With a ${Math.round((startup.profit/startup.revenue)*100)}% profit margin, it demonstrates efficient cost management.\n\n`;
        } else {
          newSummary += `While not yet profitable, the ${startup.growthRate}% growth rate suggests potential for future profitability. `;
          newSummary += `Current runway of ${startup.runway} months provides adequate time to reach breakeven.\n\n`;
        }
      }
      
      if (criteria.toLowerCase().includes('team')) {
        newSummary += `The team consists of ${startup.team}, with half working remotely. `;
        newSummary += `The ${startup.founded ? (new Date().getFullYear() - startup.founded) : 'N/A'} years of operation demonstrates experience in this sector.\n\n`;
      }
      
      newSummary += `Overall, ${startup.startupname} shows ${startup.profit > 0 ? 'strong' : 'promising'} potential in the ${startup.industry} sector.`;
      
      setSummary(newSummary);
      setIsLoading(false);
    }, 1500);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const getProfitabilityClass = (value) => {
    return value > 0 ? 'text-green-400' : 'text-red-400';
  };

  const getGrowthClass = (value) => {
    return value >= 50 ? 'text-green-400' : (value >= 20 ? 'text-yellow-400' : 'text-red-400');
  };

  const getRunwayClass = (value) => {
    return value < 6 ? 'text-red-400' : (value < 12 ? 'text-yellow-400' : 'text-green-400');
  };

  const getMetricBgClass = (value, type) => {
    if (type === 'growth') {
      return value >= 50 ? 'bg-green-900/30' : (value >= 20 ? 'bg-yellow-900/30' : 'bg-red-900/30');
    } else if (type === 'profit') {
      return value > 0 ? 'bg-green-900/30' : 'bg-red-900/30';
    } else if (type === 'runway') {
      return value < 6 ? 'bg-red-900/30' : (value < 12 ? 'bg-yellow-900/30' : 'bg-green-900/30');
    }
    return 'bg-gray-700/50';
  };

  const getMetricBorderClass = (value, type) => {
    if (type === 'growth') {
      return value >= 50 ? 'border-green-400/30' : (value >= 20 ? 'border-yellow-400/30' : 'border-red-400/30');
    } else if (type === 'profit') {
      return value > 0 ? 'border-green-400/30' : 'border-red-400/30';
    } else if (type === 'runway') {
      return value < 6 ? 'border-red-400/30' : (value < 12 ? 'border-yellow-400/30' : 'border-green-400/30');
    }
    return 'border-gray-600';
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
            className="w-16 h-16 rounded-lg border-2 border-blue-400/50 transition-transform hover:scale-110"
          />
          <div className="transition-all hover:translate-x-1">
            <h1 className="text-3xl font-bold">{startup.startupname}</h1>
            <p className="text-blue-300">{startup.startupdesc}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Startup Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-1 border border-gray-700">
            <div className="flex space-x-1">
              {['overview', 'financials', 'team', 'milestones'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Company Overview
                </h2>
                <p className="text-gray-300">
                  {startup.startupdesc} Founded in {startup.founded}, headquartered in {startup.location}, {startup.country}.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Recognition & Validation
                </h2>
                <div className="flex flex-wrap gap-2">
                  {startup.recognitions.map((recognition, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 rounded-full bg-blue-900/50 text-blue-300 text-sm transition-transform hover:scale-105"
                    >
                      {recognition}
                    </span>
                  ))}
                  {startup.profit > 0 && (
                    <span className="px-3 py-1 rounded-full bg-green-900/50 text-green-300 text-sm transition-transform hover:scale-105">
                      Profitable
                    </span>
                  )}
                  {startup.revenue > 1000000 && (
                    <span className="px-3 py-1 rounded-full bg-purple-900/50 text-purple-300 text-sm transition-transform hover:scale-105">
                      $1M+ Revenue
                    </span>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Financials Tab */}
          {activeTab === 'financials' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Financial Metrics */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Financial Metrics
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div 
                      className={`p-4 rounded-lg transition-all ${getMetricBgClass(startup.revenue, 'revenue')} border ${getMetricBorderClass(startup.revenue, 'revenue')} ${hoveredMetric === 'revenue' ? 'scale-[1.02] shadow-lg' : ''}`}
                      onMouseEnter={() => setHoveredMetric('revenue')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      <h3 className="text-gray-400">Annual Revenue</h3>
                      <p className="text-2xl font-bold">
                        {formatCurrency(startup.revenue)}
                      </p>
                      <p className="text-sm text-gray-400">Total sales</p>
                    </div>
                    <div 
                      className={`p-4 rounded-lg transition-all ${getMetricBgClass(startup.profit, 'profit')} border ${getMetricBorderClass(startup.profit, 'profit')} ${hoveredMetric === 'profit' ? 'scale-[1.02] shadow-lg' : ''}`}
                      onMouseEnter={() => setHoveredMetric('profit')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      <h3 className="text-gray-400">Net Profit</h3>
                      <p className={`text-2xl font-bold ${getProfitabilityClass(startup.profit)}`}>
                        {formatCurrency(startup.profit)}
                      </p>
                      <p className="text-sm text-gray-400">
                        {startup.profit > 0 ? 
                          `${Math.round((startup.profit/startup.revenue)*100)}% margin` : 
                          'Operating at loss'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Growth Metrics */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
                  <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    Growth Metrics
                  </h2>
                  <div className="grid grid-cols-1 gap-4">
                    <div 
                      className={`p-4 rounded-lg transition-all ${getMetricBgClass(startup.growthRate, 'growth')} border ${getMetricBorderClass(startup.growthRate, 'growth')} ${hoveredMetric === 'growth' ? 'scale-[1.02] shadow-lg' : ''}`}
                      onMouseEnter={() => setHoveredMetric('growth')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      <h3 className="text-gray-400">Growth Rate</h3>
                      <p className={`text-2xl font-bold ${getGrowthClass(startup.growthRate)}`}>
                        {startup.growthRate}%
                      </p>
                      <p className="text-sm text-gray-400">Year over year</p>
                    </div>
                    <div 
                      className={`p-4 rounded-lg transition-all ${getMetricBgClass(startup.runway, 'runway')} border ${getMetricBorderClass(startup.runway, 'runway')} ${hoveredMetric === 'runway' ? 'scale-[1.02] shadow-lg' : ''}`}
                      onMouseEnter={() => setHoveredMetric('runway')}
                      onMouseLeave={() => setHoveredMetric(null)}
                    >
                      <h3 className="text-gray-400">Runway</h3>
                      <p className={`text-2xl font-bold ${getRunwayClass(startup.runway)}`}>
                        {startup.runway} months
                      </p>
                      <p className="text-sm text-gray-400">At current burn</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Funding History */}
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
                <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Funding History
                </h2>
                <div className="space-y-4 pl-4 border-l-2 border-blue-400/30">
                  {startup.fundingRounds.map((round, index) => (
                    <div key={index} className="relative pl-6 transition-all hover:translate-x-1">
                      <div className="absolute w-3 h-3 rounded-full bg-blue-400 -left-[7px] top-2 animate-pulse"></div>
                      <div className="bg-gray-700/50 p-4 rounded-lg hover:bg-gray-700/70 transition">
                        <h3 className="font-bold">{round.type} Round - {round.year}</h3>
                        <p className="text-blue-300">{formatCurrency(round.amount)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Team Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-700/50 rounded-lg transition hover:bg-gray-700/70">
                  <p className="text-gray-400">Founded</p>
                  <p className="text-white">{startup.founded} ({new Date().getFullYear() - startup.founded} years ago)</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg transition hover:bg-gray-700/70">
                  <p className="text-gray-400">Headquarters</p>
                  <p className="text-white">{startup.location}, {startup.country}</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg transition hover:bg-gray-700/70">
                  <p className="text-gray-400">Team Size</p>
                  <p className="text-white">{startup.team}</p>
                </div>
                <div className="p-4 bg-gray-700/50 rounded-lg transition hover:bg-gray-700/70">
                  <p className="text-gray-400">Founder</p>
                  <p className="text-white">{startup.username.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 transition-all hover:border-blue-400/50">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Company Milestones
              </h2>
              <div className="space-y-4">
                {startup.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg transition hover:bg-gray-700/70 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-300 font-bold group-hover:bg-blue-800/70 transition">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-gray-400">{milestone.date}</p>
                      <p className="text-white font-medium">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - AI Assistant */}
        <div className="sticky top-4 h-fit">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden transition-all hover:shadow-xl hover:border-blue-400/30">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-bold">Investment Analysis</h2>
              <p className="text-blue-100">Get instant insights about this startup</p>
            </div>
            
            <div className="p-6 border-b border-gray-700">
              <label className="block text-gray-300 mb-2">Your Investment Criteria</label>
              <textarea 
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="What matters most in your investment? (e.g., growth rate, sector, team)"
                rows="4"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <div className="p-6">
              <button 
                onClick={handleGenerateSummary}
                disabled={isLoading || !criteria}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  isLoading || !criteria 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </div>
                ) : (
                  'Generate Analysis'
                )}
              </button>

              {summary && (
                <div className="mt-6 animate-fadeIn">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-bold">Analysis Results</h3>
                    <span className="bg-green-500 text-xs px-2 py-1 rounded-full animate-pulse">New</span>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                    {summary.split('\n').map((line, i) => (
                      <p key={i} className="mb-3 last:mb-0">{line}</p>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center gap-2 transition hover:-translate-y-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                      </svg>
                      Export PDF
                    </button>
                    <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center gap-2 transition hover:-translate-y-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Valuation</p>
                    <p className="text-xl font-bold">{formatCurrency(startup.valuation)}</p>
                  </div>
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Revenue</p>
                    <p className={`text-xl font-bold ${startup.revenue > 1000000 ? 'text-green-400' : ''}`}>
                      {formatCurrency(startup.revenue)}
                    </p>
                  </div>
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Profit</p>
                    <p className={`text-xl font-bold ${getProfitabilityClass(startup.profit)}`}>
                      {formatCurrency(startup.profit)}
                    </p>
                  </div>
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Growth</p>
                    <p className={`text-xl font-bold ${getGrowthClass(startup.growthRate)}`}>
                      {startup.growthRate}%
                    </p>
                  </div>
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Runway</p>
                    <p className={`text-xl font-bold ${getRunwayClass(startup.runway)}`}>
                      {startup.runway} mo
                    </p>
                  </div>
                  <div 
                    className="bg-gray-700/50 p-3 rounded-lg transition hover:bg-gray-700/70 cursor-pointer"
                    onClick={() => setActiveTab('financials')}
                  >
                    <p className="text-gray-400 text-sm">Equity</p>
                    <p className="text-xl font-bold">{startup.equity}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some global styles for animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StartUpDetails;