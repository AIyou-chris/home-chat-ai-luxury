
import { Shield, CheckCircle } from 'lucide-react';

export const SecurityBadges = () => {
  return (
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
  );
};
