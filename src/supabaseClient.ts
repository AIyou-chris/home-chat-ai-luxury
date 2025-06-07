// supabaseClient.ts - Create this file in your src/ folder
// supabaseClient.ts - TEMPORARY FIX
import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
  interface ImportMetaEnv {
    readonly VITE_SUPABASE_URL: string;
    readonly VITE_SUPABASE_ANON_KEY: string;
  }
  // Allow the client to be stored on the global object in development
  var __supabase: SupabaseClient | undefined;
}

// These values are injected by Vite from your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Environment variables loaded successfully

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? '✅ Present' : '❌ Missing');
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Present' : '❌ Missing');
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

// Define the database schema type
type Database = {
  public: {
    listings: {
      id: number;
      title: string;
      description: string;
      price: number;
      created_at: string;
    };
    leads: {
      id: number;
      listing_id: number;
      realtor_id: number;
      name: string | null;
      email: string | null;
      phone: string | null;
      source: string;
      user_agent: string;
      ip_address: string | null;
      chat_messages: string[];
      voice_interactions: string[];
      time_spent_seconds: number;
      pages_viewed: number;
      lead_score: number;
      lead_status: string;
      notes: string | null;
      created_at: string;
    };
  };
};

let supabase: SupabaseClient<Database>;

// Prevent multiple instances in development
if (import.meta.env.DEV) {
  if (!globalThis.__supabase) {
    globalThis.__supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    });
  }
  supabase = globalThis.__supabase;
} else {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export { supabase };

// Helper to get the current user's session
export const getCurrentSession = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
};

// Helper to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Export the typed Supabase client
export type TypedSupabaseClient = SupabaseClient<Database>;

// ... rest of your code stays the same

// Database functions for HomeListingAI

// Save scraped property data to Supabase (updated for your schema)
export async function saveListingToDatabase(listingData: any, realtorId: number) {
  try {
    console.log('💾 Saving listing to Supabase...', listingData);
    
    // Prepare the listing data for your simple schema
    const listingToSave = {
      title: listingData.address, // Using address as title
      description: JSON.stringify({
        // Store all the detailed property data in description as JSON
        address: listingData.address,
        bedrooms: listingData.bedrooms,
        bathrooms: listingData.bathrooms,
        sqft: listingData.sqft,
        lotSize: listingData.lotSize,
        yearBuilt: listingData.yearBuilt,
        propertyType: listingData.propertyType,
        propertyDescription: listingData.description,
        photos: listingData.photos || [],
        
        // Neighborhood data
        neighborhood: listingData.neighborhood || {},
        
        // Market data
        marketData: listingData.marketData || {},
        
        // Meta data
        scraped: listingData.scraped,
        sources: listingData.sources || ['Zillow']
      }),
      price: parseFloat(listingData.price?.replace(/[^0-9.]/g, '') || '0') // Convert price to number
    };

    const { data, error } = await supabase
      .from('listings')
      .insert([listingToSave])
      .select()
      .single();

    if (error) {
      console.error('❌ Error saving listing:', error);
      throw error;
    }

    console.log('✅ Listing saved successfully:', data);
    return data;
    
  } catch (err) {
    console.error('❌ Failed to save listing:', err);
    throw err;
  }
}

// Get all listings for a realtor (updated for your schema)
export async function getRealtorListings(realtorId) {
  try {
    // Since your listings table doesn't have realtor_id, we'll get all for now
    // TODO: Add realtor_id column to listings table or use a junction table
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Parse the JSON description back to objects
    return (data || []).map(listing => ({
      ...listing,
      parsedData: JSON.parse(listing.description || '{}')
    }));
  } catch (err) {
    console.error('❌ Error fetching listings:', err);
    return [];
  }
}

