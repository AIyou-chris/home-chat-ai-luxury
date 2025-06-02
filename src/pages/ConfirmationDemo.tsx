
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Download, MessageSquare, Settings, Calendar, Zap, Rocket } from 'lucide-react';

const ConfirmationDemo = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Sample order data
  const orderData = {
    orderId: 'HLA-2024-001234',
    paymentId: 'pi_3QR4S5H2eZvKYlo2CX8m9nF1',
    plan: {
      name: 'Professional Plan',
      price: '$99',
      period: 'month',
      features: [
        'AI-Powered Property Assistant',
        'Unlimited Property Listings',
        'Advanced Lead Capture',
        'Custom Branding',
        'Analytics Dashboard',
        'Priority Support'
      ]
    },
    agent: {
      email: 'demo.agent@realty.com',
      name: 'Demo Agent',
      company: 'Premium Realty Group'
    },
    listingUrl: 'https://example.com/sample-listing',
    createdAt: new Date().toISOString()
  };

  const nextSteps = [
    {
      step: 1,
      title: 'AI Generation in Progress',
      description: 'Our AI is creating your personalized property assistant',
      status: 'in-progress',
      icon: Zap,
      estimatedTime: '2-5 minutes'
    },
    {
      step: 2,
      title: 'Integration Setup',
      description: 'Setting up your custom listing page and lead capture system',
      status: 'pending',
      icon: Settings,
      estimatedTime: '5-10 minutes'
    },
    {
      step: 3,
      title: 'Go Live',
      description: 'Your AI-powered listing will be ready for visitors',
      status: 'pending',
      icon: Rocket,
      estimatedTime: '10-15 minutes'
    }
  ];

  const handleDownloadReceipt = () => {
    setIsDownloading(true);
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Order Confirmed - Home Listing AI</title>
        <meta name="description" content="Your Home Listing AI subscription has been confirmed. Your AI-powered property assistant is being set up." />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for choosing Home Listing AI. Your AI assistant is being created.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Order Summary
                    <Badge variant="outline">#{orderData.orderId}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{orderData.plan.name}</h3>
                      <p className="text-gray-600">Billed {orderData.plan.period}ly</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {orderData.plan.price}<span className="text-sm text-gray-600">/{orderData.plan.period}</span>
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">Plan Features:</h4>
                    <ul className="space-y-1">
                      {orderData.plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment ID:</span>
                      <span className="font-mono text-gray-900">{orderData.paymentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Agent Email:</span>
                      <span className="text-gray-900">{orderData.agent.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Listing URL:</span>
                      <span className="text-blue-600 truncate max-w-48">{orderData.listingUrl}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Happening Next</CardTitle>
                  <CardDescription>
                    We're setting up your AI-powered listing. Here's what's happening behind the scenes:
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {nextSteps.map((step) => {
                      const Icon = step.icon;
                      return (
                        <div key={step.step} className="flex items-start space-x-4">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            step.status === 'in-progress' 
                              ? 'bg-orange-100 text-orange-600' 
                              : step.status === 'completed'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900">{step.title}</h3>
                              <Badge 
                                variant={step.status === 'in-progress' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {step.status === 'in-progress' ? 'In Progress' : 'Pending'}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              Estimated time: {step.estimatedTime}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full"
                    onClick={handleDownloadReceipt}
                    disabled={isDownloading}
                  >
                    <Download className="mr-2" size={16} />
                    {isDownloading ? 'Downloading...' : 'Download Receipt'}
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2" size={16} />
                    Contact Support
                  </Button>
                  
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2" size={16} />
                    Schedule Demo Call
                  </Button>
                </CardContent>
              </Card>

              {/* Important Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Important Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Setup Notification</h4>
                    <p className="text-gray-600">
                      You'll receive an email at <strong>{orderData.agent.email}</strong> when your listing is ready.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Access Your Dashboard</h4>
                    <p className="text-gray-600">
                      Use the same email to log into your agent dashboard and manage your listings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Need Help?</h4>
                    <p className="text-gray-600">
                      Our support team is available 24/7 to help you get the most out of your AI assistant.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Billing Information</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Billing Date:</span>
                    <span className="text-gray-900">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="text-gray-900">{orderData.plan.price}</span>
                  </div>
                  <p className="text-xs text-gray-500 pt-2">
                    You can cancel or modify your subscription anytime from your dashboard.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationDemo;
