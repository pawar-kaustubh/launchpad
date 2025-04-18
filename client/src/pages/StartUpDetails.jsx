import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const StartUpDetails = () => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSummary = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newSummary = 
        `Based on the provided data, this startup shows:\n\n` +
        `• Strong revenue of ₹80 lakhs\n` +
        `• Healthy valuation at ₹10 crore\n` +
        `• Seeking ₹50 lakhs funding for growth\n` +
        `• Solid 12 month runway\n\n` +
        `The Tech/AI sector shows good potential.`;
      
      setSummary(newSummary);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="startup-details-page">
      <Navbar />
      
      {/* Cover Section */}
      <div className="cover-container">
        <img 
          src="https://via.placeholder.com/1200x300?text=Startup+Cover" 
          alt="Startup cover" 
          className="cover-image"
        />
        <div className="cover-overlay">
          <img 
            src="https://via.placeholder.com/80" 
            alt="Startup logo" 
            className="logo-image"
          />
          <h1 className="startup-name">Startup Name</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container">
        {/* Left Column - Startup Info */}
        <div className="startup-info">
          <section className="info-section">
            <h2>About the Startup</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Nunc sed lorem a urna mattis commodo. Integer feugiat 
              nulla vel justo efficitur.
            </p>
          </section>

          <div className="metrics-grid">
            {/* Financial Metrics */}
            <div className="metric-card">
              <h3>Total Sales</h3>
              <p>₹1,00,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Revenue</h3>
              <p>₹80,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Profit</h3>
              <p>₹20,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Loss</h3>
              <p>₹5,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Valuation</h3>
              <p>₹10,00,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Equity</h3>
              <p>15%</p>
            </div>
          </div>

          {/* Operational Metrics */}
          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Burn Rate</h3>
              <p>₹2,00,000/month</p>
            </div>
            <div className="metric-card">
              <h3>Runway</h3>
              <p>12 months</p>
            </div>
          </div>

          {/* Other Info Sections */}
          <section className="info-section">
            <h3>YouTube</h3>
            <a href="#" className="video-link">Watch our video</a>
          </section>

          <div className="metrics-grid">
            <div className="metric-card">
              <h3>Funding Required</h3>
              <p>₹50,00,000</p>
            </div>
            <div className="metric-card">
              <h3>Category</h3>
              <p>Tech / AI</p>
            </div>
          </div>

          <section className="info-section">
            <h3>Contact</h3>
            <p>Email: founder@email.com</p>
            <p>Website: <a href="#" className="website-link">https://startupsite.com</a></p>
          </section>

          <section className="info-section">
            <h3>Social Links</h3>
            <div className="social-links">
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </section>

          <button className="contact-button">
            Contact Startup
          </button>
        </div>

        {/* Right Column - AI Assistant */}
        <div className="ai-assistant">
          <div className="ai-card">
            <h2>Investment Assistant</h2>
            
            <div className="input-section">
              <label>Your Criteria</label>
              <textarea 
                placeholder="What matters most in your investment?"
                rows="4"
              />
            </div>

            <button 
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className={`generate-button ${isLoading ? 'loading' : ''}`}
            >
              {isLoading ? 'Analyzing...' : 'Get Analysis'}
            </button>

            {summary && (
              <div className="results-section">
                <h3>Analysis Results</h3>
                <div className="summary-box">
                  {summary}
                </div>
                <button className="export-button">
                  Export Report
                </button>
              </div>
            )}

            <div className="quick-facts">
              <h3>Quick Facts</h3>
              <div className="fact-row">
                <span>Valuation:</span>
                <span>₹10 Cr</span>
              </div>
              <div className="fact-row">
                <span>Equity:</span>
                <span>15%</span>
              </div>
              <div className="fact-row">
                <span>Runway:</span>
                <span>12 months</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .startup-details-page {
          background: #f5f5f5;
          min-height: 100vh;
        }
        
        .cover-container {
          height: 250px;
          position: relative;
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
          padding: 20px;
          background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
          display: flex;
          align-items: flex-end;
        }
        
        .logo-image {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 3px solid white;
        }
        
        .startup-name {
          color: white;
          margin-left: 15px;
          font-size: 24px;
        }
        
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          gap: 30px;
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
          margin-bottom: 30px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .metric-card {
          background: white;
          padding: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .video-link {
          color: #ff0000;
        }
        
        .website-link {
          color: #0066cc;
        }
        
        .social-links {
          display: flex;
          gap: 15px;
        }
        
        .social-links a {
          color: #333;
        }
        
        .contact-button {
          background: #0066cc;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        .ai-card {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .input-section {
          margin-bottom: 15px;
        }
        
        .input-section textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
        
        .generate-button {
          width: 100%;
          padding: 12px;
          background: linear-gradient(to right, #7b2ff7, #3a7bd5);
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        
        .generate-button.loading {
          background: #aaa;
          cursor: not-allowed;
        }
        
        .results-section {
          margin-top: 20px;
        }
        
        .summary-box {
          background: #f0f7ff;
          padding: 15px;
          border-radius: 5px;
          white-space: pre-line;
          margin: 10px 0;
        }
        
        .export-button {
          background: none;
          border: none;
          color: #0066cc;
          cursor: pointer;
          font-size: 14px;
        }
        
        .quick-facts {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .fact-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
        }
        
        @media (max-width: 768px) {
          .content-container {
            flex-direction: column;
          }
          
          .ai-assistant {
            position: static;
          }
        }
      `}</style>
    </div>
  );
};

export default StartUpDetails;