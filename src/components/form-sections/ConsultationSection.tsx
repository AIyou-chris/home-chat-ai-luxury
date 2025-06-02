
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/form";

interface ConsultationSectionProps {
  control: Control<FormValues>;
  showConsultationForm: boolean;
  setShowConsultationForm: (show: boolean) => void;
}

const ConsultationSection = ({ control, showConsultationForm, setShowConsultationForm }: ConsultationSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Free Consultation Scheduler */}
      <FormField
        control={control}
        name="scheduleConsultation"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="consultation"
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked);
                  setShowConsultationForm(!!checked);
                }}
              />
              <FormLabel htmlFor="consultation" className="text-base font-semibold flex items-center">
                <Calendar className="mr-2" size={20} />
                Would you like to schedule a free consultation?
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {showConsultationForm && (
        <div className="animate-fade-in bg-orange-50 p-6 rounded-lg border border-orange-200">
          <FormField
            control={control}
            name="consultationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Consultation Time</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time slot" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 5:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5:00 PM - 8:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Our team will contact you within 24 hours to schedule your free consultation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ConsultationSection;
