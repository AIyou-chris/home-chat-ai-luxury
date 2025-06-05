
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Zap, TrendingUp, Users } from 'lucide-react';
import { useEffect } from 'react';
import { safeQuerySelector, safeScrollIntoView, waitForElement } from '@/utils/domSafetyUtils';

export const SalesHero = () => {
  console.log('SalesHero component rendering');

  useEffect(() => {
    console.log('SalesHero useEffect - setting up component with safety measures');
    
    // Enhanced safety checks and analytics detection
    const checkForInterference = () => {
      console.log('Checking for potential script interference...');
      
      // Check for Hotjar interference
      if ((window as any).hj) {
        console.warn('Hotjar detected - potential interference risk');
        try {
          // Disable Hotjar to prevent classList errors
          delete (window as any).hj;
          console.log('Hotjar disabled for safety');
        } catch (e) {
          console.error('Error disabling Hotjar:', e);
        }
      }
      
      // Check for problematic scripts
      const problematicScripts = document.querySelectorAll('script[src*="hotjar"], script[src*="static.hotjar.com"]');
      if (problematicScripts.length > 0) {
        console.warn(`Found ${problematicScripts.length} potentially problematic scripts`);
        problematicScripts.forEach((script, index) => {
          console.warn(`Script ${index}:`, (script as HTMLScriptElement).src);
        });
      }
      
      // Check for elements that might be targeted by analytics
      const hotjarElements = document.querySelectorAll('[id*="hotjar"], [class*="hotjar"], [data-hj]');
      if (hotjarElements.length > 0) {
        console.warn(`Found ${hotjarElements.length} Hotjar-related elements that might cause issues`);
      }
    };

    checkForInterference();

    // Enhanced error listener specifically for this component
    const componentErrorHandler = (event: ErrorEvent) => {
      if (event.error && event.error.message && 
          (event.error.message.includes('classList') || event.error.message.includes('hj'))) {
        console.error('SalesHero component detected interference error:', {
          message: event.error.message,
          stack: event.error.stack,
          component: 'SalesHero',
          timestamp: new Date().toISOString()
        });
      }
    };

    window.addEventListener('error', componentErrorHandler);

    return () => {
      window.removeEventListener('error', componentErrorHandler);
    };
  }, []);

  const handleTryDemo = () => {
    console.log('Try Free Demo clicked - using safe navigation');
    try {
      console.log('About to navigate to /demo-scraping');
      window.location.href = '/demo-scraping';
      console.log('Navigation initiated successfully');
    } catch (error) {
      console.error('Error in handleTryDemo:', error);
    }
  };

  const handleSeePricing = async () => {
    console.log('See Pricing clicked - using safe scroll with DOM protection');
    try {
      console.log('Looking for pricing element with ID: pricing');
      
      // Use safe DOM manipulation
      const pricingElement = safeQuerySelector('#pricing');
      console.log('Pricing element found:', pricingElement);
      
      if (pricingElement) {
        console.log('About to scroll to pricing element safely');
        const scrollSuccess = safeScrollIntoView(pricingElement);
        if (scrollSuccess) {
          console.log('Safe scroll completed successfully');
        } else {
          console.log('Safe scroll failed, trying fallback');
          // Fallback: wait for element and try again
          const waitedElement = await waitForElement('#pricing', 2000);
          if (waitedElement) {
            safeScrollIntoView(waitedElement);
          } else {
            // Ultimate fallback: scroll to bottom
            try {
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
              console.log('Fallback scroll to bottom executed');
            } catch (scrollError) {
              console.error('All scroll methods failed:', scrollError);
            }
          }
        }
      } else {
        console.warn('Pricing element not found, using fallback scroll');
        try {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
          console.log('Fallback scroll to bottom executed');
        } catch (scrollError) {
          console.error('Fallback scroll also failed:', scrollError);
        }
      }
    } catch (error) {
      console.error('Error in handleSeePricing:', error);
    }
  };

  console.log('SalesHero about to render JSX with enhanced safety');

  return (
    <section className="min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-center lg:text-left">
            <Badge className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Real Estate</span>
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
              Turn Every Property Into a{' '}
              <span className="text-orange-500">
                24/7 Sales Agent
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              AI chat that answers buyer questions instantly, schedules appointments, 
              and captures leads while you sleep. 
              <span className="font-semibold text-orange-600">300% more leads guaranteed.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
                onClick={handleTryDemo}
              >
                Try Free Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
                onClick={handleSeePricing}
              >
                See Pricing
              </Button>
            </div>

            <div className="pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center space-x-2 text-gray-600">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="font-semibold">300% More Leads</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold">24/7 Availability</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Zap className="w-5 h-5 text-orange-500" />
                  <span className="font-semibold">Instant Setup</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative lg:ml-8">
            <div className="relative">
              <img
                src="/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png"
                alt="AI Chat Demo"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-lg border border-gray-200"
                onLoad={() => console.log('Hero image loaded successfully')}
                onError={(e) => console.error('Hero image failed to load:', e)}
              />
              
              <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                Live Demo →
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white border border-gray-200 px-6 py-3 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
