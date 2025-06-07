import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Mic, 
  Calendar, 
  TrendingUp, 
  Smartphone, 
  QrCode,
  BarChart3,
  Clock
} from 'lucide-react';
import { ProBadge } from '@/components/ProBadge';

export const FeaturesShowcase = () => {
  const features = [
    {
      icon: <MessageSquare className="text-blue-500" size={32} />,
      title: "Intelligent Chat System",
      description: "AI-powered conversations that understand context and provide detailed property information 24/7.",
      highlight: false
    },
    {
      icon: <Mic className="text-purple-500" size={32} />,
      title: "Voice Interaction",
      description: "Natural voice conversations with lifelike AI that can answer complex questions about your property.",
      highlight: true,
      isPro: true
    },
    {
      icon: <Calendar className="text-green-500" size={32} />,
      title: "Auto Appointment Booking",
      description: "Seamless scheduling integration that books showings directly into your calendar system.",
      highlight: false
    },
    {
      icon: <TrendingUp className="text-orange-500" size={32} />,
      title: "Lead Analysis",
      description: "Advanced scoring and qualification of prospects with detailed behavioral insights.",
      highlight: true,
      isPro: true
    },
    {
      icon: <Smartphone className="text-indigo-500" size={32} />,
      title: "SMS Notifications",
      description: "Instant alerts when prospects engage, with detailed conversation summaries.",
      highlight: false,
      isPro: true
    },
    {
      icon: <QrCode className="text-cyan-500" size={32} />,
      title: "QR Code Marketing",
      description: "Generate QR codes for print materials that lead directly to your AI-powered listing.",
      highlight: false
    },
    {
      icon: <BarChart3 className="text-red-500" size={32} />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights into visitor behavior, engagement patterns, and conversion metrics.",
      highlight: false
    },
    {
      icon: <Clock className="text-amber-500" size={32} />,
      title: "24/7 Availability",
      description: "Never miss a lead again with round-the-clock AI assistance that works while you sleep.",
      highlight: false
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
            🚀 Powerful Features
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to
            <span className="text-orange-500 block">Capture More Leads</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform combines cutting-edge technology with proven real estate practices 
            to maximize your listing's potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`p-6 h-full transition-all duration-300 hover:shadow-lg ${
                feature.highlight 
                  ? 'border-orange-200 bg-gradient-to-br from-orange-50 to-white' 
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  {feature.isPro && <ProBadge size="sm" />}
                </div>
                <p className="text-gray-600 flex-1">{feature.description}</p>
                {feature.highlight && (
                  <Badge className="bg-orange-500 text-white mt-4 self-start">
                    Most Popular
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Listings?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of agents who have increased their lead generation by 300% with our AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/demo'}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                See Live Demo
              </button>
              <button 
                onClick={() => window.location.href = '/submit'}
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl font-semibold transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
