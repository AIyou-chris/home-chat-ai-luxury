
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Top Producer, Century 21',
      location: 'Los Angeles, CA',
      content: 'This AI system transformed my business overnight. I went from missing weekend leads to capturing 300% more qualified prospects. The voice chat feature is incredible - buyers love talking to the listings!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      title: 'Luxury Real Estate Specialist',
      location: 'San Francisco, CA',
      content: 'My luxury clients expect premium service. This AI delivers that 24/7. Last month alone, it scheduled 15 high-value appointments while I was showing other properties. ROI was immediate.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    },
    {
      name: 'Lisa Rodriguez',
      title: 'Real Estate Team Leader',
      location: 'Miami, FL',
      content: 'Managing 20+ listings was overwhelming until we got this AI. Now every property has its own intelligent assistant. Our team productivity increased 400% and client satisfaction is through the roof.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Top Real Estate Professionals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of successful agents who've already transformed their business with AI-powered listings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 text-orange-200" size={32} />
                <p className="text-gray-700 leading-relaxed relative z-10 pl-6">
                  "{testimonial.content}"
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                  <p className="text-sm text-orange-600">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <p className="text-gray-600">Active Agents</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50K+</div>
              <p className="text-gray-600">Conversations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">15K+</div>
              <p className="text-gray-600">Leads Captured</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">300%</div>
              <p className="text-gray-600">Average ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
