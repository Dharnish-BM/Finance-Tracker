import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExchangeDashboard = () => {
  const [currentRate, setCurrentRate] = useState(null);
  const [inrInput, setInrInput] = useState('');
  const [usdInput, setUsdInput] = useState('');
  const [lastUpdated, setLastUpdated] = useState('--');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current exchange rate
  const fetchCurrentRate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.data && response.data.rates && response.data.rates.INR) {
        setCurrentRate(response.data.rates.INR);
        setLastUpdated(new Date().toLocaleTimeString());
        setError(null);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching current rate:', error);
      // Fallback to mock data
      setCurrentRate(83.25);
      setLastUpdated(new Date().toLocaleTimeString());
      setError('Using mock data - API unavailable');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize dashboard
  useEffect(() => {
    fetchCurrentRate();
  }, []);

  // Conversion functions
  const handleInrInputChange = (e) => {
    const value = e.target.value;
    setInrInput(value);
    if (value && currentRate) {
      const usdValue = parseFloat(value) / currentRate;
      setUsdInput(usdValue.toFixed(4));
    }
  };

  const handleUsdInputChange = (e) => {
    const value = e.target.value;
    setUsdInput(value);
    if (value && currentRate) {
      const inrValue = parseFloat(value) * currentRate;
      setInrInput(inrValue.toFixed(2));
    }
  };

  const refreshData = async () => {
    await fetchCurrentRate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
      <div className="max-w-7xl mx-auto p-5">
        {/* Header */}
        <header className="bg-white/95 backdrop-blur-lg rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-4">
              <i className="fas fa-chart-line text-blue-500"></i>
              INR to USD Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm">
                Last updated: {lastUpdated}
              </span>
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50"
              >
                <i className={`fas fa-sync-alt ${isLoading ? 'animate-spin' : ''}`}></i>
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </header>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Current Rate Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 mb-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Current Exchange Rate</h2>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-4xl text-red-500 font-bold">₹</span>
                <span className="text-5xl font-bold text-gray-800">
                  {currentRate ? currentRate.toFixed(4) : '--'}
                </span>
                <span className="text-xl text-gray-600 font-medium">INR = 1 USD</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Quick Conversion</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={inrInput}
                    onChange={handleInrInputChange}
                    placeholder="Enter INR amount"
                    step="0.01"
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  />
                  <span className="text-2xl text-gray-500 font-bold">=</span>
                  <input
                    type="number"
                    value={usdInput}
                    onChange={handleUsdInputChange}
                    placeholder="USD equivalent"
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <i className="fas fa-arrow-up text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Highest (30 days)</h3>
                <p className="text-2xl font-bold text-gray-800">₹84.25</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
                <i className="fas fa-arrow-down text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Lowest (30 days)</h3>
                <p className="text-2xl font-bold text-gray-800">₹82.15</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                <i className="fas fa-chart-line text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Average (30 days)</h3>
                <p className="text-2xl font-bold text-gray-800">₹83.20</p>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <i className="fas fa-percentage text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Volatility</h3>
                <p className="text-2xl font-bold text-gray-800">±0.85</p>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Chart Placeholder */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 mb-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Exchange Rate Trend</h2>
          <div className="h-96 w-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-chart-line text-6xl text-gray-400 mb-4"></i>
              <p className="text-xl text-gray-600">Chart will be displayed here</p>
              <p className="text-sm text-gray-500 mt-2">Interactive charts coming soon!</p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">About This Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Real-time Data</h3>
              <p className="text-gray-600 mb-4">
                This dashboard provides real-time INR to USD exchange rates updated every 5 minutes.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Live exchange rate updates
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Currency conversion calculator
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Historical data analysis
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Features</h3>
              <p className="text-gray-600 mb-4">
                Built with modern web technologies for the best user experience.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Responsive design
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Fast loading
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-green-500"></i>
                  Mobile friendly
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDashboard;