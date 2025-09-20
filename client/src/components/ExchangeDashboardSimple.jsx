import React from 'react';

const ExchangeDashboardSimple = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            INR to USD Dashboard
          </h1>
          <div className="text-center">
            <p className="text-xl text-gray-600 mb-4">
              This is a simple test version of the dashboard.
            </p>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                Current Exchange Rate
              </h2>
              <p className="text-3xl font-bold text-blue-900">
                ₹83.25 = $1.00 USD
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDashboardSimple;
