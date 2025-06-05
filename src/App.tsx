
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { detectAnalyticsScripts } from "@/utils/analyticsDetector";
import Index from "./pages/Index";
import Demo from "./pages/Demo";
import DemoWithScraping from "./pages/DemoWithScraping";
import ConfirmationDemo from "./pages/ConfirmationDemo";
import ConfirmationPage from "./pages/ConfirmationPage";
import RealtorSubmission from "./pages/RealtorSubmission";
import CheckoutPage from "./pages/CheckoutPage";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AuthPage from "./pages/AuthPage";
import SalesPage from "./pages/SalesPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering...');

  useEffect(() => {
    console.log('App useEffect running...');
    
    try {
      // Run analytics detection when app starts
      console.log('App mounted - running analytics detection...');
      detectAnalyticsScripts();

      // Set up enhanced error monitoring
      const errorHandler = (event: ErrorEvent) => {
        console.error('App-level error caught:', {
          message: event.error?.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          stack: event.error?.stack,
          timestamp: new Date().toISOString()
        });

        // Special handling for classList errors
        if (event.error?.message?.includes('classList')) {
          console.error('CLASSLIST ERROR IN APP:', {
            error: event.error,
            currentURL: window.location.href,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          });
        }
      };

      window.addEventListener('error', errorHandler);
      console.log('Error handler setup completed');

      return () => {
        window.removeEventListener('error', errorHandler);
      };
    } catch (error) {
      console.error('Error in App useEffect:', error);
    }
  }, []);

  console.log('App about to render JSX...');

  try {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sales" element={<SalesPage />} />
                <Route path="/demo" element={<Demo />} />
                <Route path="/demo-scraping" element={<DemoWithScraping />} />
                <Route path="/confirmation-demo" element={<ConfirmationDemo />} />
                <Route path="/confirmation" element={<ConfirmationPage />} />
                <Route path="/submit" element={<RealtorSubmission />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredRole="agent">
                      <AgentDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error('Error rendering App JSX:', error);
    return (
      <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
        <h2>App Rendering Error</h2>
        <p>There was an error rendering the application.</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ 
            padding: '10px 20px', 
            background: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
        >
          Refresh Page
        </button>
      </div>
    );
  }
};

export default App;