// Get dashboard analytics for a realtor (updated for your schema)
export async function getRealtorAnalytics(realtorId) {
  try {
    // Get listings count (all listings for now since no realtor_id in listings)
    const { data: listings, error: listingsError } = await supabase
      .from('listings')
      .select('id, price, created_at');

    if (listingsError) throw listingsError;

    // Get leads count with detailed breakdown
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('id, lead_status, source, lead_score, created_at, listing_id');

    if (leadsError) throw leadsError;

    // Calculate total listing value
    const totalValue = listings?.reduce((sum, listing) => {
      return sum + (listing.price || 0);
    }, 0) || 0;

    // Calculate lead metrics
    const totalLeads = leads?.length || 0;
    const newLeads = leads?.filter(l => l.lead_status === 'new').length || 0;
    const qualifiedLeads = leads?.filter(l => l.lead_status === 'qualified').length || 0;
    const closedLeads = leads?.filter(l => l.lead_status === 'closed').length || 0;
    
    // Lead sources breakdown
    const leadSources = leads?.reduce((acc, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
      return acc;
    }, {}) || {};

    // Recent activity (last 7 days)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const recentLeads = leads?.filter(l => l.created_at >= weekAgo).length || 0;

    return {
      // Basic metrics
      activeListings: listings?.length || 0, // All listings since no status field
      totalLeads: totalLeads,
      qrScans: 0, // No QR scans table yet
      totalValue: totalValue,
      
      // Lead breakdown
      newLeads: newLeads,
      qualifiedLeads: qualifiedLeads,
      closedLeads: closedLeads,
      conversionRate: totalLeads > 0 ? Math.round((closedLeads / totalLeads) * 100) : 0,
      
      // Lead sources
      leadSources: leadSources,
      
      // Recent activity
      recentLeads: recentLeads,
      recentScans: 0, // No QR tracking yet
      
      // Additional metrics
      averageLeadScore: totalLeads > 0 ? Math.round(leads.reduce((sum, l) => sum + (l.lead_score || 0), 0) / totalLeads) : 0
    };
    
  } catch (err) {
    console.error('❌ Error fetching analytics:', err);
    return {
      activeListings: 0,
      totalLeads: 0,
      qrScans: 0,
      totalValue: 0,
      newLeads: 0,
      qualifiedLeads: 0,
      closedLeads: 0,
      conversionRate: 0,
      leadSources: {},
      recentLeads: 0,
      recentScans: 0,
      averageLeadScore: 0
    };
  }
}

// Create a new lead with the updated schema
export async function createLead(leadData) {
  try {
    const leadToSave = {
      listing_id: leadData.listingId,
      realtor_id: leadData.realtorId,
      
      // Contact info
      name: leadData.name || null,
      email: leadData.email || null,
      phone: leadData.phone || null,
      
      // Source and interaction
      source: leadData.source || 'chat', // qr_code, direct_link, social_share, chat, voice
      user_agent: navigator.userAgent,
      ip_address: null, // Can be added later if needed
      
      // Interaction data
      chat_messages: leadData.chatMessages || [],
      voice_interactions: leadData.voiceInteractions || [],
      time_spent_seconds: leadData.timeSpent || 0,
      pages_viewed: leadData.pagesViewed || 1,
      
      // Lead scoring
      lead_score: leadData.leadScore || 0, // 0-100 based on interaction
      lead_status: leadData.leadStatus || 'new', // new, contacted, qualified, closed, lost
      
      // Follow-up
      notes: leadData.notes || null
    };

    const { data, error } = await supabase
      .from('leads')
      .insert([leadToSave])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating lead:', error);
      throw error;
    }
    
    console.log('✅ Lead created successfully:', data);
    return data;
  } catch (err) {
    console.error('❌ Failed to create lead:', err);
    throw err;
  }
}

// Update lead status and add notes
export async function updateLead(leadId, updates) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Error updating lead:', err);
    throw err;
  }
}

// Get leads for a specific listing
export async function getListingLeads(listingId) {
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('listing_id', listingId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('❌ Error fetching listing leads:', err);
    return [];
  }
}

