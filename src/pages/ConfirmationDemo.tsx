import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Clock, Zap, Users, Home, MessageSquare, Calendar, QrCode, Download } from 'lucide-react';
import { CostEstimator } from '@/components/CostEstimator';

const ConfirmationDemo = () => {
  const demoData = {
    agentEmail: 'sarah.johnson@realestate.com',
    listingUrl: 'https://mls.com/property/12345',
    plan: {
      name: 'Professional Plan',
      price: 69
    },
    paymentId: 'demo_payment_12345'
  };

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

  const demoStats = [
    {
      icon: <Home className="text-blue-600" size={20} />,
      label: "Active Listings",
      value: "3",
      change: "+1 this month"
    },
    {
      icon: <Users className="text-green-600" size={20} />,
      label: "New Leads",
      value: "47",
      change: "+23 this week"
    },
    {
      icon: <MessageSquare className="text-purple-600" size={20} />,
      label: "AI Conversations",
      value: "156",
      change: "+89 this week"
    },
    {
      icon: <Calendar className="text-orange-600" size={20} />,
      label: "Appointments Booked",
      value: "12",
      change: "+8 this week"
    }
  ];

  // QR Code for demo listing
  const currentUrl = window.location.origin + '/demo';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&ecc=H&data=${encodeURIComponent(currentUrl)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `demo-listing-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-6">
            <CheckCircle className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demo Setup Complete! 🎉
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to your demo environment. Here's what you can expect when you go live...
          </p>
        </div>

        {/* Demo Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {demoStats.map((stat, index) => (
            <Card key={index} className="p-4 bg-white">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {stat.icon}
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Order Details */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Demo Configuration</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">{demoData.plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium">${demoData.plan.price}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Demo Agent:</span>
                <span className="font-medium">{demoData.agentEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sample Listing:</span>
                <span className="font-medium text-blue-600">Beverly Hills Estate</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">Live & Ready</span>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">What Happens Next</h3>
            <div className="space-y-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-600 mb-1">{step.description}</p>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-500">{step.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* QR Code Marketing Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <QrCode className="text-orange-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Demo Marketing QR Code</h3>
            </div>
            <p className="text-gray-600 mb-6">
              High-resolution QR code for your demo listing - share with prospects and clients
            </p>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src={qrCodeUrl}
                  alt="Demo listing QR code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <Button
                onClick={downloadQRCode}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
              >
                <Download className="mr-2" size={18} />
                Download Demo QR Code
              </Button>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Explore Dashboard
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              onClick={() => window.location.href = '/demo'}
              variant="outline"
              className="px-8 py-3 text-lg"
              size="lg"
            >
              Try Live Demo
            </Button>
            <Button
              onClick={() => window.location.href = '/submit'}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Start Real Listing
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This is a demonstration environment. Ready to create your first real listing?
          </p>
        </div>

        {/* Improvements Section */}
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">🚀 Suggested Improvements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">User Experience</h4>
              <ul className="text-purple-600 space-y-1">
                <li>• Add property video tours integration</li>
                <li>• Implement progressive web app features</li>
                <li>• Add dark mode support</li>
                <li>• Mobile app companion for agents</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-purple-700">AI Features</h4>
              <ul className="text-purple-600 space-y-1">
                <li>• Multilingual support (Spanish, Mandarin)</li>
                <li>• Property comparison AI</li>
                <li>• Market trend predictions</li>
                <li>• Automated follow-up sequences</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Contact Info */}
        <div className="mt-8 text-center">
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

export default ConfirmationDemo;
