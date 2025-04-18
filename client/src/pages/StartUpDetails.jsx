import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const StartUpDetails = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [criteria, setCriteria] = useState('');

  // Sample startup data - in a real app this would come from props or API
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
    ]
  });

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
    return value > 0 ? 'positive' : 'negative';
  };

  const getGrowthClass = (value) => {
    return value >= 50 ? 'positive' : (value >= 20 ? 'neutral' : 'negative');
  };

  return (
    <div className="startup-details-page">
      <Navbar />
      
      {/* Cover Section */}
      <div className="cover-container">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=300&q=80" 
          alt="Startup cover" 
          className="cover-image"
        />
        <div className="cover-overlay">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=80&h=80&q=80" 
            alt="Startup logo" 
            className="logo-image"
          />
          <div>
            <h1 className="startup-name">{startup.startupname}</h1>
            <p className="startup-tagline">{startup.startupdesc}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Left Column - Startup Info */}
        <div className="startup-info">
          <section className="info-section">
            <h2 className="section-title">Company Overview</h2>
            <p className="section-description">
              {startup.startupdesc} Founded in {startup.founded}, headquartered in {startup.location}, {startup.country}.
            </p>
          </section>

          <section className="info-section">
            <h2 className="section-title">About</h2>
            <div className="about-grid">
              <div className="about-item">
                <span className="about-label">Industry</span>
                <span className="about-value">{startup.industry}</span>
              </div>
              <div className="about-item">
                <span className="about-label">Website</span>
                <a href={`https://${startup.website}`} target="_blank" rel="noopener noreferrer" className="about-value link">
                  {startup.website}
                </a>
              </div>
              <div className="about-item">
                <span className="about-label">Social Media</span>
                <span className="about-value">{startup.socials}</span>
              </div>
              <div className="about-item">
                <span className="about-label">YouTube</span>
                <a href={startup.youtube} target="_blank" rel="noopener noreferrer" className="about-value link">
                  {startup.youtube.replace('https://', '')}
                </a>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Contact Information</h2>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href={`mailto:${startup.email}`} className="contact-value link">{startup.email}</a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span className="contact-value">{startup.phone}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span className="contact-value">{startup.location}, {startup.country}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Pitch Deck</span>
                <a href={startup.pitchdeck} target="_blank" rel="noopener noreferrer" className="contact-value link">
                  View Pitch Deck
                </a>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Recognition & Validation</h2>
            <div className="badges-container">
              {startup.recognitions.map((recognition, index) => (
                <span key={index} className="badge">{recognition}</span>
              ))}
              {startup.profit > 0 && (
                <span className="badge positive">Profitable</span>
              )}
              {startup.revenue > 1000000 && (
                <span className="badge highlight">$1M+ Revenue</span>
              )}
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Team</h2>
            <div className="team-details">
              <div className="team-item">
                <span className="team-label">Founded:</span>
                <span className="team-value">{startup.founded} ({new Date().getFullYear() - startup.founded} years ago)</span>
              </div>
              <div className="team-item">
                <span className="team-label">Headquarters:</span>
                <span className="team-value">{startup.location}, {startup.country}</span>
              </div>
              <div className="team-item">
                <span className="team-label">Team Size:</span>
                <span className="team-value">{startup.team}</span>
              </div>
              <div className="team-item">
                <span className="team-label">Founder:</span>
                <span className="team-value">{startup.username.replace('_', ' ')}</span>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Financial Metrics</h2>
            <div className="metrics-grid">
              <div className={`metric-card ${startup.revenue > 1000000 ? 'highlight' : ''}`}>
                <h3>Annual Revenue</h3>
                <p className="metric-value">{formatCurrency(startup.revenue)}</p>
                <p className="metric-note">Total sales</p>
              </div>
              <div className={`metric-card ${getProfitabilityClass(startup.profit)}`}>
                <h3>Net Profit</h3>
                <p className="metric-value">{formatCurrency(startup.profit)}</p>
                <p className="metric-note">
                  {startup.profit > 0 ? 
                    `${Math.round((startup.profit/startup.revenue)*100)}% margin` : 
                    'Operating at loss'}
                </p>
              </div>
              <div className="metric-card">
                <h3>Customers</h3>
                <p className="metric-value">{formatNumber(startup.customers)}</p>
                <p className="metric-note">Paying customers</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Growth & Operations</h2>
            <div className="metrics-grid">
              <div className={`metric-card ${getGrowthClass(startup.growthRate)}`}>
                <h3>Growth Rate</h3>
                <p className="metric-value">{startup.growthRate}%</p>
                <p className="metric-note">Year over year</p>
              </div>
              <div className="metric-card">
                <h3>Customer Satisfaction</h3>
                <p className="metric-value">{startup.satisfaction}%</p>
                <p className="metric-note">Positive feedback</p>
              </div>
              <div className="metric-card">
                <h3>Market Expansion</h3>
                <p className="metric-value">{startup.marketExpansion}</p>
                <p className="metric-note">New markets</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Burn Rate & Runway</h2>
            <div className="metrics-grid">
              <div className={`metric-card ${startup.burnrate > 200000 ? 'negative' : 'neutral'}`}>
                <h3>Monthly Burn</h3>
                <p className="metric-value">{formatCurrency(startup.burnrate)}</p>
                <p className="metric-note">Cash expenditure</p>
              </div>
              <div className={`metric-card ${startup.runway < 6 ? 'negative' : (startup.runway < 12 ? 'neutral' : 'positive')}`}>
                <h3>Runway</h3>
                <p className="metric-value">{startup.runway} months</p>
                <p className="metric-note">At current burn</p>
              </div>
              <div className="metric-card">
                <h3>Valuation</h3>
                <p className="metric-value">{formatCurrency(startup.valuation)}</p>
                <p className="metric-note">Current estimate</p>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2 className="section-title">Funding History</h2>
            <div className="funding-timeline">
              {startup.fundingRounds.map((round, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>{round.type} Round - {round.year}</h3>
                    <p>{formatCurrency(round.amount)}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column - AI Assistant */}
        <div className="ai-assistant">
          <div className="ai-card">
            <div className="ai-header">
              <h2>Investment Analysis</h2>
              <p className="ai-subheader">Get instant insights about this startup</p>
            </div>
            
            <div className="input-section">
              <label>Your Investment Criteria</label>
              <textarea 
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
                placeholder="What matters most in your investment? (e.g., growth rate, sector, team)"
                rows="4"
              />
            </div>

            <button 
              onClick={handleGenerateSummary}
              disabled={isLoading || !criteria}
              className={`generate-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Analyzing...
                </>
              ) : (
                'Generate Analysis'
              )}
            </button>

            {summary && (
              <div className="results-section">
                <div className="results-header">
                  <h3>Analysis Results</h3>
                  <span className="results-badge">New</span>
                </div>
                <div className="summary-box">
                  {summary.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                <div className="action-buttons">
                  <button className="export-button">
                    <span className="icon">↓</span> Export PDF
                  </button>
                  <button className="share-button">
                    <span className="icon">↗</span> Share
                  </button>
                </div>
              </div>
            )}

            <div className="quick-facts">
              <h3>Key Metrics</h3>
              <div className="facts-grid">
                <div className="fact-card">
                  <span className="fact-label">Valuation</span>
                  <span className="fact-value">{formatCurrency(startup.valuation)}</span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Revenue</span>
                  <span className={`fact-value ${startup.revenue > 1000000 ? 'positive' : ''}`}>
                    {formatCurrency(startup.revenue)}
                  </span>
                </div>
                <div className={`fact-card ${getProfitabilityClass(startup.profit)}`}>
                  <span className="fact-label">Profit</span>
                  <span className="fact-value">{formatCurrency(startup.profit)}</span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Growth</span>
                  <span className={`fact-value ${getGrowthClass(startup.growthRate)}`}>
                    {startup.growthRate}%
                  </span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Runway</span>
                  <span className={`fact-value ${startup.runway < 6 ? 'negative' : (startup.runway < 12 ? 'neutral' : 'positive')}`}>
                    {startup.runway} mo
                  </span>
                </div>
                <div className="fact-card">
                  <span className="fact-label">Equity</span>
                  <span className="fact-value">{startup.equity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .startup-details-page {
          background: #f8fafc;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif;
        }
        
        .cover-container {
          height: 280px;
          position: relative;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .cover-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .cover-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          display: flex;
          align-items: flex-end;
          gap: 20px;
        }
        
        .logo-image {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          border: 2px solid white;
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .startup-name {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        
        .startup-tagline {
          color: rgba(255,255,255,0.9);
          font-size: 16px;
          margin: 0;
        }
        
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
          display: flex;
          gap: 40px;
        }
        
        .startup-info {
          flex: 2;
        }
        
        .ai-assistant {
          flex: 1;
          position: sticky;
          top: 20px;
          height: fit-content;
        }
        
        .info-section {
          margin-bottom: 40px;
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border: 1px solid #e2e8f0;
        }
        
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .section-description {
          color: #475569;
          line-height: 1.6;
          margin: 0;
        }
        
        .about-grid, .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .about-item, .contact-item {
          display: flex;
          flex-direction: column;
        }
        
        .about-label, .contact-label, .team-label {
          font-size: 14px;
          color: #64748b;
        }
        
        .about-value, .contact-value, .team-value {
          font-weight: 500;
          color: #1e293b;
        }
        
        .link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .link:hover {
          text-decoration: underline;
        }
        
        .badges-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .badge {
          background: #f1f5f9;
          color: #334155;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .badge.positive {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }
        
        .badge.highlight {
          background: #eff6ff;
          color: #1e40af;
          border: 1px solid #bfdbfe;
        }
        
        .team-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }
        
        .metric-card {
          background: white;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.2s ease;
        }
        
        .metric-card.highlight {
          border-left: 4px solid #3b82f6;
          background: #f8fafc;
        }
        
        .metric-card.positive {
          border-left: 4px solid #10b981;
          background: #ecfdf5;
        }
        
        .metric-card.negative {
          border-left: 4px solid #ef4444;
          background: #fef2f2;
        }
        
        .metric-card.neutral {
          border-left: 4px solid #f59e0b;
          background: #fffbeb;
        }
        
        .metric-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: 600;
          color: #1e293b;
          margin: 8px 0 4px;
        }
        
        .metric-note {
          font-size: 14px;
          color: #64748b;
          margin: 0;
        }
        
        .funding-timeline {
          position: relative;
          padding-left: 20px;
        }
        
        .timeline-item {
          position: relative;
          padding-bottom: 20px;
        }
        
        .timeline-dot {
          position: absolute;
          left: -20px;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #3b82f6;
        }
        
        .timeline-content {
          padding: 12px 16px;
          background: #f8fafc;
          border-radius: 8px;
        }
        
        .timeline-content h3 {
          margin: 0 0 4px;
          font-size: 16px;
          font-weight: 600;
        }
        
        .timeline-content p {
          margin: 0;
          color: #475569;
        }
        
        .ai-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        
        .ai-header {
          padding: 20px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
        }
        
        .ai-header h2 {
          margin: 0;
          font-size: 20px;
          font-weight: 600;
        }
        
        .ai-subheader {
          margin: 4px 0 0;
          font-size: 14px;
          opacity: 0.9;
        }
        
        .input-section {
          padding: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        
        .input-section label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
          color: #334155;
        }
        
        .input-section textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          min-height: 100px;
          font-family: inherit;
          resize: vertical;
          transition: border 0.2s;
        }
        
        .input-section textarea:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .generate-button {
          width: calc(100% - 40px);
          margin: 0 20px 20px;
          padding: 14px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        
        .generate-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
        }
        
        .generate-button:disabled {
          background: #cbd5e1;
          cursor: not-allowed;
        }
        
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .results-section {
          padding: 0 20px 20px;
        }
        
        .results-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }
        
        .results-header h3 {
          margin: 0;
          font-size: 18px;
          color: #1e293b;
        }
        
        .results-badge {
          background: #10b981;
          color: white;
          font-size: 12px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
        
        .summary-box {
          background: #f8fafc;
          padding: 16px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          margin-bottom: 16px;
        }
        
        .summary-box p {
          margin: 0 0 8px;
          color: #334155;
          line-height: 1.5;
        }
        
        .summary-box p:last-child {
          margin-bottom: 0;
        }
        
        .action-buttons {
          display: flex;
          gap: 12px;
        }
        
        .export-button, .share-button {
          flex: 1;
          padding: 8px;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }
        
        .export-button {
          background: #f1f5f9;
          color: #334155;
          border: 1px solid #e2e8f0;
        }
        
        .share-button {
          background: white;
          color: #3b82f6;
          border: 1px solid #3b82f6;
        }
        
        .export-button:hover {
          background: #e2e8f0;
        }
        
        .share-button:hover {
          background: #f8fafc;
        }
        
        .icon {
          font-size: 16px;
        }
        
        .quick-facts {
          padding: 20px;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
        }
        
        .quick-facts h3 {
          margin: 0 0 16px;
          font-size: 16px;
          color: #334155;
        }
        
        .facts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        
        .fact-card {
          background: white;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
        }
        
        .fact-label {
          display: block;
          font-size: 12px;
          color: #64748b;
          margin-bottom: 4px;
        }
        
        .fact-value {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
        }
        
        .fact-value.positive {
          color: #10b981;
        }
        
        .fact-value.negative {
          color: #ef4444;
        }
        
        .fact-value.neutral {
          color: #f59e0b;
        }
        
        .fact-card.positive {
          background: #ecfdf5;
          border-color: #a7f3d0;
        }
        
        .fact-card.negative {
          background: #fef2f2;
          border-color: #fecaca;
        }
        
        @media (max-width: 768px) {
          .content-container {
            flex-direction: column;
          }
          
          .ai-assistant {
            position: static;
            margin-top: 40px;
          }
          
          .cover-overlay {
            padding: 16px;
          }
          
          .startup-name {
            font-size: 24px;
          }
          
          .about-grid, .contact-grid, .team-details {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StartUpDetails;