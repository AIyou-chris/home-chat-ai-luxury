
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/form";

interface BasicInfoSectionProps {
  control: Control<FormValues>;
}

const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="listingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Listing URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/listing" {...field} className="h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="agentEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Agent Email</FormLabel>
              <FormControl>
                <Input placeholder="agent@example.com" type="email" {...field} className="h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Contact Phone (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="(123) 456-7890" type="tel" {...field} className="h-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base font-semibold">Property Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoSection;
