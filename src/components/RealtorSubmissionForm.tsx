
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
import { Upload, X, Facebook, Instagram, Linkedin, Video, Calendar, FileText, Camera, User } from "lucide-react";

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
      listingUrl: "",
      agentEmail: "",
      contactPhone: "",
      propertyType: "",
      propertyFeatures: [],
      additionalNotes: "",
      agentHeadshot: "",
      logoUpload: "",
      knowledgeBaseFiles: [],
      propertyPhotos: [],
      videoLink: "",
      facebookUrl: "",
      instagramUrl: "",
      linkedinUrl: "",
      tiktokUrl: "",
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
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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
                      control={form.control}
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

                  {/* Agent Headshot Upload */}
                  <FormField
                    control={form.control}
                    name="agentHeadshot"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center">
                          <User className="mr-2" size={20} />
                          Upload Your Headshot
                        </FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('agentHeadshot', e.target.files, 1)}
                              className="hidden"
                              id="headshot-upload"
                            />
                            <label htmlFor="headshot-upload" className="cursor-pointer">
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600">Click to upload your professional headshot</p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                              </div>
                            </label>
                            {uploadedFiles.agentHeadshot && uploadedFiles.agentHeadshot.length > 0 && (
                              <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded">
                                <span className="text-sm text-gray-600">{uploadedFiles.agentHeadshot[0].name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile('agentHeadshot', 0)}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Logo Upload */}
                  <FormField
                    control={form.control}
                    name="logoUpload"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Add Your Logo (Optional)</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileUpload('logoUpload', e.target.files, 1)}
                              className="hidden"
                              id="logo-upload"
                            />
                            <label htmlFor="logo-upload" className="cursor-pointer">
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600">Upload your company logo</p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB</p>
                              </div>
                            </label>
                            {uploadedFiles.logoUpload && uploadedFiles.logoUpload.length > 0 && (
                              <div className="mt-4 flex items-center justify-between bg-gray-50 p-3 rounded">
                                <span className="text-sm text-gray-600">{uploadedFiles.logoUpload[0].name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile('logoUpload', 0)}
                                >
                                  <X size={16} />
                                </Button>
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Knowledge Base Upload */}
                  <FormField
                    control={form.control}
                    name="knowledgeBaseFiles"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center">
                          <FileText className="mr-2" size={20} />
                          Upload Docs to Power Your Listing's Knowledge Base
                        </FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.txt"
                              multiple
                              onChange={(e) => handleFileUpload('knowledgeBaseFiles', e.target.files, 10)}
                              className="hidden"
                              id="knowledge-upload"
                            />
                            <label htmlFor="knowledge-upload" className="cursor-pointer">
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600">Upload property documents, brochures, or information</p>
                                <p className="text-sm text-gray-400 mt-1">PDF, Word, Text files up to 10MB each</p>
                              </div>
                            </label>
                            {uploadedFiles.knowledgeBaseFiles && uploadedFiles.knowledgeBaseFiles.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {uploadedFiles.knowledgeBaseFiles.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                                    <span className="text-sm text-gray-600">{file.name}</span>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeFile('knowledgeBaseFiles', index)}
                                    >
                                      <X size={16} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Property Photos Upload */}
                  <FormField
                    control={form.control}
                    name="propertyPhotos"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center">
                          <Camera className="mr-2" size={20} />
                          Property Photos
                        </FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={(e) => handleFileUpload('propertyPhotos', e.target.files, 20)}
                              className="hidden"
                              id="photos-upload"
                            />
                            <label htmlFor="photos-upload" className="cursor-pointer">
                              <div className="text-center">
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600">Upload property photos</p>
                                <p className="text-sm text-gray-400 mt-1">PNG, JPG up to 10MB each (max 20 photos)</p>
                              </div>
                            </label>
                            {uploadedFiles.propertyPhotos && uploadedFiles.propertyPhotos.length > 0 && (
                              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                                {uploadedFiles.propertyPhotos.map((file, index) => (
                                  <div key={index} className="relative">
                                    <div className="bg-gray-50 p-2 rounded text-center">
                                      <span className="text-xs text-gray-600 block truncate">{file.name}</span>
                                    </div>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                                      onClick={() => removeFile('propertyPhotos', index)}
                                    >
                                      <X size={12} />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Video & Media Section */}
                  <FormField
                    control={form.control}
                    name="videoLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold flex items-center">
                          <Video className="mr-2" size={20} />
                          Video & Media Link
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Paste YouTube, Vimeo, or Loom link" 
                            {...field} 
                            className="h-12" 
                          />
                        </FormControl>
                        <FormDescription>
                          Add a property tour video or virtual walkthrough
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Social Media Links */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="facebookUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Facebook className="mr-2" size={16} />
                              Facebook
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://facebook.com/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="instagramUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Instagram className="mr-2" size={16} />
                              Instagram
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://instagram.com/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="linkedinUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <Linkedin className="mr-2" size={16} />
                              LinkedIn
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="https://linkedin.com/in/yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tiktokUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>TikTok</FormLabel>
                            <FormControl>
                              <Input placeholder="https://tiktok.com/@yourprofile" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Property Features */}
                  <FormField
                    control={form.control}
                    name="propertyFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Property Features (Optional)</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {['Pool', 'Garage', 'Garden', 'Fireplace', 'Balcony', 'Gym'].map((feature) => (
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

                  {/* Free Consultation Scheduler */}
                  <FormField
                    control={form.control}
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
                        control={form.control}
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
