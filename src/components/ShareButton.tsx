
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share, Copy, MessageSquare, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  property: {
    title: string;
    address: string;
    price: string;
  };
}

export const ShareButton = ({ property }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const shareUrl = window.location.href;
  const shareText = `Check out this amazing property: ${property.title} at ${property.address} for ${property.price}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Property link copied to clipboard",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy link to clipboard",
        variant: "destructive"
      });
    }
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Amazing Property: ${property.title}`);
    const body = encodeURIComponent(`${shareText}\n\nView listing: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
    setIsOpen(false);
  };

  const shareViaSMS = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`sms:?body=${text}`);
    setIsOpen(false);
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setIsOpen(false);
  };

  const shareViaTwitter = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setIsOpen(false);
  };

  const shareViaLinkedIn = () => {
    const url = encodeURIComponent(shareUrl);
    const title = encodeURIComponent(property.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
    setIsOpen(false);
  };

  const shareViaWhatsApp = () => {
    const text = encodeURIComponent(`${shareText} ${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setIsOpen(false);
  };

  const shareOptions = [
    { name: 'Copy Link', icon: Copy, action: copyToClipboard },
    { name: 'Text/SMS', icon: MessageSquare, action: shareViaSMS },
    { name: 'Email', icon: Mail, action: shareViaEmail },
    { name: 'Facebook', icon: Facebook, action: shareViaFacebook },
    { name: 'Twitter', icon: Twitter, action: shareViaTwitter },
    { name: 'LinkedIn', icon: Linkedin, action: shareViaLinkedIn },
    { name: 'WhatsApp', icon: Instagram, action: shareViaWhatsApp },
  ];

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="lg"
        variant="outline"
        className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 font-medium px-6 py-3 rounded-xl transition-all duration-300"
      >
        <Share className="mr-2" size={20} />
        Share Property
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 right-0 z-50 p-4 min-w-[200px] shadow-xl border-gray-200">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-800 mb-3">Share this property</h3>
              {shareOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.name}
                    variant="ghost"
                    size="sm"
                    onClick={option.action}
                    className="w-full justify-start text-gray-700 hover:bg-gray-100"
                  >
                    <Icon size={16} className="mr-3" />
                    {option.name}
                  </Button>
                );
              })}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
