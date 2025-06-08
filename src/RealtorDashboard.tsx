import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

export const RealtorDashboard: React.FC = () => {
  const { user } = useAuth();
  console.log('RealtorDashboard user:', user);

  // Show debug info if user is missing
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold mb-4">No user found</h2>
          <p className="mb-4">You are not logged in or the user context is missing.</p>
          <pre className="bg-gray-100 p-2 rounded text-xs text-left max-w-md overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>
          <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Go to Login</Link>
        </div>
      </div>
    );
  }

  // Simplified dashboard with demo data for now
  const analytics = {
    activeListings: 3,
    totalLeads: 12,
    totalValue: 850000,
    conversionRate: 25
  };
  
  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(analytics.totalValue);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Welcome back, {user?.user_metadata?.name || user?.email}! Here's your performance overview.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/add-listing"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Listing
          </Link>
          <Link
            to="/saved-listings"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Saved Listings
          </Link>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Listings" value={analytics.activeListings} description="Total properties currently on the market." />
        <StatCard title="Total Leads" value={analytics.totalLeads} description="All leads generated across all listings." />
        <StatCard title="Portfolio Value" value={formattedValue} description="Estimated market value of all active listings." />
        <StatCard title="Conversion Rate" value={`${analytics.conversionRate}%`} description="Percentage of leads marked as 'closed'." />
      </div>
      
      {/* Test Database Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Database Save</h2>
        <p className="text-gray-600 mb-4">
          Ready to test the checkout flow and database save functionality!
        </p>
        <Link
          to="/add-listing"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Test Listing & Checkout Flow
        </Link>
      </div>
    </div>
  );
}; 