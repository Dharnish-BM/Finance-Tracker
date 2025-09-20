import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ExchangeDashboard = () => {
  const [currentRate, setCurrentRate] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [inrInput, setInrInput] = useState('');
  const [usdInput, setUsdInput] = useState('');
  const [timeRange, setTimeRange] = useState(30);
  const [lastUpdated, setLastUpdated] = useState('--');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current exchange rate
  const fetchCurrentRate = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      if (response.data && response.data.rates && response.data.rates.INR) {
        setCurrentRate(response.data.rates.INR);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching current rate:', error);
      // Fallback to mock data
      setCurrentRate(83.25);
      setLastUpdated(new Date().toLocaleTimeString());
      setError('Using mock data - API unavailable');
    }
  };

  // Generate mock historical data
  const generateMockHistoricalData = (days) => {
    const data = [];
    const baseRate = 83.25;
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const randomChange = (Math.random() - 0.5) * 2;
      const trend = Math.sin(i / 7) * 0.5;
      const rate = baseRate + randomChange + trend;
      
      data.push({
        date: date.toISOString().split('T')[0],
        rate: parseFloat(rate.toFixed(4)),
        change: i === 0 ? 0 : parseFloat((rate - (data[data.length - 1]?.rate || baseRate)).toFixed(4)),
        changePercent: i === 0 ? 0 : parseFloat(((rate - (data[data.length - 1]?.rate || baseRate)) / (data[data.length - 1]?.rate || baseRate) * 100).toFixed(2))
      });
    }
    
    return data;
  };

  // Fetch historical data
  const fetchHistoricalData = async (days = 30) => {
    try {
      const data = generateMockHistoricalData(days);
      setHistoricalData(data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      setHistoricalData(generateMockHistoricalData(days));
    }
  };

  // Initialize dashboard
  useEffect(() => {
    const initializeDashboard = async () => {
      setIsLoading(true);
      try {
        await fetchCurrentRate();
        await fetchHistoricalData(timeRange);
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    initializeDashboard();
  }, [timeRange]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetchCurrentRate();
      } catch (error) {
        console.error('Auto-refresh failed:', error);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate statistics
  const calculateStatistics = () => {
    if (historicalData.length === 0) return { highest: 0, lowest: 0, average: 0, volatility: 0 };
    
    const rates = historicalData.map(d => d.rate);
    const highest = Math.max(...rates);
    const lowest = Math.min(...rates);
    const average = rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
    const variance = rates.reduce((sum, rate) => sum + Math.pow(rate - average, 2), 0) / rates.length;
    const volatility = Math.sqrt(variance);
    
    return { highest, lowest, average, volatility };
  };

  const stats = calculateStatistics();

  // Chart data
  const chartData = {
    labels: historicalData.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [{
      label: 'INR to USD Rate',
      data: historicalData.map(d => d.rate),
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#3b82f6',
      pointBorderColor: '#1d4ed8',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#1f2937'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Rate: ₹${context.parsed.y.toFixed(4)}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#1f2937'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'INR per USD',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#1f2937'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return '₹' + value.toFixed(2);
          }
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Conversion functions
  const convertINRToUSD = () => {
    if (inrInput && currentRate) {
      const usdValue = parseFloat(inrInput) / currentRate;
      setUsdInput(usdValue.toFixed(4));
    }
  };

  const convertUSDToINR = () => {
    if (usdInput && currentRate) {
      const inrValue = parseFloat(usdInput) * currentRate;
      setInrInput(inrValue.toFixed(2));
    }
  };

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
    setIsLoading(true);
    try {
      await fetchCurrentRate();
      await fetchHistoricalData(timeRange);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setError('Failed to refresh data');
    } finally {
      setIsLoading(false);
    }
  };

  const getChangeIndicator = (change) => {
    if (change > 0) return 'text-green-600 bg-green-100';
    if (change < 0) return 'text-red-600 bg-red-100';
    return 'text-gray-600 bg-gray-100';
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
              {historicalData.length > 1 && (
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getChangeIndicator(historicalData[historicalData.length - 1].change)}`}>
                    {historicalData[historicalData.length - 1].change >= 0 ? '+' : ''}{historicalData[historicalData.length - 1].change.toFixed(4)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getChangeIndicator(historicalData[historicalData.length - 1].changePercent)}`}>
                    ({historicalData[historicalData.length - 1].changePercent >= 0 ? '+' : ''}{historicalData[historicalData.length - 1].changePercent.toFixed(2)}%)
                  </span>
                </div>
              )}
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
                    readOnly
                    className="flex-1 p-4 border-2 border-gray-200 rounded-xl text-lg bg-gray-50"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={convertINRToUSD}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    INR → USD
                  </button>
                  <button
                    onClick={convertUSDToINR}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    USD → INR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                <i className="fas fa-arrow-up text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Highest (30 days)</h3>
                <p className="text-2xl font-bold text-gray-800">₹{stats.highest.toFixed(4)}</p>
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
                <p className="text-2xl font-bold text-gray-800">₹{stats.lowest.toFixed(4)}</p>
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
                <p className="text-2xl font-bold text-gray-800">₹{stats.average.toFixed(4)}</p>
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
                <p className="text-2xl font-bold text-gray-800">±{stats.volatility.toFixed(4)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-800">Historical Exchange Rate Trend</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(parseInt(e.target.value))}
              className="px-6 py-3 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
              <option value={365}>Last year</option>
            </select>
          </div>
          <div className="h-96 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Historical Data Table */}
        <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Recent Exchange Rates</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide">INR to USD</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide">Change</th>
                  <th className="px-6 py-4 text-left font-semibold uppercase tracking-wide">Change %</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.slice(-10).reverse().map((entry, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 border-b border-gray-200">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 font-semibold">
                      ₹{entry.rate.toFixed(4)}
                    </td>
                    <td className={`px-6 py-4 border-b border-gray-200 font-semibold ${getChangeIndicator(entry.change)}`}>
                      {entry.change >= 0 ? '+' : ''}{entry.change.toFixed(4)}
                    </td>
                    <td className={`px-6 py-4 border-b border-gray-200 font-semibold ${getChangeIndicator(entry.changePercent)}`}>
                      {entry.changePercent >= 0 ? '+' : ''}{entry.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDashboard;
