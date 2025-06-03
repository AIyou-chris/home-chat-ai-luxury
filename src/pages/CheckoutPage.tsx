
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, CreditCard, Shield, ArrowLeft, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-100 shadow-sm">
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
            <p className="text-xl text-gray-600">Get everything you need to turn your listing into a lead machine</p>
          </div>

          <Card className="shadow-xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="mb-4">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate('/submit')}
                  className="mb-4 p-0 h-auto text-orange-100 hover:text-white"
                >
                  <ArrowLeft className="mr-2" size={16} />
                  Back to Form
                </Button>
              </div>
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

              {/* Payment Method Selection */}
              <div className="border-t pt-8">
                <Label className="text-xl font-bold mb-6 block text-gray-900">Payment Method</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-center space-x-3 ${
                      paymentMethod === 'card' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="text-gray-600" size={24} />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-center space-x-3 ${
                      paymentMethod === 'paypal' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="font-medium">PayPal</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              {paymentMethod === 'card' && (
                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold mb-6 flex items-center">
                    <CreditCard className="mr-3" size={24} />
                    Card Information
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
              )}

              {paymentMethod === 'paypal' && (
                <div className="border-t pt-8">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-2xl font-bold">P</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">PayPal Checkout</h3>
                    <p className="text-gray-600">You'll be redirected to PayPal to complete your payment securely.</p>
                  </div>
                </div>
              )}

              {/* Order Summary */}
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Order Summary</h3>
                <div className="bg-gray-50 p-6 rounded-xl border-2 border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <p className="font-bold text-lg text-gray-900">{formData.listingUrl || 'New AI Listing'}</p>
                      <p className="text-gray-600 mt-1">Agent: {formData.agentEmail}</p>
                      {formData.contactPhone && (
                        <p className="text-gray-600">Phone: {formData.contactPhone}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        ${plan.price}/month
                      </div>
                      <div className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle className="mr-1" size={14} />
                        15-day money back guarantee
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security badges */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 border-t pt-8">
                <div className="flex items-center">
                  <Shield className="mr-2 text-green-500" size={20} />
                  <span className="font-medium">SSL Secured</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={20} />
                  <span className="font-medium">PayPal Protected</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="mr-2 text-green-500" size={20} />
                  <span className="font-medium">Money Back Guarantee</span>
                </div>
              </div>

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
