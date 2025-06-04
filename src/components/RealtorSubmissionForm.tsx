import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Upload, FileText, MessageSquare, CheckCircle } from 'lucide-react';
import BasicInfoSection from './form-sections/BasicInfoSection';
import PropertyFeaturesSection from './form-sections/PropertyFeaturesSection';
import MediaLinksSection from './form-sections/MediaLinksSection';
import FileUploadSection from './form-sections/FileUploadSection';
import ConsultationSection from './form-sections/ConsultationSection';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

const RealtorSubmissionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    price: '',
    beds: '',
    baths: '',
    sqft: '',
    description: '',
    propertyType: '',
    yearBuilt: '',
    lotSize: '',
    agentName: '',
    agentPhone: '',
    agentEmail: '',
    websiteLink: '',
    virtualTourLink: '',
    videoLink: '',
    additionalFeatures: '',
    uploadedFiles: [],
    consultationTime: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Upload files to Supabase storage
      const fileUrls = await Promise.all(
        formData.uploadedFiles.map(async (file) => {
          const { data, error } = await supabase.storage
            .from('listing-files')
            .upload(`${formData.title}/${file.name}`, file, {
              cacheControl: '3600',
              upsert: false,
            });

          if (error) {
            throw new Error(`File upload failed: ${error.message}`);
          }

          return supabase.storage.from('listing-files').getPublicUrl(data.path).data.publicUrl;
        })
      );

      // Prepare data for submission (including file URLs)
      const submissionData = {
        ...formData,
        fileUrls: fileUrls,
        submissionDate: new Date().toISOString(),
      };

      // Log the submission data (replace with actual submission logic)
      console.log('Form Data Submitted:', submissionData);

      // Show success toast
      toast({
        title: "Submission Received!",
        description: "We'll process your listing and contact you within 24 hours.",
      });

      setSubmitted(true);
      setFormData({
        title: '',
        address: '',
        price: '',
        beds: '',
        baths: '',
        sqft: '',
        description: '',
        propertyType: '',
        yearBuilt: '',
        lotSize: '',
        agentName: '',
        agentPhone: '',
        agentEmail: '',
        websiteLink: '',
        virtualTourLink: '',
        videoLink: '',
        additionalFeatures: '',
        uploadedFiles: [],
        consultationTime: '',
      });
    } catch (error: any) {
      console.error('Form submission error:', error.message);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "An error occurred while submitting. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-bold mb-2">
              Submit Your Listing for AI Enhancement
            </CardTitle>
            <p className="text-orange-100 text-lg">
              Transform your property into an intelligent, 24/7 sales assistant
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <BasicInfoSection formData={formData} setFormData={setFormData} />
              
              <PropertyFeaturesSection formData={formData} setFormData={setFormData} />
              
              <MediaLinksSection formData={formData} setFormData={setFormData} />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Upload className="text-orange-500" size={24} />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      Upload documents to power your listing knowledge base
                    </h3>
                    <p className="text-gray-600 mt-1">
                      (You will be able to add to the database when needed)
                    </p>
                  </div>
                </div>
                <FileUploadSection formData={formData} setFormData={setFormData} />
              </div>
              
              <ConsultationSection formData={formData} setFormData={setFormData} />

              <div className="pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 text-lg rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing Your Submission...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Submit for AI Enhancement
                    </>
                  )}
                </Button>
              </div>
            </form>

            {submitted && (
              <Card className="mt-8 bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">
                    Submission Received!
                  </h3>
                  <p className="text-green-700">
                    We'll process your listing and contact you within 24 hours with your AI-enhanced property assistant.
                  </p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RealtorSubmissionForm;
