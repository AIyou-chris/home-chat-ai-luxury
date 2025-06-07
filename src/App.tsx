import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import { TestConnection } from './TestConnection';
import { RealtorDashboard } from './RealtorDashboard';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserProfile } from './components/UserProfile';

// Layout Components
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">HomeListingAI</h1>
        <nav>
          <AuthButtons />
        </nav>
      </div>
    </header>
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </main>
  </div>
);

const AuthButtons: React.FC = () => {
  const { user, signOut } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Welcome, {user.user_metadata?.name || user.email}</span>
        <button
          onClick={signOut}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="space-x-4">
      <a
        href="/login"
        className="text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        Sign in
      </a>
      <a
        href="/signup"
        className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
      >
        Sign up
      </a>
    </div>
  );
};

// Auth Pages
const LoginPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🏠 HomeListingAI</h1>
        <p className="text-gray-600">Smart AI-powered listings for realtors</p>
      </div>
      <LoginForm />
    </div>
  </div>
);

const SignupPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create an Account</h1>
        <p className="text-gray-600">Join HomeListingAI today</p>
      </div>
      <SignupForm />
    </div>
  </div>
);

const ForgotPasswordPage: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
      </div>
      <ForgotPasswordForm />
    </div>
  </div>
);

const ProfilePage: React.FC = () => (
  <Layout>
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h2>
      <UserProfile />
    </div>
  </Layout>
);

// Dashboard Component
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
        <p className="text-gray-600">
          Welcome back, {user?.user_metadata?.name || user?.email}! You're now logged in.
        </p>
      </div>
    </Layout>
  );
};

// PropertyScraper Component
const PropertyScraper: React.FC = () => {
  return (
    <Layout>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Property</h2>
        <p className="text-gray-600">
          Property scraper will be implemented here.
        </p>
      </div>
    </Layout>
  );
};

// AppRoutes component that uses the auth context
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><RealtorDashboard /></ProtectedRoute>} />
      <Route path="/add-listing" element={<ProtectedRoute><PropertyScraper /></ProtectedRoute>} />
      <Route path="/test-connection" element={<TestConnection />} />
    </Routes>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
