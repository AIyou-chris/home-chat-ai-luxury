
import React from 'react';
import { Input } from "@/components/ui/input";
import { Video, Facebook, Instagram, Linkedin } from "lucide-react";

interface MediaLinksSectionProps {
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MediaLinksSection = ({ formData, setFormData }: MediaLinksSectionProps) => {
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8">
      {/* Video & Media Section */}
      <div>
        <label className="text-base font-semibold flex items-center mb-2">
          <Video className="mr-2" size={20} />
          Video & Media Link
        </label>
        <Input 
          placeholder="Paste YouTube, Vimeo, or Loom link" 
          value={formData.videoLink || ''} 
          onChange={(e) => handleInputChange('videoLink', e.target.value)}
          className="h-12" 
        />
        <p className="text-sm text-gray-600 mt-1">
          Add a property tour video or virtual walkthrough
        </p>
      </div>

      {/* Social Media Links */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center mb-2">
              <Facebook className="mr-2" size={16} />
              Facebook
            </label>
            <Input 
              placeholder="https://facebook.com/yourprofile" 
              value={formData.facebookUrl || ''} 
              onChange={(e) => handleInputChange('facebookUrl', e.target.value)}
            />
          </div>
          <div>
            <label className="flex items-center mb-2">
              <Instagram className="mr-2" size={16} />
              Instagram
            </label>
            <Input 
              placeholder="https://instagram.com/yourprofile" 
              value={formData.instagramUrl || ''} 
              onChange={(e) => handleInputChange('instagramUrl', e.target.value)}
            />
          </div>
          <div>
            <label className="flex items-center mb-2">
              <Linkedin className="mr-2" size={16} />
              LinkedIn
            </label>
            <Input 
              placeholder="https://linkedin.com/in/yourprofile" 
              value={formData.linkedinUrl || ''} 
              onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block">TikTok</label>
            <Input 
              placeholder="https://tiktok.com/@yourprofile" 
              value={formData.tiktokUrl || ''} 
              onChange={(e) => handleInputChange('tiktokUrl', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaLinksSection;
