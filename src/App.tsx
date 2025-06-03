
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import SalesPage from "./pages/SalesPage";
import RealtorSubmission from "./pages/RealtorSubmission";
import ConfirmationPage from "./pages/ConfirmationPage";
import ConfirmationDemo from "./pages/ConfirmationDemo";
import CheckoutPage from "./pages/CheckoutPage";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DemoWithScraping from "./pages/DemoWithScraping";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SalesPage />} />
            <Route path="/demo" element={<Index />} />
            <Route path="/demo-scraping" element={<DemoWithScraping />} />
            <Route path="/submit" element={<RealtorSubmission />} />
            <Route path="/realtor-submit" element={<RealtorSubmission />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/confirmation-demo" element={<ConfirmationDemo />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/dashboard" element={<AgentDashboard />} />
            <Route path="/agent-dashboard" element={<AgentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
