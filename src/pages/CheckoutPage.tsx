
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
    professional: { name: 'Professional', price: 59, features: ['5 AI-powered listings', 'Voice chat capabilities', 'Advanced appointment scheduling', 'CRM integration'] },
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/realtor-submit')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Form
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Order</h1>
          <p className="text-gray-600 mt-2">Secure checkout powered by PayPal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {/* Plan Selection */}
              <div className="mb-6">
                <Label className="text-base font-medium mb-3 block">Select Plan</Label>
                <div className="space-y-3">
                  {Object.entries(plans).map(([key, plan]) => (
                    <div
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedPlan === key ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{plan.name}</h3>
                          <ul className="text-sm text-gray-600 mt-1">
                            {plan.features.slice(0, 2).map((feature, index) => (
                              <li key={index}>• {feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold">
                            {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                          </span>
                          {typeof plan.price === 'number' && (
                            <span className="text-gray-500 text-sm block">/month</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Listing Preview */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Listing Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{formData.listingUrl || 'New Listing'}</p>
                  <p className="text-sm text-gray-600">Agent: {formData.agentEmail}</p>
                  {formData.contactPhone && (
                    <p className="text-sm text-gray-600">Phone: {formData.contactPhone}</p>
                  )}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-6 mt-6">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>
                    {typeof currentPlan.price === 'number' ? `$${currentPlan.price}/month` : 'Contact Sales'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">14-day free trial included</p>
              </div>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="order-1 lg:order-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Information
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="billingName">Billing Name</Label>
                  <Input
                    id="billingName"
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Security badges */}
              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="mr-1" size={16} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-1" size={16} />
                  <span>PayPal Protected</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={isProcessing || currentPlan.price === 'Custom'}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg font-semibold"
                size="lg"
              >
                {isProcessing ? (
                  'Processing...'
                ) : currentPlan.price === 'Custom' ? (
                  'Contact Sales'
                ) : (
                  `Start Free Trial - $${currentPlan.price}/month`
                )}
              </Button>

              {currentPlan.price === 'Custom' && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  Our team will contact you within 24 hours
                </p>
              )}

              <p className="text-xs text-gray-500 mt-4 text-center">
                By continuing, you agree to our Terms of Service and Privacy Policy. 
                Your free trial starts today and you can cancel anytime.
              </p>
            </Card>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-800 font-medium">14-day free trial • No setup fees • Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
