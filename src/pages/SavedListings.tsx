import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { supabase } from '../integrations/supabase/client';
import { Home, DollarSign, Bed, Bath, Square, MapPin, Calendar, Eye, Trash2 } from 'lucide-react';

interface SavedProperty {
  id: string;
  title: string;
  address: string;
  price: string;
  beds: number | null;
  baths: number | null;
  sqft: string;
  description: string | null;
  images: string[] | null;
  agent_name?: string | null;
  agent_phone?: string | null;
  agent_email?: string | null;
  created_at: string;
}

export const SavedListings = () => {
  const [properties, setProperties] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProperties(properties.filter(p => p.id !== id));
      alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Error deleting property.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your saved properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Saved Property Listings</h1>
          <p className="text-lg text-gray-600">
            {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} saved to your database
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center bg-white rounded-lg shadow-md p-12">
            <Home className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Saved Yet</h3>
            <p className="text-gray-600 mb-6">
              Start by scraping a property listing to save it to your database.
            </p>
            <Button
              onClick={() => window.location.href = '/add-listing'}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Add Your First Property
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800'}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                    <button
                      onClick={() => deleteProperty(property.id)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{property.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={14} className="mr-1" />
                    <span className="text-sm line-clamp-1">{property.address}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-green-600 font-bold text-xl">
                      <DollarSign size={18} />
                      <span>{property.price}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center justify-center mb-1">
                        <Bed size={14} className="mr-1" />
                        <span className="font-semibold">{property.beds}</span>
                      </div>
                      <div className="text-xs text-gray-600">Beds</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center justify-center mb-1">
                        <Bath size={14} className="mr-1" />
                        <span className="font-semibold">{property.baths}</span>
                      </div>
                      <div className="text-xs text-gray-600">Baths</div>
                    </div>
                    <div className="bg-gray-50 rounded p-2">
                      <div className="flex items-center justify-center mb-1">
                        <Square size={14} className="mr-1" />
                        <span className="font-semibold">{property.sqft}</span>
                      </div>
                      <div className="text-xs text-gray-600">Sq Ft</div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                    {property.description}
                  </p>

                  {property.agent_name && (
                    <div className="bg-blue-50 rounded p-2 mb-3">
                      <div className="text-sm font-medium text-blue-800">{property.agent_name}</div>
                      {property.agent_phone && (
                        <div className="text-xs text-blue-600">{property.agent_phone}</div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" />
                      <span>Saved {new Date(property.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{property.images?.length || 0} photos</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => window.open(`/property/${property.id}`, '_blank')}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    View Full Listing
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedListings; 