
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { notificationService } from '@/services/notificationService';

interface LeadCaptureFormProps {
  children: React.ReactNode;
  propertyData?: any;
}

export const LeadCaptureForm = ({ children, propertyData }: LeadCaptureFormProps) => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const { toast } = useToast();
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeframe: '',
    budget: '',
    message: 'I\'m interested in this luxury property and would like to schedule a private tour.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLeadData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send notification about new lead
    if (propertyData?.agent_id) {
      await notificationService.sendNotification({
        type: 'lead',
        data: {
          contact_name: `${leadData.firstName} ${leadData.lastName}`,
          contact_email: leadData.email,
          contact_phone: leadData.phone,
          property_address: propertyData.address,
          property_title: propertyData.title,
          message: leadData.message,
          timeframe: leadData.timeframe,
          budget: leadData.budget
        },
        agentId: propertyData.agent_id
      });
    }
    
    toast({
      title: "Lead Captured!",
      description: "Thank you for your interest. Michael will contact you within 1 hour to discuss this property.",
    });
    
    setLeadData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeframe: '',
      budget: '',
      message: 'I\'m interested in this luxury property and would like to schedule a private tour.'
    });
    
    setIsLeadFormOpen(false);
  };

  return (
    <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-white text-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light text-gray-800">Get Exclusive Access</DialogTitle>
          <p className="text-gray-600">Fill out the form below and Michael will contact you within 1 hour with detailed information about this luxury property.</p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</label>
              <Input
                id="firstName"
                name="firstName"
                value={leadData.firstName}
                onChange={handleChange}
                required
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</label>
              <Input
                id="lastName"
                name="lastName"
                value={leadData.lastName}
                onChange={handleChange}
                required
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={leadData.email}
                onChange={handleChange}
                required
                className="bg-gray-50 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={leadData.phone}
                onChange={handleChange}
                required
                className="bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="timeframe" className="text-sm font-medium text-gray-700">Buying Timeframe</label>
              <select
                id="timeframe"
                name="timeframe"
                value={leadData.timeframe}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select timeframe</option>
                <option value="immediately">Immediately</option>
                <option value="3-months">Within 3 months</option>
                <option value="6-months">Within 6 months</option>
                <option value="1-year">Within 1 year</option>
                <option value="exploring">Just exploring</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="budget" className="text-sm font-medium text-gray-700">Budget Range</label>
              <select
                id="budget"
                name="budget"
                value={leadData.budget}
                onChange={handleChange}
                className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select budget</option>
                <option value="under-2m">Under $2M</option>
                <option value="2m-5m">$2M - $5M</option>
                <option value="5m-10m">$5M - $10M</option>
                <option value="10m-plus">$10M+</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Message</label>
            <Textarea
              id="message"
              name="message"
              value={leadData.message}
              onChange={handleChange}
              rows={3}
              className="bg-gray-50 border-gray-200"
            />
          </div>
          
          <div className="pt-4">
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
              Submit Inquiry
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              By submitting, you agree to receive communications about this property.
            </p>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
