
import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

interface ConsultationSectionProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const ConsultationSection = ({ formData, setFormData }: ConsultationSectionProps) => {
  const [showConsultationForm, setShowConsultationForm] = useState(false);

  const handleConsultationChange = (checked: boolean) => {
    setFormData((prev: any) => ({ ...prev, scheduleConsultation: checked }));
    setShowConsultationForm(checked);
  };

  const handleTimeChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, consultationTime: value }));
  };

  return (
    <div className="space-y-6">
      {/* Free Consultation Scheduler */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="consultation"
            checked={formData.scheduleConsultation || false}
            onCheckedChange={handleConsultationChange}
          />
          <label htmlFor="consultation" className="text-base font-semibold flex items-center">
            <Calendar className="mr-2" size={20} />
            Would you like to schedule a free consultation?
          </label>
        </div>
      </div>

      {showConsultationForm && (
        <div className="animate-fade-in bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div>
            <label className="block mb-2">Preferred Consultation Time</label>
            <Select onValueChange={handleTimeChange} value={formData.consultationTime || ''}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-gray-600 mt-2">
              Our team will contact you within 24 hours to schedule your free consultation.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultationSection;
