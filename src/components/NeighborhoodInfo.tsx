
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Book } from 'lucide-react';

export const NeighborhoodInfo = () => {
  const amenities = [
    { name: 'Rodeo Drive', distance: '0.8 miles', type: 'Shopping' },
    { name: 'Beverly Hills Hotel', distance: '1.2 miles', type: 'Dining' },
    { name: 'Beverly Hills High School', distance: '0.5 miles', type: 'Education' },
    { name: 'Greystone Park', distance: '0.7 miles', type: 'Recreation' }
  ];

  const scores = [
    { label: 'Walk Score', value: 85, description: 'Very Walkable' },
    { label: 'Transit Score', value: 72, description: 'Excellent Transit' },
    { label: 'Bike Score', value: 68, description: 'Bikeable' }
  ];

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto bg-gray-900/30">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light mb-4">Neighborhood Excellence</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Located in the heart of Beverly Hills, you'll enjoy world-class amenities, 
          top-rated schools, and the prestige of one of LA's most coveted addresses.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Nearby Amenities */}
        <Card className="bg-black/50 border-gray-800 p-6">
          <h3 className="text-xl font-medium mb-6 flex items-center">
            <MapPin className="mr-2 text-amber-400" size={20} />
            Nearby Amenities
          </h3>
          <div className="space-y-4">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-b-0">
                <div>
                  <p className="font-medium">{amenity.name}</p>
                  <p className="text-sm text-gray-400">{amenity.type}</p>
                </div>
                <span className="text-amber-400 text-sm">{amenity.distance}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Walkability Scores */}
        <Card className="bg-black/50 border-gray-800 p-6">
          <h3 className="text-xl font-medium mb-6 flex items-center">
            <Clock className="mr-2 text-amber-400" size={20} />
            Lifestyle Scores
          </h3>
          <div className="space-y-6">
            {scores.map((score, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{score.label}</span>
                  <span className="text-2xl font-bold text-amber-400">{score.value}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${score.value}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">{score.description}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* School Information */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/30 p-8">
        <h3 className="text-2xl font-light mb-6 flex items-center">
          <Book className="mr-3 text-blue-400" size={24} />
          Educational Excellence
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">9/10</div>
            <p className="font-medium">Beverly Hills High</p>
            <p className="text-sm text-gray-400">Public School Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">10/10</div>
            <p className="font-medium">El Rodeo Elementary</p>
            <p className="text-sm text-gray-400">Elementary School Rating</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">8/10</div>
            <p className="font-medium">Horace Mann</p>
            <p className="text-sm text-gray-400">Middle School Rating</p>
          </div>
        </div>
      </Card>
    </section>
  );
};
