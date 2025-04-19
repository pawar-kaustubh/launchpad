import React, { useState, useContext } from "react";
import { Context } from "../../Context/context";

const MentorSection = () => {
  const { onSent, showResult, loading, resultData } = useContext(Context);
  const [pitch, setPitch] = useState("");
  const [stage, setStage] = useState(""); // startup stage
  const [industry, setIndustry] = useState(""); // industry
  const [fundingAsk, setFundingAsk] = useState(""); // funding amount
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Common pitch templates
  const pitchTemplates = [
    {
      id: 1,
      title: "Tech Startup",
      description: "For technology product companies",
      template: `We're [Company Name], building [product/service] that solves [problem] for [target market]. 

Our unique approach using [technology/differentiator] allows us to [key benefit]. 

The [industry] market is worth $[X] billion and growing at [Y]% annually. We're seeking $[amount] to [use of funds].`
    },
    {
      id: 2,
      title: "Social Impact",
      description: "For mission-driven organizations",
      template: `[Company Name] exists to [solve social/environmental problem]. 

Through our [solution], we're addressing [specific issue] that affects [number] people in [region/community]. 

With $[amount] in funding, we can scale to reach [goal] by [timeline].`
    },
    {
      id: 3,
      title: "E-commerce",
      description: "For online retail businesses",
      template: `[Company Name] is revolutionizing [niche] e-commerce by [unique value prop]. 

We've achieved [metrics: e.g., X% MoM growth, $Y revenue] in just [timeframe]. 

This $[amount] investment will fuel our [growth strategy] to capture [Z]% of the $[market size] market.`
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct the prompt for Gemini
    const prompt = `Act as an experienced venture capital investor. Analyze this startup pitch and provide constructive feedback:
    
    Startup Stage: ${stage}
    Industry: ${industry}
    Funding Ask: $${fundingAsk}
    
    Pitch:
    ${pitch}
    
    Please evaluate:
    1. Problem/Solution Fit
    2. Market Opportunity
    3. Competitive Advantage
    4. Financial Projections (if mentioned)
    5. Team (if mentioned)
    6. Suggested improvements
    
    Ask follow-up questions that a real investor would ask. Be critical but constructive.`;
    
    onSent(prompt);
  };

  const applyTemplate = (template) => {
    setPitch(template);
    setSelectedTemplate(template);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">AI Investor Pitch Practice</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Quick Start Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pitchTemplates.map((template) => (
            <div 
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.template ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
              onClick={() => applyTemplate(template.template)}
            >
              <h4 className="font-medium text-gray-800">{template.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{template.description}</p>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Startup Stage</label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select stage</option>
              <option value="Idea">Idea Stage</option>
              <option value="Pre-seed">Pre-seed</option>
              <option value="Seed">Seed</option>
              <option value="Series A">Series A</option>
              <option value="Growth">Growth Stage</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Fintech">Fintech</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Education">Education</option>
              <option value="Consumer Goods">Consumer Goods</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Funding Ask ($)</label>
            <input
              type="number"
              value={fundingAsk}
              onChange={(e) => setFundingAsk(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 500000"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Pitch (2-3 minutes worth of text)</label>
          <textarea
            value={pitch}
            onChange={(e) => setPitch(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Paste your pitch deck text or elevator pitch here..."
            required
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            disabled={loading}
          >
            {loading ? 'Analyzing...' : 'Get Investor Feedback'}
          </button>
        </div>
      </form>
      
      {showResult && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Investor Feedback</h3>
          <div className="prose max-w-none">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: resultData }} />
            )}
          </div>
        </div>
      )}
      
      <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Tips for a Great Pitch</h3>
        <ul className="list-disc pl-5 space-y-2 text-yellow-700">
          <li>Clearly articulate the problem you're solving</li>
          <li>Explain why your solution is unique</li>
          <li>Provide specific market size data</li>
          <li>Be realistic about financial projections</li>
          <li>Highlight your team's relevant experience</li>
          <li>Practice answering tough questions</li>
        </ul>
      </div>
    </div>
  );
};

export default MentorSection;