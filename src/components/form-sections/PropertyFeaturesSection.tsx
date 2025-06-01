
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

interface FormValues {
  propertyFeatures?: string[];
}

interface PropertyFeaturesSectionProps {
  control: Control<FormValues>;
}

const PropertyFeaturesSection = ({ control }: PropertyFeaturesSectionProps) => {
  const features = ['Pool', 'Garage', 'Garden', 'Fireplace', 'Balcony', 'Gym'];

  return (
    <FormField
      control={control}
      name="propertyFeatures"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-semibold">Property Features (Optional)</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.toLowerCase()}
                  checked={field.value?.includes(feature.toLowerCase())}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      field.onChange([...(field.value || []), feature.toLowerCase()])
                    } else {
                      field.onChange(field.value?.filter((value) => value !== feature.toLowerCase()))
                    }
                  }}
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PropertyFeaturesSection;
