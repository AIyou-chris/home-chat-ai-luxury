
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';
import { AppointmentModal } from '../appointment/AppointmentModal';

interface ChatAppointmentIntegrationProps {
  property: any;
  onScheduleSuccess?: () => void;
}

export const ChatAppointmentIntegration = ({ 
  property, 
  onScheduleSuccess 
}: ChatAppointmentIntegrationProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handleQuickSchedule = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (onScheduleSuccess) {
      onScheduleSuccess();
    }
  };

  return (
    <>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 my-4">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="text-blue-600" size={20} />
          <h4 className="font-medium text-blue-800">Ready to Schedule a Showing?</h4>
        </div>
        
        <p className="text-sm text-blue-700 mb-3">
          I can help you schedule a tour of this property right now!
        </p>
        
        <div className="space-y-2 mb-3">
          <Input
            placeholder="Your name"
            value={contactInfo.name}
            onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
            className="text-sm"
          />
          <Input
            placeholder="Phone number"
            value={contactInfo.phone}
            onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
            className="text-sm"
          />
          <Input
            placeholder="Email (optional)"
            value={contactInfo.email}
            onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
            className="text-sm"
          />
        </div>
        
        <Button 
          onClick={handleQuickSchedule}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={!contactInfo.name || !contactInfo.phone}
        >
          <Calendar className="mr-2" size={16} />
          Schedule Showing Now
        </Button>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        property={property}
        prefilledContact={contactInfo}
      />
    </>
  );
};
