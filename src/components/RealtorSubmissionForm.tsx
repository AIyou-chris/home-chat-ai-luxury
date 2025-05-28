
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, User, Link, MessageSquare, Instagram, Facebook, Youtube, Calendar, Phone, Sparkles, Video, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  agentEmail: string;
  listingUrl: string;
  additionalNotes: string;
  // Social Media & Video Fields
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  virtualTour: string;
  videoWalkthrough: string;
  // Custom Build Consultation Fields
  customBuildInterest: boolean;
  contactPhone: string;
  callTime: string;
}

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export const RealtorSubmissionForm = () => {
  const [formData, setFormData] = useState<FormData>({
    agentEmail: '',
    listingUrl: '',
    additionalNotes: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    virtualTour: '',
    videoWalkthrough: '',
    customBuildInterest: false,
    contactPhone: '',
    callTime: '',
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [headshot, setHeadshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [urlValidations, setUrlValidations] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // URL validation for social media and video fields
    if (typeof value === 'string' && ['instagram', 'facebook', 'youtube', 'tiktok', 'virtualTour', 'videoWalkthrough'].includes(field)) {
      const isValidUrl = !value || isValidURL(value);
      setUrlValidations(prev => ({ ...prev, [field]: isValidUrl }));
    }
  };

  const isValidURL = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('contactPhone', formatted);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
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
      if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
        toast({
          title: "Invalid file type",
          description: "Please upload only JPG or PNG images",
          variant: "destructive"
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      setHeadshot(file);
    }
  };

  const uploadFiles = async (submissionId: string) => {
    const uploadPromises = [];

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

    if (formData.customBuildInterest && (!formData.contactPhone || !formData.callTime)) {
      toast({
        title: "Missing consultation details",
        description: "Please provide phone number and preferred call time for the consultation",
        variant: "destructive"
      });
      return;
    }

    const hasInvalidUrls = Object.values(urlValidations).some(isValid => isValid === false);
    if (hasInvalidUrls) {
      toast({
        title: "Invalid URLs",
        description: "Please check your social media and video links",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        agentEmail: formData.agentEmail,
        listingUrl: formData.listingUrl,
        additionalNotes: formData.additionalNotes,
        socialMedia: {
          instagram: formData.instagram,
          facebook: formData.facebook,
          youtube: formData.youtube,
          tiktok: formData.tiktok,
          virtualTour: formData.virtualTour,
          videoWalkthrough: formData.videoWalkthrough,
        },
        customBuildInterest: formData.customBuildInterest,
        contactPhone: formData.contactPhone,
        callTime: formData.callTime,
      };

      const { data, error } = await supabase.functions.invoke('process-realtor-submission', {
        body: submissionData
      });

      if (error) throw error;

      if (data.submissionId) {
        await uploadFiles(data.submissionId);
      }

      toast({
        title: "Submission successful!",
        description: formData.customBuildInterest 
          ? "Your listing is being processed. A builder will reach out to discuss custom options!"
          : "Your listing is being processed automatically. You'll receive an email when ready.",
      });

      // Reset form
      setFormData({
        agentEmail: '',
        listingUrl: '',
        additionalNotes: '',
        instagram: '',
        facebook: '',
        youtube: '',
        tiktok: '',
        virtualTour: '',
        videoWalkthrough: '',
        customBuildInterest: false,
        contactPhone: '',
        callTime: '',
      });
      setFiles(null);
      setHeadshot(null);
      setUrlValidations({});

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

  const getFilePreview = (fileList: FileList | null) => {
    if (!fileList) return null;
    return Array.from(fileList).map((file, index) => (
      <div key={index} className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
        <FileText size={16} />
        <span>{file.name}</span>
        <span className="text-xs">({(file.size / 1024).toFixed(1)} KB)</span>
      </div>
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900">Submit New Listing</CardTitle>
          <CardDescription>
            Provide your listing details, social media presence, and video content. Our system will automatically extract property details and create your listing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              
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
            </div>

            {/* Social Media & Video Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Social Media & Video Links</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Instagram className="w-4 h-4 mr-2" />
                    Instagram Profile/Post
                  </label>
                  <Input
                    type="url"
                    placeholder="https://instagram.com/youragency"
                    value={formData.instagram}
                    onChange={(e) => handleInputChange('instagram', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.instagram === false ? 'border-red-500' : ''
                    }`}
                  />
                  {urlValidations.instagram === false && (
                    <p className="text-xs text-red-500 flex items-center">
                      <AlertCircle size={12} className="mr-1" />
                      Invalid URL format
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook Profile/Post
                  </label>
                  <Input
                    type="url"
                    placeholder="https://facebook.com/youragency"
                    value={formData.facebook}
                    onChange={(e) => handleInputChange('facebook', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.facebook === false ? 'border-red-500' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Youtube className="w-4 h-4 mr-2" />
                    YouTube Channel/Video
                  </label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/@youragency"
                    value={formData.youtube}
                    onChange={(e) => handleInputChange('youtube', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.youtube === false ? 'border-red-500' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    TikTok Profile/Video
                  </label>
                  <Input
                    type="url"
                    placeholder="https://tiktok.com/@youragency"
                    value={formData.tiktok}
                    onChange={(e) => handleInputChange('tiktok', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.tiktok === false ? 'border-red-500' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Virtual Tour Link
                  </label>
                  <Input
                    type="url"
                    placeholder="https://virtualtour.com/property/123"
                    value={formData.virtualTour}
                    onChange={(e) => handleInputChange('virtualTour', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.virtualTour === false ? 'border-red-500' : ''
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Video className="w-4 h-4 mr-2" />
                    Video Walkthrough
                  </label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/watch?v=abc123"
                    value={formData.videoWalkthrough}
                    onChange={(e) => handleInputChange('videoWalkthrough', e.target.value)}
                    className={`focus:ring-orange-500 focus:border-orange-500 ${
                      urlValidations.videoWalkthrough === false ? 'border-red-500' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Custom Build Consultation CTA */}
            <div className="space-y-6">
              <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                    <CardTitle className="text-lg text-orange-900">Want Custom Features or Upgrades?</CardTitle>
                  </div>
                  <CardDescription className="text-orange-700">
                    Schedule a <span className="font-bold text-orange-800">FREE</span> call with one of our expert builders — customizations start at just <span className="font-bold text-orange-800">$99</span>.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={formData.customBuildInterest}
                      onCheckedChange={(checked) => handleInputChange('customBuildInterest', checked)}
                      className="data-[state=checked]:bg-orange-600"
                    />
                    <label className="text-sm font-medium text-orange-900">
                      Yes, I want to book a FREE consultation call
                    </label>
                  </div>
                  
                  {formData.customBuildInterest && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-white rounded-lg border border-orange-200">
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number *
                        </label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.contactPhone}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          className="focus:ring-orange-500 focus:border-orange-500"
                          required={formData.customBuildInterest}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="flex items-center text-sm font-medium text-gray-700">
                          <Calendar className="w-4 h-4 mr-2" />
                          Preferred Call Time *
                        </label>
                        <select
                          value={formData.callTime}
                          onChange={(e) => handleInputChange('callTime', e.target.value)}
                          className="w-full h-10 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                          required={formData.customBuildInterest}
                        >
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* File Uploads */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Files</h3>
              
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Property Documents
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
                {files && (
                  <div className="space-y-2 mt-3">
                    {getFilePreview(files)}
                  </div>
                )}
              </div>

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
                    Upload your professional headshot (JPG, PNG only, max 5MB)
                  </p>
                </div>
                {headshot && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded mt-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span>{headshot.name}</span>
                    <span className="text-xs">({(headshot.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Additional Notes
              </label>
              <Textarea
                placeholder="Any additional information about this listing, special features, or instructions..."
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                className="focus:ring-orange-500 focus:border-orange-500 resize-y"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 text-lg font-medium"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing Submission...</span>
                </div>
              ) : (
                'Submit Listing'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