// Get all leads for a realtor with filtering options (updated for your schema)
export async function getRealtorLeads(realtorId, filters = {}) {
  try {
    let query = supabase
      .from('leads')
      .select(`
        *,
        listings:listing_id (
          title,
          price
        )
      `);

    // Since your current schema might not have proper realtor linking, we'll get all leads for now
    // TODO: Add proper realtor_id relationship when you expand the schema
    
    // Apply filters
    if (filters.status) {
      query = query.eq('lead_status', filters.status);
    }
    
    if (filters.source) {
      query = query.eq('source', filters.source);
    }
    
    if (filters.dateFrom) {
      query = query.gte('created_at', filters.dateFrom);
    }
    
    if (filters.dateTo) {
      query = query.lte('created_at', filters.dateTo);
    }

    const { data, error } = await query
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (err) {
    console.error('❌ Error fetching realtor leads:', err);
    return [];
  }
}

// Calculate lead score based on interactions
export function calculateLeadScore(leadData) {
  let score = 0;
  
  // Base score for contact info
  if (leadData.email) score += 20;
  if (leadData.phone) score += 30;
  if (leadData.name) score += 10;
  
  // Time spent scoring
  const timeMinutes = (leadData.time_spent_seconds || 0) / 60;
  if (timeMinutes > 5) score += 20;
  else if (timeMinutes > 2) score += 10;
  else if (timeMinutes > 1) score += 5;
  
  // Chat interaction scoring
  const chatCount = leadData.chat_messages?.length || 0;
  if (chatCount > 10) score += 25;
  else if (chatCount > 5) score += 15;
  else if (chatCount > 2) score += 10;
  
  // Voice interaction scoring
  const voiceCount = leadData.voice_interactions?.length || 0;
  if (voiceCount > 0) score += 15; // Voice shows higher intent
  
  // Pages viewed scoring
  const pages = leadData.pages_viewed || 1;
  if (pages > 3) score += 10;
  else if (pages > 1) score += 5;
  
  // Cap at 100
  return Math.min(score, 100);
}

// Add chat message to lead
export async function addChatMessageToLead(leadId, message) {
  try {
    // First get the current lead data
    const { data: currentLead, error: fetchError } = await supabase
      .from('leads')
      .select('chat_messages, time_spent_seconds')
      .eq('id', leadId)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Add new message to chat history
    const updatedMessages = [...(currentLead.chat_messages || []), {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      type: message.type, // 'user' or 'bot'
      content: message.content,
      metadata: message.metadata || {}
    }];
    
    // Calculate new lead score
    const leadData = {
      ...currentLead,
      chat_messages: updatedMessages
    };
    const newScore = calculateLeadScore(leadData);
    
    // Update the lead
    const { data, error } = await supabase
      .from('leads')
      .update({
        chat_messages: updatedMessages,
        lead_score: newScore,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Error adding chat message to lead:', err);
    throw err;
  }
}

// Track lead interaction time
export async function updateLeadTimeSpent(leadId, additionalSeconds) {
  try {
    const { data: currentLead, error: fetchError } = await supabase
      .from('leads')
      .select('time_spent_seconds')
      .eq('id', leadId)
      .single();
    
    if (fetchError) throw fetchError;
    
    const newTimeSpent = (currentLead.time_spent_seconds || 0) + additionalSeconds;
    
    const { data, error } = await supabase
      .from('leads')
      .update({
        time_spent_seconds: newTimeSpent,
        updated_at: new Date().toISOString()
      })
      .eq('id', leadId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ Error updating lead time:', err);
    throw err;
  }
}

// Track QR code scan
export async function trackQRScan(listingId, metadata = {}) {
  try {
    // Note: You don't have a qr_scans table yet, so this is prepared for future use
    console.log('📱 QR scan tracked for listing:', listingId, metadata);
    
    // For now, we'll just log it. When you add the qr_scans table, uncomment below:
    /*
    const { data, error } = await supabase
      .from('qr_scans')
      .insert([{
        listing_id: listingId,
        ip_address: null,
        user_agent: navigator.userAgent,
        ...metadata
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
    */
  } catch (err) {
    console.error('❌ Error tracking QR scan:', err);
    // Don't throw - this is just tracking
  }
}

// Real-time subscriptions for lead notifications
export function subscribeToLeads(realtorId, callback) {
  return supabase
    .channel('leads')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'leads',
        filter: `realtor_id=eq.${realtorId}`
      },
      callback
    )
    .subscribe();
}

// Test database connection
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('count')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection failed:', err);
    return false;
  }
}