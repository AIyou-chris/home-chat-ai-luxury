
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BasicInfoSectionProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BasicInfoSection = ({ formData, setFormData }: BasicInfoSectionProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-base font-semibold block mb-2">Listing URL</label>
          <Input 
            placeholder="https://example.com/listing" 
            value={formData.websiteLink || ''} 
            onChange={(e) => handleInputChange('websiteLink', e.target.value)}
            className="h-12" 
          />
        </div>
        <div>
          <label className="text-base font-semibold block mb-2">Agent Email</label>
          <Input 
            placeholder="agent@example.com" 
            type="email" 
            value={formData.agentEmail || ''} 
            onChange={(e) => handleInputChange('agentEmail', e.target.value)}
            className="h-12" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-base font-semibold block mb-2">Contact Phone (Optional)</label>
          <Input 
            placeholder="(123) 456-7890" 
            type="tel" 
            value={formData.agentPhone || ''} 
            onChange={(e) => handleInputChange('agentPhone', e.target.value)}
            className="h-12" 
          />
        </div>
        <div>
          <label className="text-base font-semibold block mb-2">Property Type</label>
          <Select onValueChange={(value) => handleInputChange('propertyType', value)} value={formData.propertyType || ''}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoSection;
