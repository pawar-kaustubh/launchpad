import React, { useEffect, useState } from 'react';

const StartupAnalysis = () => {
  const [startups, setStartups] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced fetch function with better error handling
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
      throw error;
    }
  };

  // Fetch all startups with loading state
  useEffect(() => {
    const loadStartups = async () => {
      setIsLoading(true);
      try {
        const data = await fetchData('/api/startup/getall');
        setStartups(data.startups || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStartups();
  }, []);

  // Analyze a startup by ID
  const analyzeStartup = async (id) => {
    setLoadingId(id);
    setError(null);
    
    try {
      const data = await fetchData(`/api/startup/analyze/${id}`);
      setAnalysis(prev => ({ 
        ...prev, 
        [id]: {
          ...data.analysis,
          timestamp: new Date().toLocaleString()
        }
      }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoadingId(null);
    }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📊 AI Investor Pitch Analysis</h1>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4 mb-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error && startups.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">📊 AI Investor Pitch Analysis</h1>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 AI Investor Pitch Analysis</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {startups.length === 0 && !isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No startups found</p>
        </div>
      ) : (
        startups.map(startup => (
          <div 
            key={startup._id} 
            className="border border-gray-200 rounded-lg p-6 mb-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">{startup.name}</h2>
              <span className="text-sm text-gray-500">
                {new Date(startup.createdAt).toLocaleDateString()}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <p>
                <span className="font-medium text-gray-700">Idea:</span>{' '}
                <span className="text-gray-600">{startup.idea}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Target Market:</span>{' '}
                <span className="text-gray-600">{startup.targetMarket}</span>
              </p>
              {startup.uniqueValueProposition && (
                <p>
                  <span className="font-medium text-gray-700">Unique Value:</span>{' '}
                  <span className="text-gray-600">{startup.uniqueValueProposition}</span>
                </p>
              )}
            </div>

            <button
              onClick={() => analyzeStartup(startup._id)}
              disabled={loadingId === startup._id}
              className={`flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${
                loadingId === startup._id 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loadingId === startup._id ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Analyze as Investor
                </>
              )}
            </button>

            {analysis[startup._id] && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <h4 className="text-lg font-medium text-gray-800 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI Investor Feedback
                  </h4>
                  <span className="ml-auto text-xs text-gray-500">
                    {analysis[startup._id].timestamp}
                  </span>
                </div>
                <div className="prose prose-sm max-w-none">
                  {analysis[startup._id].split('\n').map((paragraph, i) => (
                    <p key={i} className="text-gray-700 mb-2">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default StartupAnalysis;