
import { CheckCircle } from 'lucide-react';

interface OrderSummaryProps {
  formData: any;
  plan: {
    name: string;
    price: number;
  };
}

export const OrderSummary = ({ formData, plan }: OrderSummaryProps) => {
  return (
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
  );
};
