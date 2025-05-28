
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, User, Link, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const RealtorSubmissionForm = () => {
  const [formData, setFormData] = useState({
    agentEmail: '',
    listingUrl: '',
    callLogs: '',
    additionalNotes: ''
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      // Validate file types (PDF/DOCX only)
      const validFiles = Array.from(uploadedFiles).filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      
      if (validFiles.length !== uploadedFiles.length) {
        toast({
          title: "Invalid file type",
          description: "Please upload only PDF or DOCX files",
          variant: "destructive"
        });
        return;
      }
      
      setFiles(uploadedFiles);
    }
  };

  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate image file types
      if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
        toast({
          title: "Invalid file type",
          description: "Please upload only JPG or PNG images",
          variant: "destructive"
        });
        return;
      }
      setHeadshot(file);
    }
  };

  const uploadFiles = async (submissionId: string) => {
    const uploadPromises = [];

    // Upload documents
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${submissionId}/documents/${file.name}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('realtor-submissions')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Document upload error:', uploadError);
          continue;
        }

        // Save document metadata
        uploadPromises.push(
          supabase.from('submission_documents').insert({
            submission_id: submissionId,
            file_name: file.name,
            file_type: file.type,
            file_url: uploadData.path,
            upload_type: 'document'
          })
        );
      }
    }

    // Upload headshot
    if (headshot) {
      const fileName = `${submissionId}/headshot/${headshot.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('realtor-submissions')
        .upload(fileName, headshot);

      if (!uploadError) {
        uploadPromises.push(
          supabase.from('submission_documents').insert({
            submission_id: submissionId,
            file_name: headshot.name,
            file_type: headshot.type,
            file_url: uploadData.path,
            upload_type: 'headshot'
          })
        );
      }
    }

    await Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agentEmail || !formData.listingUrl) {
      toast({
        title: "Missing required fields",
        description: "Please provide agent email and listing URL",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Process the submission
      const { data, error } = await supabase.functions.invoke('process-realtor-submission', {
        body: formData
      });

      if (error) throw error;

      // Upload files if submission was successful
      if (data.submissionId) {
        await uploadFiles(data.submissionId);
      }

      toast({
        title: "Submission successful!",
        description: "Your listing is being processed automatically. You'll receive an email when ready.",
      });

      // Reset form
      setFormData({
        agentEmail: '',
        listingUrl: '',
        callLogs: '',
        additionalNotes: ''
      });
      setFiles(null);
      setHeadshot(null);

    } catch (error: any) {
      console.error('Submission error:', error);
      toast({
        title: "Submission failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Submit New Listing</CardTitle>
          <CardDescription>
            Provide your listing URL and additional information. Our system will automatically extract property details, images, and create your listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Agent Email */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <User className="w-4 h-4 mr-2" />
                Agent Email *
              </label>
              <Input
                type="email"
                placeholder="your.email@agency.com"
                value={formData.agentEmail}
                onChange={(e) => handleInputChange('agentEmail', e.target.value)}
                className="focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            {/* Listing URL */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Link className="w-4 h-4 mr-2" />
                Listing URL *
              </label>
              <Input
                type="url"
                placeholder="https://www.example-mls.com/listing/123456"
                value={formData.listingUrl}
                onChange={(e) => handleInputChange('listingUrl', e.target.value)}
                className="focus:ring-orange-500 focus:border-orange-500"
                required
              />
              <p className="text-xs text-gray-500">
                Our system will automatically extract property details, images, and specifications from this URL
              </p>
            </div>

            {/* Document Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 mr-2" />
                Additional Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx"
                  onChange={handleFileUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Upload property documents (PDF, DOCX only)
                </p>
              </div>
            </div>

            {/* Headshot Upload */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Agent Headshot (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleHeadshotUpload}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Upload your professional headshot (JPG, PNG only)
                </p>
              </div>
            </div>

            {/* Call Logs */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4 mr-2" />
                Call Logs & Notes
              </label>
              <Textarea
                placeholder="Enter any client call logs, notes, or special instructions..."
                value={formData.callLogs}
                onChange={(e) => handleInputChange('callLogs', e.target.value)}
                className="min-h-[120px] focus:ring-orange-500 focus:border-orange-500 resize-y"
              />
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <Textarea
                placeholder="Any additional information about this listing..."
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                className="focus:ring-orange-500 focus:border-orange-500 resize-y"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
            >
              {isSubmitting ? 'Processing...' : 'Submit Listing'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
