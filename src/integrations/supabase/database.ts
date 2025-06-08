import { supabase } from './client';
import type { Database } from './types';

type Property = Database['public']['Tables']['properties']['Insert'];
type Lead = Database['public']['Tables']['leads']['Insert'];

export async function saveListingToDatabase(formData: any, userId: string) {
  try {
    // First, create the property record
    const propertyData: Property = {
      title: formData.title || 'New Property Listing',
      address: formData.address || '',
      description: formData.description || null,
      price: formData.price || null,
      beds: formData.beds || null,
      baths: formData.baths || null,
      sqft: formData.sqft || null,
      features: formData.features || null,
      images: formData.images || null,
      listing_url: formData.listingUrl || null,
      agent_id: userId,
    };

    const { data: property, error: propertyError } = await supabase
      .from('properties')
      .insert(propertyData)
      .select()
      .single();

    if (propertyError) throw propertyError;

    // Then, create a lead record associated with this property
    const leadData: Lead = {
      property_id: property.id,
      session_id: `session_${Date.now()}`,
      contact_info: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      interest_level: 'high',
      qualified_status: 'new',
    };

    const { error: leadError } = await supabase
      .from('leads')
      .insert(leadData);

    if (leadError) throw leadError;

    return { property, success: true };
  } catch (error) {
    console.error('Error saving listing to database:', error);
    throw error;
  }
} 