
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

      // Insert sample property data with comprehensive restraint information
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
          demographics: 'Affluent residential area with median income $150k+',
          restraints: {
            hoa: {
              name: 'Beverly Hills Estates HOA',
              monthlyFee: '$850',
              yearlyFee: '$10,200',
              rules: [
                'No commercial vehicles parked overnight',
                'Exterior modifications require architectural committee approval',
                'Landscaping must maintain Mediterranean aesthetic',
                'Maximum 2 pets per household (dogs under 50lbs)',
                'Quiet hours: 10 PM - 7 AM daily',
                'No short-term rentals (minimum 30-day lease)',
                'Pool parties limited to 15 guests',
                'Security gates must remain closed'
              ],
              amenities: [
                '24/7 gated security',
                'Community tennis court',
                'Clubhouse with gym',
                'Concierge services',
                'Landscaped walking trails'
              ]
            },
            zoning: {
              designation: 'R1 - Single Family Residential',
              description: 'Low density residential zoning',
              restrictions: [
                'Single family dwellings only',
                'Maximum 35% lot coverage',
                'Maximum 30-foot building height',
                'Minimum 25-foot front setback',
                'Minimum 15-foot side setbacks',
                'Minimum 20-foot rear setback',
                'Maximum 2-story structure'
              ],
              allowedUses: [
                'Single family residence',
                'Home office (professional services)',
                'Accessory dwelling unit (with permit)',
                'Swimming pool and spa',
                'Detached garage/carport'
              ]
            },
            deedRestrictions: [
              'No subdivision of the property',
              'Architectural style must be consistent with neighborhood character',
              'No fencing over 6 feet in height',
              'Driveway materials limited to natural stone or brick',
              'Tree removal requires city permit for trees over 8 inches diameter',
              'Easement for utility access along east property line (5-foot width)'
            ],
            buildingCodes: {
              permits: [
                'Building permit required for structures over 120 sq ft',
                'Electrical permit for any new circuits',
                'Plumbing permit for new fixtures',
                'Pool permit and safety inspections required'
              ],
              requirements: [
                'Seismic retrofitting compliance (California standards)',
                'Energy efficiency standards (Title 24 compliance)',
                'Fire safety clearance for hillside properties',
                'Water conservation landscaping requirements'
              ]
            },
            environmental: [
              'Located in moderate fire hazard zone',
              'Earthquake fault zone disclosure required',
              'Protected oak trees on northwest corner of property',
              'Stormwater management plan required for new construction'
            ]
          }
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
