import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  // Sample data - in a real app, this would come from your state management or API
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [75000, 75000, 80000, 75000, 85000, 90000],
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: [45000, 50000, 55000, 48000, 52000, 58000],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
      }
    ]
  };

  const categoryData = {
    labels: ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Other'],
    datasets: [{
      data: [15000, 8000, 12000, 5000, 10000, 5000],
      backgroundColor: [
        '#3B82F6',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#8B5CF6',
        '#6B7280'
      ],
      borderWidth: 0,
    }]
  };

  const trendData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
      label: 'Weekly Balance',
      data: [25000, 30000, 28000, 32000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Analytics</h1>
          <p className="text-xl text-gray-600">Insights into your financial patterns and trends</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-arrow-up text-green-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Income</p>
                <p className="text-2xl font-bold text-gray-900">₹4,80,000</p>
                <p className="text-sm text-green-600">+12% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-arrow-down text-red-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900">₹3,08,000</p>
                <p className="text-sm text-red-600">+8% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-wallet text-blue-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Net Savings</p>
                <p className="text-2xl font-bold text-gray-900">₹1,72,000</p>
                <p className="text-sm text-green-600">+15% from last month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <i className="fas fa-percentage text-purple-600 text-xl"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Savings Rate</p>
                <p className="text-2xl font-bold text-gray-900">35.8%</p>
                <p className="text-sm text-green-600">+3.2% from last month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Income vs Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Income vs Expenses</h2>
            <div className="h-80">
              <Bar data={monthlyData} options={chartOptions} />
            </div>
          </div>

          {/* Expense Categories */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Expense Categories</h2>
            <div className="h-80">
              <Doughnut data={categoryData} options={doughnutOptions} />
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Weekly Balance Trend</h2>
          <div className="h-80">
            <Line data={trendData} options={chartOptions} />
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Insights</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-check text-green-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Great Savings Rate</p>
                  <p className="text-gray-600 text-sm">Your savings rate of 35.8% is above the recommended 20%</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-exclamation-triangle text-yellow-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">High Food Expenses</p>
                  <p className="text-gray-600 text-sm">Food expenses account for 30% of your total spending</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                  <i className="fas fa-info text-blue-600 text-sm"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Consistent Growth</p>
                  <p className="text-gray-600 text-sm">Your income has grown consistently over the past 6 months</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <h3 className="font-semibold text-blue-900 mb-2">Optimize Food Spending</h3>
                <p className="text-blue-800 text-sm">Consider meal planning to reduce food expenses by 15-20%</p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <h3 className="font-semibold text-green-900 mb-2">Increase Investments</h3>
                <p className="text-green-800 text-sm">With your high savings rate, consider investing in mutual funds</p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <h3 className="font-semibold text-purple-900 mb-2">Track Entertainment</h3>
                <p className="text-purple-800 text-sm">Monitor entertainment expenses to maintain budget discipline</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
