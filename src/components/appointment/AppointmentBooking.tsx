
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar as CalendarIcon, User, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { appointmentService } from '@/services/appointmentService';

interface AppointmentBookingProps {
  property: any;
  onClose?: () => void;
  prefilledContact?: {
    name: string;
    phone: string;
    email: string;
  };
}

export const AppointmentBooking = ({ 
  property, 
  onClose, 
  prefilledContact 
}: AppointmentBookingProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [showingType, setShowingType] = useState<'in-person' | 'virtual'>('in-person');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Pre-fill contact information if provided
  useEffect(() => {
    if (prefilledContact) {
      setContactInfo(prefilledContact);
    }
  }, [prefilledContact]);

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !contactInfo.name || !contactInfo.phone) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await appointmentService.createAppointment({
        propertyId: property.id,
        contactName: contactInfo.name,
        contactPhone: contactInfo.phone,
        contactEmail: contactInfo.email,
        appointmentDate: selectedDate.toISOString().split('T')[0],
        appointmentTime: selectedTime,
        showingType: showingType,
        notes: `Scheduled via ${prefilledContact ? 'AI Chat' : 'Direct Booking'}`
      });

      toast({
        title: 'Appointment Scheduled!',
        description: contactInfo.email 
          ? 'Your showing has been scheduled and a confirmation email has been sent.'
          : 'Your showing has been scheduled. An agent will contact you to confirm.',
      });

      if (onClose) onClose();
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      toast({
        title: 'Booking Failed',
        description: 'There was an error scheduling your appointment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Schedule a Showing</h3>
        <p className="text-gray-600">{property.title}</p>
        <p className="text-sm text-gray-500">{property.address}</p>
        {prefilledContact && (
          <Badge variant="outline" className="mt-2 bg-blue-50 text-blue-700 border-blue-200">
            Scheduled via AI Chat Assistant
          </Badge>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Showing Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Showing Type</label>
          <div className="flex gap-3">
            <Button
              type="button"
              variant={showingType === 'in-person' ? 'default' : 'outline'}
              onClick={() => setShowingType('in-person')}
              className="flex-1"
            >
              <User className="mr-2" size={16} />
              In-Person Tour
            </Button>
            <Button
              type="button"
              variant={showingType === 'virtual' ? 'default' : 'outline'}
              onClick={() => setShowingType('virtual')}
              className="flex-1"
            >
              <CalendarIcon className="mr-2" size={16} />
              Virtual Tour
            </Button>
          </div>
        </div>

        {/* Date Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">Select Date</label>
          <div className="border rounded-lg p-3">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Time Selection */}
        {selectedDate && (
          <div>
            <label className="block text-sm font-medium mb-3">Select Time</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => setSelectedTime(time)}
                  className="text-sm"
                >
                  <Clock className="mr-1" size={14} />
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-medium">Contact Information</h4>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={contactInfo.name}
              onChange={(e) => setContactInfo(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Email address for confirmation and reminders
            </p>
          </div>
        </div>

        {/* Summary */}
        {selectedDate && selectedTime && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Appointment Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="mr-2" size={14} />
                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="mr-2" size={14} />
                {selectedTime}
              </div>
              <div className="flex items-center">
                <Badge variant="secondary" className="text-xs">
                  {showingType === 'in-person' ? 'In-Person Tour' : 'Virtual Tour'}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3">
          {onClose && (
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          )}
          <Button 
            type="submit" 
            className="flex-1 bg-orange-500 hover:bg-orange-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
          </Button>
        </div>
      </form>
    </Card>
  );
};
