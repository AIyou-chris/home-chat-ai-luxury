
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Zap, Star, Crown } from 'lucide-react';

export const PricingSection = () => {
  const features = [
    "AI-powered property chat",
    "Voice interaction capability", 
    "Auto appointment scheduling",
    "Lead capture & qualification",
    "Instant lead notifications",
    "Property knowledge base",
    "QR code generation",
    "Multi-language support",
    "24/7 availability",
    "Analytics dashboard"
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors duration-300">
            <Zap className="w-4 h-4 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            One Price. Everything Included.
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No hidden fees, no per-lead charges, no setup costs. 
            Get everything you need to transform your listings into lead magnets.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <Card className="relative border-2 border-orange-500 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold">
                <Crown className="w-4 h-4 mr-1" />
                MOST POPULAR
              </Badge>
            </div>
            
            <CardHeader className="text-center pb-8 pt-12">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                Complete AI Solution
              </CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-bold text-gray-900">$59</span>
                <span className="text-xl text-gray-600">/month</span>
              </div>
              <p className="text-gray-600">
                Everything you need to capture 300% more leads
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <ul className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                onClick={() => window.location.href = '/checkout'}
              >
                Start Free Trial
              </Button>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  15-day money back guarantee
                </p>
                <div className="flex justify-center space-x-4 text-xs text-gray-400">
                  <span>✓ No setup fees</span>
                  <span>✓ Cancel anytime</span>
                  <span>✓ No contracts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-4">
            Trusted by real estate professionals nationwide
          </p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-medium">4.9/5 Rating</span>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
        </div>
      </div>
    </section>
  );
};
