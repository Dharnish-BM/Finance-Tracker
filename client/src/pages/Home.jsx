import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Finance Tracker
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Your comprehensive financial management solution. Track expenses, monitor exchange rates, 
            and gain insights into your financial health with our powerful analytics tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/exchange"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <i className="fas fa-exchange-alt mr-2"></i>
              View Exchange Rates
            </Link>
            <Link
              to="/transactions"
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <i className="fas fa-list mr-2"></i>
              Manage Transactions
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-exchange-alt text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Real-time Exchange Rates</h3>
            <p className="text-gray-600 mb-6">
              Get live INR to USD exchange rates with historical data, charts, and conversion tools.
            </p>
            <Link
              to="/exchange"
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              View Exchange Rates →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-list text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Transaction Management</h3>
            <p className="text-gray-600 mb-6">
              Track your income and expenses with detailed categorization and smart insights.
            </p>
            <Link
              to="/transactions"
              className="text-green-600 font-semibold hover:text-green-700 transition-colors"
            >
              Manage Transactions →
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <i className="fas fa-chart-bar text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced Analytics</h3>
            <p className="text-gray-600 mb-6">
              Visualize your financial data with interactive charts and comprehensive reports.
            </p>
            <Link
              to="/analytics"
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
            >
              View Analytics →
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose Finance Tracker?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Secure</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Real-time Updates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Currencies Supported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust Finance Tracker for their financial management needs.
          </p>
          <Link
            to="/exchange"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
          >
            Get Started Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
