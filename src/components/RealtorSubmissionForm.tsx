import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  listingUrl: z.string().url({ message: "Please enter a valid URL" }),
  agentEmail: z.string().email({ message: "Please enter a valid email" }),
  contactPhone: z.string().optional(),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  propertyFeatures: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
})

interface FormValues extends z.infer<typeof formSchema> {}

const RealtorSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingUrl: "",
      agentEmail: "",
      contactPhone: "",
      propertyType: "",
      propertyFeatures: [],
      additionalNotes: "",
    },
  })

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('property_submissions')
        .insert([
          {
            ...values,
            status: 'pending',
          },
        ])
        .select()

      if (error) {
        console.error("Submission error:", error);
        toast({
          title: "Submission Failed",
          description: "There was an issue submitting your form. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // After successful submission, redirect to checkout
      navigate('/checkout', { 
        state: { 
          formData: values,
          submissionId: data?.id 
        } 
      });

    } catch (error) {
      console.error("Unexpected submission error:", error);
      toast({
        title: "Unexpected Error",
        description: "An unexpected error occurred. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <Card className="w-full max-w-2xl p-8 rounded-lg shadow-md bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">Realtor Submission Form</CardTitle>
          <CardDescription className="text-gray-600">Fill out the form below to submit your property listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="listingUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com/listing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="agentEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Email</FormLabel>
                    <FormControl>
                      <Input placeholder="agent@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
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
              <FormField
                control={form.control}
                name="propertyFeatures"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Features (Optional)</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature1"
                          checked={field.value?.includes("pool")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "pool"])
                            } else {
                              field.onChange(field.value?.filter((value) => value !== "pool"))
                            }
                          }}
                        />
                        <label htmlFor="feature1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Pool</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature2"
                          checked={field.value?.includes("garage")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "garage"])
                            } else {
                              field.onChange(field.value?.filter((value) => value !== "garage"))
                            }
                          }}
                        />
                        <label htmlFor="feature2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Garage</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="feature3"
                          checked={field.value?.includes("garden")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...(field.value || []), "garden"])
                            } else {
                              field.onChange(field.value?.filter((value) => value !== "garden"))
                            }
                          }}
                        />
                        <label htmlFor="feature3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Garden</label>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any additional information about the property"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Submitting..." : "Submit Listing"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-gray-500">
            By submitting, you agree to our <a href="/terms" className="text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RealtorSubmissionForm;
