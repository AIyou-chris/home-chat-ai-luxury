
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';

export const SalesHero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8 text-center lg:text-left">
            <Badge className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 hover:bg-orange-200 transition-all duration-300 hover:scale-105">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Real Estate</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Turn Every Property Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 animate-fade-in">
                24/7 Sales Agent
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
              AI chat that answers buyer questions instantly, schedules appointments, 
              and captures leads while you sleep. 
              <span className="font-semibold text-orange-600">300% more leads guaranteed.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                onClick={() => window.location.href = '/demo-scraping'}
              >
                Try Free Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Pricing
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 hover:scale-105">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">300% More Leads</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 hover:scale-105">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">24/7 Availability</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600 transition-all duration-300 hover:scale-105">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Instant Setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Demo Preview */}
          <div className="relative lg:ml-8">
            <div className="relative">
              <img
                src="/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png"
                alt="AI Chat Demo"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              />
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce">
                Live Demo →
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">AI Agent Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
