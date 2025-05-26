
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSampleProperty = () => {
  useEffect(() => {
    const insertSampleProperty = async () => {
      // Check if sample property already exists
      const { data: existing } = await supabase
        .from('properties')
        .select('id')
        .eq('title', 'Luxury Modern Estate')
        .single();

      if (existing) return; // Already exists

      // Insert sample property data
      const sampleProperty = {
        title: 'Luxury Modern Estate',
        listing_url: 'https://example.com/listing/123',
        address: '1247 Beverly Hills Drive, Beverly Hills, CA 90210',
        price: '$4,750,000',
        beds: 5,
        baths: 6,
        sqft: '6,200',
        description: 'Discover the epitome of modern luxury living in this architectural masterpiece. This stunning estate seamlessly blends contemporary design with timeless elegance, featuring soaring ceilings, floor-to-ceiling windows, and premium finishes throughout.',
        features: [
          'Gourmet chef\'s kitchen with Italian marble countertops',
          'Master suite with private terrace and spa-like bathroom',
          'Resort-style backyard with infinity pool and spa',
          'Home theater and wine cellar',
          'Smart home automation system',
          '3-car garage with Tesla charging station'
        ],
        neighborhood_data: {
          schools: ['Beverly Hills High School (9/10)', 'Hawthorne Elementary (10/10)'],
          nearby: ['Rodeo Drive (2 miles)', 'Beverly Hills Hotel (1.5 miles)', 'Century City Mall (3 miles)'],
          walkScore: 85,
          demographics: 'Affluent residential area with median income $150k+'
        },
        market_data: {
          pricePerSqft: 766,
          daysOnMarket: 14,
          priceHistory: 'Recently reduced from $4,950,000',
          comparables: 'Similar homes selling $4.2M - $5.1M'
        },
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2940&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2940&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2940&auto=format&fit=crop'
        ]
      };

      await supabase.from('properties').insert(sampleProperty);
    };

    insertSampleProperty();
  }, []);
};
