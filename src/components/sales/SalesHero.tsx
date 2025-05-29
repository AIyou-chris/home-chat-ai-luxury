
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

export const SalesHero = () => {
  const handleDemoClick = () => {
    window.location.href = '/';
  };

  const handleGetStartedClick = () => {
    window.location.href = '/realtor-submit';
  };

  const slideshowImages = [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1920&h=1080&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&h=1080&q=80'
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full h-full"
        >
          <CarouselContent className="h-screen">
            {slideshowImages.map((image, index) => (
              <CarouselItem key={index} className="relative h-full">
                <div 
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${image})`,
                  }}
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/50" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header with Left-Justified Bigger Logo */}
        <div className="w-full px-4 py-6">
          <div className="max-w-7xl mx-auto flex justify-start">
            <img 
              src="/lovable-uploads/cb12bb65-883d-4a31-97ea-4169a51747eb.png" 
              alt="Home Listing AI" 
              className="h-20 md:h-24 lg:h-28 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-4xl">
              <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-6 inline-block">
                🚀 Revolutionary AI Technology for Real Estate
              </Badge>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white mb-6">
                Turn Every Listing Into a 
                <span className="text-orange-500 block">24/7 Sales Agent</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 max-w-3xl">
                Stop losing leads after hours. Our AI-powered chat system answers buyer questions instantly, 
                schedules appointments, and captures leads while you sleep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  onClick={handleDemoClick}
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Play className="mr-2" size={20} />
                  See Live Demo
                </Button>
                
                <Button
                  onClick={handleGetStartedClick}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="text-green-400" size={20} />
                  <span className="text-sm text-gray-300">300% more leads</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">24/7 availability</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-300">Voice & text chat</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Preview Card - Positioned in bottom right */}
        <div className="absolute bottom-8 right-8 hidden lg:block">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-sm">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <h3 className="text-white font-semibold">Live Property Chat Demo</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-end">
                <div className="bg-blue-500 text-white p-3 rounded-xl max-w-xs text-sm">
                  "Is the kitchen recently renovated?"
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-xl max-w-xs text-sm">
                  "Yes! The kitchen was completely renovated in 2023 with Italian marble countertops and premium appliances."
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={handleDemoClick}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-sm"
                >
                  Try It Yourself →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-advance slideshow script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            setInterval(() => {
              const nextButton = document.querySelector('[data-carousel-next]');
              if (nextButton) nextButton.click();
            }, 5000);
          `
        }}
      />
    </div>
  );
};
