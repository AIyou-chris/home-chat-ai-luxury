
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CheckoutHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <img 
          src="/lovable-uploads/fb2afea8-edfe-40f9-b8ce-9728d6cd7f40.png" 
          alt="Home Listing AI" 
          className="h-12 w-auto"
        />
        <Button 
          variant="ghost" 
          onClick={() => navigate('/submit')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Form
        </Button>
      </div>
    </div>
  );
};
