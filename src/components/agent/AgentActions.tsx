
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Phone, Calendar } from 'lucide-react';
import { LeadCaptureForm } from './LeadCaptureForm';
import { AppointmentModal } from '../appointment/AppointmentModal';

interface AgentActionsProps {
  property?: any;
}

export const AgentActions = ({ property }: AgentActionsProps) => {
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  // Use a default property object if none provided for backward compatibility
  const defaultProperty = {
    id: 'sample-property-id',
    title: 'Luxury Modern Estate',
    address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210'
  };

  const currentProperty = property || defaultProperty;

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <LeadCaptureForm>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
            <User className="mr-2" size={16} />
            Inquire About This Property
          </Button>
        </LeadCaptureForm>
        
        <Button 
          onClick={() => setIsAppointmentOpen(true)}
          variant="outline" 
          className="border-gray-300 hover:bg-gray-100 text-gray-700"
        >
          <Calendar className="mr-2" size={16} />
          Schedule Showing
        </Button>
        
        <Button variant="outline" className="border-gray-300 hover:bg-gray-100 text-gray-700">
          <Phone className="mr-2" size={16} />
          Call (310) 555-0123
        </Button>
      </div>

      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        property={currentProperty}
      />
    </>
  );
};
