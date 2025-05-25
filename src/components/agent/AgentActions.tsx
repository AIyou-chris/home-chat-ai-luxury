
import { Button } from '@/components/ui/button';
import { User, Phone } from 'lucide-react';
import { LeadCaptureForm } from './LeadCaptureForm';

export const AgentActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <LeadCaptureForm>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
          <User className="mr-2" size={16} />
          Inquire About This Property
        </Button>
      </LeadCaptureForm>
      
      <Button variant="outline" className="border-gray-300 hover:bg-gray-100 text-gray-700">
        <Phone className="mr-2" size={16} />
        Call (310) 555-0123
      </Button>
    </div>
  );
};
