
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight, Clock, Zap, Users, QrCode, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Generate high-resolution QR code for the listing
  const listingUrl = formData?.listingUrl || 'https://demo-listing.homelistingai.com';
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&format=png&ecc=H&data=${encodeURIComponent(listingUrl)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `listing-qr-code-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "High-resolution QR code saved for print marketing",
    });
  };

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

        {/* QR Code Marketing Section */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <QrCode className="text-orange-600" size={24} />
              <h3 className="text-xl font-semibold text-gray-800">Marketing QR Code</h3>
            </div>
            <p className="text-gray-600 mb-6">
              High-resolution QR code for your print marketing materials - yard signs, flyers, business cards
            </p>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src={qrCodeUrl}
                  alt="Property listing QR code"
                  className="w-48 h-48 mx-auto"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={downloadQRCode}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3"
                >
                  <Download className="mr-2" size={18} />
                  Download High-Res QR Code
                </Button>
                <div className="text-sm text-gray-600 flex items-center">
                  <span>400x400px • Print Quality • Error Correction</span>
                </div>
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
              onClick={() => navigate('/dashboard')}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              size="lg"
            >
              Go to Dashboard
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button
              onClick={() => navigate('/demo')}
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
