
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Home, Building, Warehouse, MessageSquare, Calendar, TrendingUp, ArrowRight } from 'lucide-react';

export const MultiListingShowcase = () => {
  const properties = [
    {
      type: 'House',
      icon: Home,
      title: 'Luxury Family Home',
      price: '$750,000',
      status: 'Active',
      leads: 12,
      appointments: 3,
      image: '/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png'
    },
    {
      type: 'Condo',
      icon: Building,
      title: 'Downtown Condo',
      price: '$450,000',
      status: 'Active',
      leads: 8,
      appointments: 2,
      image: '/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png'
    },
    {
      type: 'Commercial',
      icon: Warehouse,
      title: 'Office Space',
      price: '$1,200,000',
      status: 'Active',
      leads: 5,
      appointments: 1,
      image: '/lovable-uploads/8fee2013-89fc-47e0-ba14-1795e366cdc3.png'
    }
  ];

  return (
    <div className="py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 mb-4 inline-block">
              🏘️ Unlimited Listings
            </Badge>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Manage 10+ Listings Simultaneously
            </h2>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Each property gets its own AI agent that works 24/7. Scale your business without 
              scaling your workload. One dashboard controls everything.
            </p>
          </div>

          {/* Three Properties Side by Side */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {properties.map((property, index) => {
              const IconComponent = property.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-800">
                        <IconComponent className="mr-1" size={14} />
                        {property.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        AI Active
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{property.title}</h3>
                    <p className="text-2xl font-bold text-orange-500 mb-4">{property.price}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="text-blue-500" size={16} />
                          <span className="text-sm font-medium">Leads Today</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">{property.leads}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="text-green-500" size={16} />
                          <span className="text-sm font-medium">Appointments</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{property.appointments}</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-600">AI is actively responding to inquiries</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white text-center">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold mb-2">25</div>
                <div className="text-purple-100">Total Leads Today</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">6</div>
                <div className="text-purple-100">Appointments Scheduled</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-purple-100">AI Availability</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">
              One Agent. Unlimited Properties. Maximum Results.
            </h3>
            
            <Button
              onClick={() => window.location.href = '/submit'}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-xl"
            >
              Start Managing Multiple Listings
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
