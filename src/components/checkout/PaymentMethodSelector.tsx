
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
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
  );
};
