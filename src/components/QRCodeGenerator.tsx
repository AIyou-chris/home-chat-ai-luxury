
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface QRCodeGeneratorProps {
  property: {
    title: string;
    address: string;
  };
}

export const QRCodeGenerator = ({ property }: QRCodeGeneratorProps) => {
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();

  const currentUrl = window.location.href;
  // Using a free QR code API service
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `qr-code-${property.title.replace(/\s+/g, '-').toLowerCase()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "QR code saved to your downloads",
    });
  };

  return (
    <section className="py-8 px-6 md:px-8 max-w-7xl mx-auto">
      <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Share with QR Code</h3>
            <p className="text-gray-600">Generate a QR code for easy sharing and tracking</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowQR(!showQR)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              <QrCode className="mr-2" size={18} />
              {showQR ? 'Hide' : 'Generate'} QR Code
            </Button>
            
            {showQR && (
              <Button
                onClick={downloadQRCode}
                variant="outline"
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                <Download className="mr-2" size={18} />
                Download
              </Button>
            )}
          </div>
        </div>

        {showQR && (
          <div className="mt-6 flex flex-col items-center space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src={qrCodeUrl}
                alt="QR Code for property listing"
                className="w-48 h-48"
              />
            </div>
            <p className="text-sm text-gray-600 text-center max-w-md">
              Scan this QR code with any smartphone camera to instantly access this property listing. 
              Perfect for print materials, business cards, or yard signs.
            </p>
          </div>
        )}
      </Card>
    </section>
  );
};
