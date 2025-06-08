import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Edit3, CheckCircle, AlertTriangle, User, Phone, Mail, MapPin, Home, DollarSign, Image, FileText } from 'lucide-react';

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
  // Enhanced detection of real vs default data
  const isRealTitle = scrapedData.title !== 'Beautiful Property' && 
                     !scrapedData.title.includes('Beautiful Property');
  
  const isRealPrice = scrapedData.price !== '$750,000' && 
                      scrapedData.price.includes('$') && 
                      scrapedData.price.length > 3;
  
  const isRealAddress = scrapedData.address !== 'Contact agent for address' && 
                        scrapedData.address.length > 10 &&
                        !scrapedData.address.includes('Contact agent');
  
  const isRealDescription = scrapedData.description !== 'Beautiful property with modern amenities and great location.' &&
                           scrapedData.description.length > 50 &&
                           !scrapedData.description.includes('Beautiful property with modern amenities');
  
  const isRealAgent = !!(scrapedData.agentName && 
                         scrapedData.agentName !== 'Professional Agent' && 
                         scrapedData.agentName !== '' &&
                         !scrapedData.agentName.includes('Professional Agent'));
  
  const isRealPhone = !!(scrapedData.agentPhone && 
                         scrapedData.agentPhone !== '(555) 123-4567' && 
                         scrapedData.agentPhone.length >= 10);
  
  const isRealEmail = !!(scrapedData.agentEmail && 
                         scrapedData.agentEmail !== 'agent@realestate.com' && 
                         scrapedData.agentEmail.includes('@') &&
                         !scrapedData.agentEmail.includes('agent@realestate.com'));

  const hasRealImages = scrapedData.images.some(img => 
    !img.includes('unsplash.com/photo-1600596542815') &&
    !img.includes('unsplash.com/photo-1600607687939') &&
    !img.includes('unsplash.com/photo-1600566753086')
  );

  // Calculate extraction success rate
  const totalFields = 8;
  const extractedFields = [
    isRealTitle, isRealPrice, isRealAddress, isRealDescription,
    isRealAgent, isRealPhone, isRealEmail, hasRealImages
  ].filter(Boolean).length;
  
  const successRate = Math.round((extractedFields / totalFields) * 100);

  const DataBadge = ({ isReal, label }: { isReal: boolean; label: string }) => (
    <Badge 
      variant="secondary" 
      className={isReal ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}
    >
      {isReal ? (
        <>
          <CheckCircle size={12} className="mr-1" />
          Extracted
        </>
      ) : (
        <>
          <AlertTriangle size={12} className="mr-1" />
          Default
        </>
      )}
    </Badge>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Data Extraction Complete!
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Successfully extracted your property listing data with {successRate}% accuracy.
          </p>
          
          {/* Extraction Success Summary */}
          <div className="inline-flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{extractedFields}</div>
              <div className="text-sm text-gray-600">Fields Extracted</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{totalFields - extractedFields}</div>
              <div className="text-sm text-gray-600">Using Defaults</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{successRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{scrapedData.title}</h3>
                  <DataBadge isReal={isRealTitle} label="Title" />
                </div>
                <div className="flex items-center space-x-2 text-gray-600 mb-3">
                  <MapPin size={16} />
                  <span className="text-sm flex-1">{scrapedData.address}</span>
                  <DataBadge isReal={isRealAddress} label="Address" />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="text-green-600" size={16} />
                  <span className="text-2xl font-bold text-green-600">{scrapedData.price}</span>
                </div>
                <DataBadge isReal={isRealPrice} label="Price" />
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
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium flex items-center space-x-2">
                    <FileText size={16} />
                    <span>Description</span>
                  </h4>
                  <DataBadge isReal={isRealDescription} label="Description" />
                </div>
                <p className="text-sm text-gray-600 line-clamp-4">{scrapedData.description}</p>
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
                <div className="flex-1">
                  <h3 className="font-semibold">{scrapedData.agentName}</h3>
                  <DataBadge isReal={isRealAgent} label="Agent" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="text-gray-400" size={16} />
                    <span className="text-sm">{scrapedData.agentPhone}</span>
                  </div>
                  <DataBadge isReal={isRealPhone} label="Phone" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-gray-400" size={16} />
                    <span className="text-sm">{scrapedData.agentEmail}</span>
                  </div>
                  <DataBadge isReal={isRealEmail} label="Email" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Images */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image className="text-purple-600" size={20} />
                <span>Property Images</span>
              </div>
              <DataBadge isReal={hasRealImages} label={`${scrapedData.images.length} Images`} />
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
            {hasRealImages && (
              <p className="text-sm text-green-600 mt-3 flex items-center">
                <CheckCircle size={14} className="mr-1" />
                Found {scrapedData.images.filter(img => !img.includes('unsplash.com')).length} real property images from the listing
              </p>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={async () => {
              console.log('💾 Saving property to database...');
              
              // Save to Supabase database
              const { supabase } = await import('../integrations/supabase/client');
              
              const propertyData = {
                title: scrapedData.title,
                listing_url: window.location.href,
                address: scrapedData.address,
                price: scrapedData.price,
                beds: parseInt(scrapedData.beds) || 0,
                baths: parseFloat(scrapedData.baths) || 0,
                sqft: scrapedData.sqft,
                description: scrapedData.description,
                images: scrapedData.images,
                agent_name: scrapedData.agentName,
                agent_phone: scrapedData.agentPhone,
                agent_email: scrapedData.agentEmail,
                agent_photo: scrapedData.agentPhoto,
                features: [
                  `${scrapedData.beds} bedrooms`,
                  `${scrapedData.baths} bathrooms`, 
                  `${scrapedData.sqft} square feet`,
                  'Recently scraped from web listing'
                ],
                market_data: {
                  pricePerSqft: Math.round(parseInt(scrapedData.price.replace(/[^0-9]/g, '')) / parseInt(scrapedData.sqft.replace(/[^0-9]/g, '')) || 0),
                  daysOnMarket: 1,
                  priceHistory: 'Recently scraped',
                  comparables: 'Data extracted from listing'
                },
                neighborhood_data: {
                  schools: ['Local Schools (Rating TBD)'],
                  nearby: [`Located in ${scrapedData.address}`],
                  walkScore: 75,
                  demographics: 'Area demographics available upon request'
                }
              };

              try {
                const { data, error } = await supabase
                  .from('properties')
                  .insert(propertyData)
                  .select();

                if (error) throw error;
                
                console.log('✅ Property saved successfully:', data);
                alert('🎉 Property saved to database successfully! You can now find it in your listings.');
                
                // Continue to demo after saving
                onContinue();
              } catch (error) {
                console.error('❌ Error saving property:', error);
                alert('⚠️ Error saving property. Continuing to demo anyway...');
                onContinue();
              }
            }}
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold"
          >
            💾 Save & Continue to Demo
            <ArrowRight className="ml-2" size={20} />
          </Button>
          
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg font-semibold"
          >
            Continue to Demo Only
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
            <strong>Extraction Results:</strong> We successfully extracted {extractedFields} out of {totalFields} data fields from your listing.
            The AI assistant will use this real data to provide personalized responses about your property.
          </p>
        </div>
      </div>
    </div>
  );
};
