
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Mic, 
  Calendar, 
  TrendingUp, 
  Smartphone, 
  QrCode,
  Play
} from 'lucide-react';

export const FeaturesAndDemoSection = () => {
  console.log('FeaturesAndDemoSection component rendering');
  
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    console.log('FeaturesAndDemoSection useEffect triggered');
    console.log('Current selectedImage:', selectedImage);
  }, [selectedImage]);

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
      highlight: true
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
      highlight: true
    },
    {
      icon: <Smartphone className="text-indigo-500" size={32} />,
      title: "SMS Notifications",
      description: "Instant alerts when prospects engage, with detailed conversation summaries.",
      highlight: false
    },
    {
      icon: <QrCode className="text-cyan-500" size={32} />,
      title: "QR Code Marketing",
      description: "Generate QR codes for print materials that lead directly to your AI-powered listing.",
      highlight: false
    }
  ];

  const demoImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2940&auto=format&fit=crop"
  ];

  const handleDemoClick = () => {
    console.log('Demo click handler triggered');
    try {
      console.log('About to navigate to /demo');
      window.location.href = '/demo';
      console.log('Demo navigation initiated successfully');
    } catch (error) {
      console.error('Error in handleDemoClick:', error);
    }
  };

  const handleImageSelect = (index: number) => {
    console.log('Image select handler triggered with index:', index);
    try {
      console.log('Previous selectedImage:', selectedImage);
      setSelectedImage(index);
      console.log('New selectedImage set to:', index);
    } catch (error) {
      console.error('Error in handleImageSelect:', error);
    }
  };

  const handleStartTrial = () => {
    console.log('Start trial handler triggered');
    try {
      console.log('About to navigate to /submit');
      window.location.href = '/submit';
      console.log('Trial navigation initiated successfully');
    } catch (error) {
      console.error('Error in handleStartTrial:', error);
    }
  };

  console.log('FeaturesAndDemoSection about to render JSX');

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => {
            console.log(`Rendering feature ${index}:`, feature.title);
            return (
              <Card 
                key={index} 
                className={`p-6 h-full ${
                  feature.highlight 
                    ? 'border-orange-200 bg-orange-50' 
                    : ''
                }`}
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 flex-1">{feature.description}</p>
                  {feature.highlight && (
                    <Badge className="bg-orange-500 text-white mt-4 self-start">
                      Most Popular
                    </Badge>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience our AI-powered property chat yourself. This is a real listing with full AI capabilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-orange-500 p-4 flex items-center justify-between">
                <h3 className="text-white font-semibold text-sm sm:text-base">Live Demo: $4.75M Beverly Hills Estate</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>
              
              <div className="p-6">
                <img 
                  src={demoImages[selectedImage]}
                  alt="Luxury Property Demo"
                  className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                  onClick={handleDemoClick}
                  onLoad={() => console.log(`Demo image ${selectedImage} loaded successfully`)}
                  onError={(e) => console.error(`Demo image ${selectedImage} failed to load:`, e)}
                />
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {demoImages.map((image, index) => {
                    console.log(`Rendering thumbnail ${index}`);
                    return (
                      <button
                        key={index}
                        onClick={() => handleImageSelect(index)}
                        className={`aspect-square rounded overflow-hidden ${
                          selectedImage === index
                            ? 'ring-2 ring-orange-400'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onLoad={() => console.log(`Thumbnail ${index} loaded successfully`)}
                          onError={(e) => console.error(`Thumbnail ${index} failed to load:`, e)}
                        />
                      </button>
                    );
                  })}
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 text-sm font-medium">Visitor</span>
                      <span className="text-gray-400 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white text-sm">"What's the neighborhood like for families?"</p>
                  </div>
                  
                  <div className="bg-orange-500 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">AI Assistant</span>
                      <span className="text-orange-100 text-xs">2:31 PM</span>
                    </div>
                    <p className="text-white text-sm">"This Beverly Hills location is excellent for families! You're within walking distance of top-rated schools, family parks, and safe neighborhood streets. Would you like me to schedule a family-friendly tour?"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Try Our Full-Featured Demo
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                This isn't a fake demo - it's our actual AI system running on a real luxury property listing. 
                Chat with the AI, ask questions, and see how it captures leads.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Ask about property features, neighborhood, schools</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Experience voice chat capabilities</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">See automatic appointment scheduling</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                <span className="text-gray-700">Watch lead capture in action</span>
              </div>
            </div>

            <Button
              onClick={handleDemoClick}
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-lg"
            >
              <Play className="mr-2" size={20} />
              Try Live Demo
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Listings?
          </h3>
          <p className="text-gray-600 mb-6">
            Join hundreds of agents who have increased their lead generation by 300% with our AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleDemoClick}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 font-semibold"
            >
              See Live Demo
            </Button>
            <Button 
              onClick={handleStartTrial}
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 font-semibold"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
