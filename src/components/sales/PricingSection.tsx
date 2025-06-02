
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, CreditCard } from 'lucide-react';

export const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for new agents getting started',
      popular: false,
      features: [
        '1 AI-powered listing',
        'Basic chat functionality',
        'Lead capture & email notifications',
        'Mobile-responsive design',
        'Basic analytics dashboard',
        'PayPal recurring billing'
      ],
      cta: 'Start Your Listing'
    },
    {
      name: 'Professional',
      price: '$69',
      period: '/month',
      description: 'For established agents serious about growth',
      popular: true,
      features: [
        '1 AI-powered listing with advanced features',
        'Voice chat capabilities',
        'Real-time two-way SMS notifications',
        'Custom SMS notification rules',
        'Advanced appointment scheduling',
        'CRM integration',
        'Detailed analytics & reporting',
        'Priority support',
        'PayPal recurring billing'
      ],
      cta: 'Most Popular'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For teams and agencies scaling up',
      popular: false,
      features: [
        'Unlimited AI listings',
        'Team collaboration tools',
        'White-label solutions',
        'API access',
        'Advanced integrations',
        'Custom AI training',
        'Dedicated account manager',
        'Custom PayPal billing'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Choose the plan that fits your business. All plans include a 15-day money back guarantee with secure PayPal billing.
          </p>
          
          {/* Payment methods */}
          <div className="flex items-center justify-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/cb12bb65-883d-4a31-97ea-4169a51747eb.png" 
                alt="PayPal" 
                className="h-8 w-auto"
              />
              <span className="text-gray-600 font-medium">Secure PayPal Billing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="text-blue-600" size={24} />
              <span className="text-gray-600 font-medium">All Major Credit Cards</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular 
                  ? 'border-orange-500 relative' 
                  : 'border-gray-100'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-orange-500 text-white px-4 py-1 font-semibold">
                    <Star className="mr-1" size={14} />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <div className="p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl sm:text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-base sm:text-lg">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700 text-sm sm:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => window.location.href = '/realtor-submit'}
                  className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">15-day satisfaction guarantee • Secure PayPal billing • Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
