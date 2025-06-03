
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { PaymentMethodSelector } from '@/components/checkout/PaymentMethodSelector';
import { PaymentForm } from '@/components/checkout/PaymentForm';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { SecurityBadges } from '@/components/checkout/SecurityBadges';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Get form data from location state
  const formData = location.state?.formData;

  const plan = {
    name: 'Complete AI Solution',
    price: 59,
    features: [
      'Unlimited AI-powered listings',
      'Voice chat capabilities',
      'Real-time SMS notifications',
      'Smart appointment scheduling',
      'Lead capture & management',
      'QR code generation & analytics',
      'Mobile-optimized interface',
      'Detailed analytics dashboard',
      'Priority email support',
      'CRM integration ready',
      'Custom branding options',
      'Regular feature updates'
    ]
  };

  useEffect(() => {
    // Redirect if no form data
    if (!formData) {
      navigate('/submit');
    }
  }, [formData, navigate]);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Payment Successful!",
        description: "Your listing is being generated. Redirecting to confirmation...",
      });

      // Navigate to confirmation page with form data and plan info
      navigate('/confirmation', { 
        state: { 
          formData, 
          plan,
          paymentId: `pay_${Date.now()}`,
          paymentMethod
        } 
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CheckoutHeader />

      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Order</h1>
            <p className="text-xl text-gray-600">Get everything you need to turn your listing into a lead machine</p>
          </div>

          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardTitle className="text-3xl">Secure Checkout</CardTitle>
              <CardDescription className="text-orange-100 text-lg">Start your AI revolution today</CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              {/* Single Plan Display */}
              <div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-200 rounded-2xl p-8 relative">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold flex items-center">
                      <Zap className="mr-2" size={16} />
                      Everything Included
                    </div>
                  </div>
                  
                  <div className="text-center mb-6 pt-4">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="text-5xl font-bold text-orange-500 mb-2">${plan.price}</div>
                    <div className="text-gray-600 text-lg">/month</div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      <CheckCircle className="mr-2" size={16} />
                      No setup fees • No hidden costs • Cancel anytime
                    </div>
                  </div>
                </div>
              </div>

              <PaymentMethodSelector 
                paymentMethod={paymentMethod} 
                setPaymentMethod={setPaymentMethod} 
              />

              <PaymentForm paymentMethod={paymentMethod} />

              <OrderSummary formData={formData} plan={plan} />

              <SecurityBadges />

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-16 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {isProcessing ? (
                  'Processing Payment...'
                ) : (
                  `Start Your AI Listing - $${plan.price}/month`
                )}
              </Button>

              {/* Trust indicators */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 rounded-full px-8 py-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-bold text-lg">15-day money back guarantee • No setup fees • Cancel anytime</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="text-center bg-gray-50 border-t">
              <p className="text-sm text-gray-500 mx-auto leading-relaxed">
                By continuing, you agree to our <a href="/terms" className="text-orange-500 hover:underline font-medium">Terms of Service</a> and <a href="/privacy" className="text-orange-500 hover:underline font-medium">Privacy Policy</a>. 
                Your 15-day money back guarantee starts today and you can cancel anytime.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
