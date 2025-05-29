
import { MessageSquare, Calendar, BarChart3, Mic, Brain, Clock } from 'lucide-react';
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
      icon: Mic,
      title: 'Voice Interactions',
      description: 'Natural voice conversations for a more personal buyer experience',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Calendar,
      title: 'Auto Scheduling',
      description: 'Seamlessly books appointments directly into your calendar system',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: BarChart3,
      title: 'Lead Analytics',
      description: 'Track engagement, conversation quality, and conversion metrics',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Brain,
      title: 'Property Intelligence',
      description: 'AI learns every detail about your listings for accurate responses',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a lead - AI works around the clock for you',
      gradient: 'from-red-500 to-red-600'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to Convert More Leads
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI platform gives you professional tools that work together to maximize every listing opportunity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
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
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Real Estate Business?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of successful agents who've already upgraded their listings with AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = '/'}
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
              >
                See Live Demo
              </Button>
              <Button
                onClick={() => window.location.href = '/realtor-submit'}
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-3"
              >
                Start Your Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
