
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Edit3, CheckCircle, AlertCircle, User, Phone, Mail, MapPin, Home, DollarSign } from 'lucide-react';

interface ScrapedData {
  title: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  description: string;
  images: string[];
  address: string;
  agentName?: string;
  agentPhoto?: string;
  agentPhone?: string;
  agentEmail?: string;
}

interface ScrapedResultsPreviewProps {
  scrapedData: ScrapedData;
  onContinue: () => void;
  onTryAgain: () => void;
}

export const ScrapedResultsPreview = ({ scrapedData, onContinue, onTryAgain }: ScrapedResultsPreviewProps) => {
  const hasValidImages = scrapedData.images.length > 0 && scrapedData.images[0] !== 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop';
  const hasAgentInfo = scrapedData.agentName && scrapedData.agentName !== 'Professional Agent';
  const hasRealAddress = scrapedData.address !== 'Contact agent for address';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Successfully Extracted Your Listing Data!
          </h1>
          <p className="text-lg text-gray-600">
            Here's what we found from your property listing. Review the details before proceeding to your personalized demo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Property Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="text-orange-600" size={20} />
                <span>Property Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">{scrapedData.title}</h3>
                <div className="flex items-center space-x-2 text-gray-600 mb-2">
                  <MapPin size={16} />
                  <span className="text-sm">{scrapedData.address}</span>
                  {hasRealAddress ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Extracted</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Using Default</Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="text-green-600" size={16} />
                <span className="text-2xl font-bold text-green-600">{scrapedData.price}</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">{scrapedData.beds}</div>
                  <div className="text-sm text-gray-600">Beds</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">{scrapedData.baths}</div>
                  <div className="text-sm text-gray-600">Baths</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="font-semibold">{scrapedData.sqft}</div>
                  <div className="text-sm text-gray-600">Sq Ft</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-gray-600 line-clamp-3">{scrapedData.description}</p>
              </div>
            </CardContent>
          </Card>

          {/* Agent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="text-blue-600" size={20} />
                <span>Agent Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={scrapedData.agentPhoto || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'}
                  alt="Agent"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{scrapedData.agentName}</h3>
                  {hasAgentInfo ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Extracted</Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Using Default</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={16} />
                  <span className="text-sm">{scrapedData.agentPhone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-sm">{scrapedData.agentEmail}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Images */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Property Images</span>
              {hasValidImages ? (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <CheckCircle size={12} className="mr-1" />
                  {scrapedData.images.length} Extracted
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <AlertCircle size={12} className="mr-1" />
                  Using Demo Images
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {scrapedData.images.slice(0, 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
          >
            Continue to Demo
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <Button
            onClick={onTryAgain}
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg font-semibold"
          >
            <Edit3 className="mr-2" size={20} />
            Try Different URL
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-blue-800 text-sm">
            <strong>Ready for your demo!</strong> This data will be used to create a personalized AI assistant experience.
            You can chat with the AI about this property, schedule viewings, and see how leads are captured.
          </p>
        </div>
      </div>
    </div>
  );
};
