
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Video, Facebook, Instagram, Linkedin } from "lucide-react";
import { Control } from "react-hook-form";
import { FormValues } from "@/types/form";

interface MediaLinksSectionProps {
  control: Control<FormValues>;
}

const MediaLinksSection = ({ control }: MediaLinksSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Video & Media Section */}
      <FormField
        control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
            control={control}
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
    </div>
  );
};

export default MediaLinksSection;
