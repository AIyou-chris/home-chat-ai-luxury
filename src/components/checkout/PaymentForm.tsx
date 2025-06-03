
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface PaymentFormProps {
  paymentMethod: string;
}

export const PaymentForm = ({ paymentMethod }: PaymentFormProps) => {
  if (paymentMethod === 'card') {
    return (
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
    );
  }

  if (paymentMethod === 'paypal') {
    return (
      <div className="border-t pt-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">P</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">PayPal Checkout</h3>
          <p className="text-gray-600">You'll be redirected to PayPal to complete your payment securely.</p>
        </div>
      </div>
    );
  }

  return null;
};
