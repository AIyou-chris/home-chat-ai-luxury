
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Clock, Zap, Users } from 'lucide-react';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { formData, plan, paymentId } = location.state || {};

  useEffect(() => {
    if (!formData || !plan || !paymentId) {
      navigate('/');
    }
  }, [formData, plan, paymentId, navigate]);

  const nextSteps = [
    {
      icon: <Zap className="text-orange-500" size={24} />,
      title: "AI Listing Generation",
      description: "Our AI is creating your intelligent property listing with chat capabilities.",
      time: "2-3 minutes"
    },
    {
      icon: <Users className="text-blue-500" size={24} />,
      title: "Integration Setup",
      description: "Setting up lead capture, appointment booking, and CRM integration.",
      time: "5-10 minutes"
    },
    {
      icon: <CheckCircle className="text-green-500" size={24} />,
      title: "Go Live",
      description: "Your listing will be ready to capture leads 24/7 with AI assistance.",
      time: "Ready soon!"
    }
  ];

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thanks! Your listing is being generated. Here's what happens next...
          </p>
        </div>

        {/* Order Details */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">Order Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{plan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">
                    {typeof plan?.price === 'number' ? `$${plan.price}/month` : plan?.price}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment ID:</span>
                  <span className="font-mono text-xs">{paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Free Trial:</span>
                  <span className="font-medium text-green-600">14 days</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-3">Listing Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Agent Email:</span>
                  <span className="font-medium">{formData?.agentEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Property URL:</span>
                  <span className="font-medium truncate max-w-48">{formData?.listingUrl}</span>
                </div>
                {formData?.contactPhone && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{formData.contactPhone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Next Steps */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Happening Now
          </h2>
          <div className="space-y-6">
            {nextSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-500">{step.time}</span>
                  </div>
                </div>
                {index < nextSteps.length - 1 && (
                  <div className="hidden sm:block w-px h-16 bg-gray-200 ml-3 mt-6"></div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/agent-dashboard')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Go to Dashboard
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-8 py-3 text-lg"
              size="lg"
            >
              View Demo
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            You'll receive an email confirmation shortly with your login details and next steps.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-blue-800 font-medium">
              Questions? Email us at support@homelistingai.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
