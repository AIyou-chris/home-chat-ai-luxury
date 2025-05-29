
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

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
        'Basic analytics dashboard'
      ],
      cta: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For established agents serious about growth',
      popular: true,
      features: [
        '5 AI-powered listings',
        'Voice chat capabilities',
        'Advanced appointment scheduling',
        'CRM integration',
        'Detailed analytics & reporting',
        'Custom branding',
        'Priority support'
      ],
      cta: 'Most Popular'
    },
    {
      name: 'Agency',
      price: '$249',
      period: '/month',
      description: 'For teams and agencies scaling up',
      popular: false,
      features: [
        'Unlimited AI listings',
        'Team collaboration tools',
        'White-label solutions',
        'API access',
        'Advanced integrations',
        'Custom AI training',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales'
    }
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your business. All plans include a 14-day free trial with no commitment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-lg">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
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
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
