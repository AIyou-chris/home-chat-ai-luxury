
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, User, FileText, Camera } from "lucide-react";

interface FileUploadSectionProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FileUploadSection = ({ formData, setFormData }: FileUploadSectionProps) => {
  const handleFileUpload = (field: string, files: FileList | null, maxFiles?: number) => {
    if (!files) return;

    const fileArray = Array.from(files);
    if (maxFiles && fileArray.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      return;
    }

    setFormData((prev: any) => ({
      ...prev,
      [field]: maxFiles === 1 ? fileArray : [...(prev[field] || []), ...fileArray]
    }));
  };

  const removeFile = (field: string, index: number) => {
    setFormData((prev: any) => {
      const files = prev[field] || [];
      const newFiles = files.filter((_: any, i: number) => i !== index);
      return { ...prev, [field]: newFiles };
    });
  };

  const uploadedFiles = {
    agentHeadshot: formData.agentHeadshot ? [formData.agentHeadshot] : [],
    logoUpload: formData.logoUpload ? [formData.logoUpload] : [],
    knowledgeBaseFiles: formData.uploadedFiles || [],
    propertyPhotos: formData.propertyPhotos || []
  };

  return (
    <div className="space-y-8">
      {/* Agent Headshot Upload */}
      <div>
        <label className="text-base font-semibold flex items-center mb-2">
          <User className="mr-2" size={20} />
          Upload Your Headshot
        </label>
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
              <span className="text-sm text-gray-600">{uploadedFiles.agentHeadshot[0].name || 'Headshot uploaded'}</span>
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
      </div>

      {/* Logo Upload */}
      <div>
        <label className="text-base font-semibold block mb-2">Add Your Logo (Optional)</label>
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
              <span className="text-sm text-gray-600">{uploadedFiles.logoUpload[0].name || 'Logo uploaded'}</span>
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
      </div>

      {/* Knowledge Base Upload */}
      <div>
        <label className="text-base font-semibold flex items-center mb-2">
          <FileText className="mr-2" size={20} />
          Upload Docs to Power Your Listing's Knowledge Base
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-orange-400 transition-colors">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            multiple
            onChange={(e) => handleFileUpload('uploadedFiles', e.target.files, 10)}
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
              {uploadedFiles.knowledgeBaseFiles.map((file: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                  <span className="text-sm text-gray-600">{file.name || `File ${index + 1}`}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile('uploadedFiles', index)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Property Photos Upload */}
      <div>
        <label className="text-base font-semibold flex items-center mb-2">
          <Camera className="mr-2" size={20} />
          Property Photos
        </label>
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
              {uploadedFiles.propertyPhotos.map((file: any, index: number) => (
                <div key={index} className="relative">
                  <div className="bg-gray-50 p-2 rounded text-center">
                    <span className="text-xs text-gray-600 block truncate">{file.name || `Photo ${index + 1}`}</span>
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
      </div>
    </div>
  );
};

export default FileUploadSection;
