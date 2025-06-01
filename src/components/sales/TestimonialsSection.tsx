
import { Star, Quote, Calendar, Smartphone, Home, Users, Zap, TrendingUp } from 'lucide-react';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'S Jones',
      title: 'Top Producer, Century 21',
      location: 'Los Angeles, CA',
      content: 'This AI system transformed my business overnight. I went from missing weekend leads to capturing 300% more qualified prospects. The voice chat feature is incredible - buyers love talking to the listings!',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    },
    {
      name: 'M Sheen',
      title: 'Luxury Real Estate Specialist',
      location: 'San Francisco, CA',
      content: 'My luxury clients expect premium service. This AI delivers that 24/7. Last month alone, it scheduled 15 high-value appointments while I was showing other properties. ROI was immediate.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    },
    {
      name: 'El Rodriguez',
      title: 'Real Estate Team Leader',
      location: 'Miami, FL',
      content: 'Managing 20+ listings was overwhelming until we got this AI. Now every property has its own intelligent assistant. Our team productivity increased 400% and client satisfaction is through the roof.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop&crop=face'
    }
  ];

  const milestones = [
    {
      year: '1997',
      title: 'First Online Store',
      description: 'Launched our first e-commerce platform before it was mainstream',
      icon: Home
    },
    {
      year: '2005',
      title: 'Mobile Innovation',
      description: 'Released our first mobile app, meeting customers on the go',
      icon: Smartphone
    },
    {
      year: '2021',
      title: 'AI Research Lab',
      description: 'Started deep AI research, spending hundreds of hours perfecting automation',
      icon: Zap
    },
    {
      year: 'Today',
      title: 'AI-Powered Sales',
      description: 'Next-gen blend of human instinct and machine precision',
      icon: TrendingUp
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Trusted by Top Real Estate Professionals
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto">
            Join hundreds of successful agents who've already transformed their business with AI-powered listings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              
              <div className="relative mb-6">
                <Quote className="absolute -top-2 -left-2 text-orange-200" size={32} />
                <p className="text-gray-700 leading-relaxed relative z-10 pl-6 text-sm sm:text-base">
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

        {/* Our Story Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 sm:p-12 lg:p-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Story: Built on Hustle. Proven by Results.
            </h2>
            <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              In 1997, we launched our first online store—long before "e-commerce" became a buzzword. By 2005, we released our first mobile app, meeting customers where they lived: on the go. And we're just getting started.
            </p>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-orange-600 mb-2">{milestone.year}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                  <p className="text-gray-600 text-sm">{milestone.description}</p>
                </div>
              );
            })}
          </div>

          {/* Company Description */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                For the past 3 years, we've been deep in the lab—spending hundreds of hours perfecting 
                <span className="font-semibold text-orange-600"> AI prompting and automation</span>. The result? 
                A next-gen blend of human instinct and machine precision that supercharges every message, every lead, every move.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-base sm:text-lg">
                From our dial-up days to today's AI-driven funnels, we've always been ahead of the curve—helping thousands of families get funded, faster. We don't just close loans—we build lifetime loyalty.
              </p>
              <div className="text-center">
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  Legacy. Innovation. Relentless results. That's our DNA.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">50K+</div>
              <p className="text-gray-600 text-sm sm:text-base">Conversations</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">15K+</div>
              <p className="text-gray-600 text-sm sm:text-base">Leads Captured</p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600">300%</div>
              <p className="text-gray-600 text-sm sm:text-base">Average ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
