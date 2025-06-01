
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Upload, X, User, FileText, Camera } from "lucide-react";
import { Control } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface FormValues {
  agentHeadshot?: string;
  logoUpload?: string;
  knowledgeBaseFiles?: string[];
  propertyPhotos?: string[];
}

interface FileUploadSectionProps {
  control: Control<FormValues>;
  uploadedFiles: {[key: string]: File[]};
  onFileUpload: (field: string, files: FileList | null, maxFiles?: number) => void;
  onRemoveFile: (field: string, index: number) => void;
}

const FileUploadSection = ({ control, uploadedFiles, onFileUpload, onRemoveFile }: FileUploadSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Agent Headshot Upload */}
      <FormField
        control={control}
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
                  onChange={(e) => onFileUpload('agentHeadshot', e.target.files, 1)}
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
                      onClick={() => onRemoveFile('agentHeadshot', 0)}
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
        control={control}
        name="logoUpload"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-semibold">Add Your Logo (Optional)</FormLabel>
            <FormControl>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onFileUpload('logoUpload', e.target.files, 1)}
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
                      onClick={() => onRemoveFile('logoUpload', 0)}
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
        control={control}
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
                  onChange={(e) => onFileUpload('knowledgeBaseFiles', e.target.files, 10)}
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
                          onClick={() => onRemoveFile('knowledgeBaseFiles', index)}
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
        control={control}
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
                  onChange={(e) => onFileUpload('propertyPhotos', e.target.files, 20)}
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
                          onClick={() => onRemoveFile('propertyPhotos', index)}
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
    </div>
  );
};

export default FileUploadSection;
