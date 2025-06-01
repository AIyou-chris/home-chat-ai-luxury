
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useNavigate } from 'react-router-dom';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/integrations/supabase/client";

// Import the new section components
import BasicInfoSection from "./form-sections/BasicInfoSection";
import FileUploadSection from "./form-sections/FileUploadSection";
import MediaLinksSection from "./form-sections/MediaLinksSection";
import PropertyFeaturesSection from "./form-sections/PropertyFeaturesSection";
import ConsultationSection from "./form-sections/ConsultationSection";

const formSchema = z.object({
  listingUrl: z.string().url({ message: "Please enter a valid URL" }),
  agentEmail: z.string().email({ message: "Please enter a valid email" }),
  contactPhone: z.string().optional(),
  propertyType: z.string().min(1, { message: "Please select a property type" }),
  propertyFeatures: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
  agentHeadshot: z.string().optional(),
  logoUpload: z.string().optional(),
  knowledgeBaseFiles: z.array(z.string()).optional(),
  propertyPhotos: z.array(z.string()).optional(),
  videoLink: z.string().optional(),
  facebookUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  tiktokUrl: z.string().optional(),
  scheduleConsultation: z.boolean().default(false),
  consultationTime: z.string().optional(),
})

interface FormValues extends z.infer<typeof formSchema> {}

const RealtorSubmissionForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      listingUrl: "https://www.zillow.com/homedetails/123-Beverly-Hills-Dr-Beverly-Hills-CA-90210/sample_zpid/",
      agentEmail: "sarah.johnson@luxuryrealty.com",
      contactPhone: "(555) 123-4567",
      propertyType: "house",
      propertyFeatures: ["pool", "garage", "garden"],
      additionalNotes: "Luxury Beverly Hills estate with stunning city views. Recently renovated with high-end finishes throughout.",
      agentHeadshot: "",
      logoUpload: "",
      knowledgeBaseFiles: [],
      propertyPhotos: [],
      videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      facebookUrl: "https://facebook.com/sarahjohnsonrealty",
      instagramUrl: "https://instagram.com/sarahjohnsonrealty",
      linkedinUrl: "https://linkedin.com/in/sarahjohnsonrealty",
      tiktokUrl: "https://tiktok.com/@sarahjohnsonrealty",
      scheduleConsultation: false,
      consultationTime: "",
    },
  })

  const handleFileUpload = (field: string, files: FileList | null, maxFiles: number = 1) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    const validFiles = fileArray.slice(0, maxFiles);
    
    // Validate file types
    const allowedTypes = field === 'knowledgeBaseFiles' 
      ? ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      : ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    
    const invalidFiles = validFiles.filter(file => !allowedTypes.includes(file.type));
    
    if (invalidFiles.length > 0) {
      toast({
        title: "Invalid file type",
        description: `Please upload only ${field === 'knowledgeBaseFiles' ? 'PDF, Word, or text files' : 'image files'}.`,
        variant: "destructive"
      });
      return;
    }

    // Check file size (10MB limit)
    const oversizedFiles = validFiles.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast({
        title: "File too large",
        description: "Please upload files smaller than 10MB.",
        variant: "destructive"
      });
      return;
    }

    setUploadedFiles(prev => ({
      ...prev,
      [field]: validFiles
    }));

    // For single file uploads, set the file name
    if (maxFiles === 1 && validFiles.length > 0) {
      form.setValue(field as any, validFiles[0].name);
    } else {
      // For multiple files, set array of file names
      form.setValue(field as any, validFiles.map(f => f.name));
    }
  };

  const removeFile = (field: string, index: number) => {
    const currentFiles = uploadedFiles[field] || [];
    const newFiles = currentFiles.filter((_, i) => i !== index);
    
    setUploadedFiles(prev => ({
      ...prev,
      [field]: newFiles
    }));

    if (newFiles.length === 0) {
      form.setValue(field as any, field.includes('Files') || field.includes('Photos') ? [] : "");
    } else {
      form.setValue(field as any, newFiles.map(f => f.name));
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('realtor_submissions')
        .insert([
          {
            listing_url: values.listingUrl,
            agent_email: values.agentEmail,
            contact_phone: values.contactPhone,
            additional_notes: values.additionalNotes,
            processing_status: 'pending',
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

      navigate('/checkout', { 
        state: { 
          formData: values,
          submissionId: data?.[0]?.id 
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <img 
            src="/lovable-uploads/fb2afea8-edfe-40f9-b8ce-9728d6cd7f40.png" 
            alt="Home Listing AI" 
            className="h-12 w-auto"
          />
        </div>
      </div>

      <div className="container mx-auto py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Create Your AI-Powered Listing</h1>
            <p className="text-xl text-gray-600">Fill out the form below to generate your intelligent property assistant</p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 font-medium">✨ Demo data has been pre-filled for testing purposes</p>
            </div>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Listing Details</CardTitle>
              <CardDescription className="text-orange-100">Provide your property information and customize your AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Basic Information */}
                  <BasicInfoSection control={form.control} />

                  {/* File Uploads */}
                  <FileUploadSection 
                    control={form.control}
                    uploadedFiles={uploadedFiles}
                    onFileUpload={handleFileUpload}
                    onRemoveFile={removeFile}
                  />

                  {/* Media & Social Links */}
                  <MediaLinksSection control={form.control} />

                  {/* Property Features */}
                  <PropertyFeaturesSection control={form.control} />

                  {/* Consultation Section */}
                  <ConsultationSection 
                    control={form.control}
                    showConsultationForm={showConsultationForm}
                    setShowConsultationForm={setShowConsultationForm}
                  />

                  {/* Additional Notes */}
                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Additional Notes (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional information about the property or special requirements"
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    disabled={isSubmitting} 
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white h-12 text-lg font-semibold"
                  >
                    {isSubmitting ? "Creating Your AI Listing..." : "Create AI-Powered Listing"}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="text-center bg-gray-50">
              <p className="text-sm text-gray-500 mx-auto">
                By submitting, you agree to our <a href="/terms" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealtorSubmissionForm;
