
import { MessageSquare, Calendar, BarChart3, Mic, Brain, Clock, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FeaturesShowcase = () => {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description: 'Intelligent conversations that understand property details and buyer needs',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Smartphone,
      title: 'Real-Time SMS Alerts',
      description: 'Instant two-way SMS notifications for leads, QR scans, and appointments with custom rules',
      gradient: 'from-green-500 to-green-600',
      isPro: true
    },
    {
      icon: Mic,
      title: 'Voice Interactions',
      description: 'Natural voice conversations for a more personal buyer experience',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Auto Scheduling',
      description: 'Seamlessly books appointments directly into your calendar system',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Lead Analytics',
      description: 'Track engagement, conversation quality, and conversion metrics',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Brain,
      title: 'Property Intelligence',
      description: 'AI learns every detail about your listings for accurate responses',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Convert More Leads
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Our AI platform gives you professional tools that work together to maximize every listing opportunity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative"
              >
                {feature.isPro && (
                  <div className="absolute -top-2 -right-2">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">PRO</span>
                  </div>
                )}
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg mb-4`}>
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Real Estate Business?
            </h3>
            <p className="text-gray-600 mb-6">
              Start your listing in 5 minutes and join hundreds of successful agents who've already upgraded with AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/demo'}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                See Live Demo
              </Button>
              <Button
                onClick={() => window.location.href = '/realtor-submit'}
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-3 w-full sm:w-auto"
              >
                Start Your Listing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
