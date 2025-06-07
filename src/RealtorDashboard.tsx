import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getRealtorAnalytics } from './supabaseClient';

// Define the structure for the analytics data
type AnalyticsData = {
  activeListings: number;
  totalLeads: number;
  qrScans: number;
  totalValue: number;
  newLeads: number;
  qualifiedLeads: number;
  closedLeads: number;
  conversionRate: number;
  leadSources: Record<string, number>;
  recentLeads: number;
  recentScans: number;
  averageLeadScore: number;
};

const StatCard: React.FC<{ title: string; value: string | number; description: string }> = ({ title, value, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    <p className="mt-2 text-sm text-gray-500">{description}</p>
  </div>
);

export const RealtorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getRealtorAnalytics(user.id);
          setAnalytics(data);
        } catch (err) {
          setError('Failed to fetch analytics data.');
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!analytics) {
    return <div className="text-center py-10">No analytics data available.</div>;
  }
  
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
        <div className="mt-4 sm:mt-0">
          <Link
            to="/add-listing"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Listing
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
      
      {/* More detailed analytics can be added here */}
      
    </div>
  );
}; 