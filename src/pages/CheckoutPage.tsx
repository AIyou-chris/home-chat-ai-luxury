
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, CreditCard, Shield, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('professional');
  
  // Get form data from location state
  const formData = location.state?.formData;

  const plans = {
    starter: { name: 'Starter', price: 39, features: ['1 AI-powered listing', 'Basic chat functionality', 'Lead capture & email notifications'] },
    professional: { name: 'Professional', price: 49, features: ['Unlimited AI-powered listings', 'Voice chat capabilities', 'Advanced appointment scheduling', 'CRM integration'] },
    enterprise: { name: 'Enterprise', price: 'Custom', features: ['Unlimited AI listings', 'Team collaboration tools', 'White-label solutions'] }
  };

  const currentPlan = plans[selectedPlan as keyof typeof plans];

  useEffect(() => {
    // Redirect if no form data
    if (!formData) {
      navigate('/realtor-submit');
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
          plan: currentPlan,
          paymentId: `pay_${Date.now()}`
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
    <div className="min-h-screen bg-white">
      {/* Header - matching the form page */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <img 
            src="/lovable-uploads/fb2afea8-edfe-40f9-b8ce-9728d6cd7f40.png" 
            alt="Home Listing AI" 
            className="h-12 w-auto"
          />
        </div>
      </div>

      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Order</h1>
            <p className="text-xl text-gray-600">Secure checkout to activate your AI-powered listing</p>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/realtor-submit')}
                  className="mb-4 p-0 h-auto text-orange-100 hover:text-white"
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Back to Form
                </Button>
              </div>
              <CardTitle className="text-2xl">Secure Checkout</CardTitle>
              <CardDescription className="text-orange-100">Choose your plan and complete payment</CardDescription>
            </CardHeader>
            
            <CardContent className="p-8 space-y-8">
              {/* Plan Selection */}
              <div>
                <Label className="text-lg font-semibold mb-4 block">Select Your Plan</Label>
                <div className="space-y-4">
                  {Object.entries(plans).map(([key, plan]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPlan === key ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                          <ul className="text-gray-600 space-y-1">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <CheckCircle className="mr-2 text-green-500" size={16} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right ml-6">
                          <span className="text-3xl font-bold text-gray-900">
                            {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                          </span>
                          {typeof plan.price === 'number' && (
                            <span className="text-gray-500 text-lg block">/month</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Listing Preview */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{formData.listingUrl || 'New AI Listing'}</p>
                      <p className="text-gray-600">Agent: {formData.agentEmail}</p>
                      {formData.contactPhone && (
                        <p className="text-gray-600">Phone: {formData.contactPhone}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {typeof currentPlan.price === 'number' ? `$${currentPlan.price}/month` : 'Contact Sales'}
                      </div>
                      <p className="text-sm text-green-600 font-medium">14-day free trial included</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t pt-8">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <CreditCard className="mr-3" size={24} />
                  Payment Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="cardNumber" className="text-base font-medium">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="mt-2 h-12"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="expiry" className="text-base font-medium">Expiry Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        className="mt-2 h-12"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-base font-medium">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        className="mt-2 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="billingName" className="text-base font-medium">Billing Name</Label>
                    <Input
                      id="billingName"
                      placeholder="John Doe"
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600 border-t pt-8">
                <div className="flex items-center">
                  <Shield className="mr-2 text-green-500" size={20} />
                  <span className="font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={20} />
                  <span className="font-medium">PayPal Protected</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || currentPlan.price === 'Custom'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white h-14 text-lg font-semibold"
                size="lg"
              >
                {isProcessing ? (
                  'Processing Payment...'
                ) : currentPlan.price === 'Custom' ? (
                  'Contact Sales Team'
                ) : (
                  `Start Listing - $${currentPlan.price}/month`
                )}
              </Button>

              {currentPlan.price === 'Custom' && (
                <p className="text-center text-gray-600">
                  Our enterprise team will contact you within 24 hours to discuss your custom solution.
                </p>
              )}

              {/* Trust indicators */}
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 bg-green-50 border border-green-200 rounded-full px-8 py-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-800 font-medium text-lg">15-day money back guarantee • No setup fees • Cancel anytime</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="text-center bg-gray-50 rounded-b-lg">
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
