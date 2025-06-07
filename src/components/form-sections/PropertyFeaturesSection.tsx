
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface PropertyFeaturesSectionProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const PropertyFeaturesSection = ({ formData, setFormData }: PropertyFeaturesSectionProps) => {
  const features = ['Pool', 'Garage', 'Garden', 'Fireplace', 'Balcony', 'Gym'];

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData((prev: any) => {
      const currentFeatures = prev.additionalFeatures || '';
      const featuresArray = currentFeatures.split(',').filter((f: string) => f.trim());
      
      if (checked) {
        if (!featuresArray.includes(feature)) {
          featuresArray.push(feature);
        }
      } else {
        const index = featuresArray.indexOf(feature);
        if (index > -1) {
          featuresArray.splice(index, 1);
        }
      }
      
      return { ...prev, additionalFeatures: featuresArray.join(', ') };
    });
  };

  const isFeatureSelected = (feature: string) => {
    const features = formData.additionalFeatures || '';
    return features.includes(feature);
  };

  return (
    <div className="space-y-4">
      <label className="text-base font-semibold">Property Features (Optional)</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature} className="flex items-center space-x-2">
            <Checkbox
              id={feature.toLowerCase()}
              checked={isFeatureSelected(feature)}
              onCheckedChange={(checked) => handleFeatureChange(feature, !!checked)}
            />
            <label 
              htmlFor={feature.toLowerCase()} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {feature}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFeaturesSection;
