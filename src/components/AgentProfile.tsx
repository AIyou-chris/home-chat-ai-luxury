
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Instagram, Facebook, Twitter, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const AgentProfile = () => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const { toast } = useToast();
  const [leadData, setLeadData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timeframe: '',
    budget: '',
    message: 'I\'m interested in this luxury property and would like to schedule a private tour.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setLeadData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Lead Captured!",
      description: "Thank you for your interest. Michael will contact you within 1 hour to discuss this property.",
    });
    
    setLeadData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      timeframe: '',
      budget: '',
      message: 'I\'m interested in this luxury property and would like to schedule a private tour.'
    });
    
    setIsLeadFormOpen(false);
  };

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-light mb-8 text-center text-gray-800">Your Luxury Real Estate Expert</h2>
      
      <Card className="bg-white shadow-lg border-gray-200 p-8 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Agent Photo */}
          <div className="relative">
            <div className="w-48 h-48 mx-auto md:w-full md:h-64 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-1">
              <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop" 
                  alt="Michael Sterling" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Agent Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-light mb-2 text-gray-800">Michael Sterling</h3>
              <p className="text-orange-600 font-medium mb-4">Luxury Real Estate Specialist</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline" className="border-orange-400/30 text-orange-600 bg-orange-50">
                  <Check size={12} className="mr-1" /> Top 1% Agent
                </Badge>
                <Badge variant="outline" className="border-blue-400/30 text-blue-600 bg-blue-50">
                  <Check size={12} className="mr-1" /> 15+ Years Experience
                </Badge>
                <Badge variant="outline" className="border-green-400/30 text-green-600 bg-green-50">
                  <Check size={12} className="mr-1" /> Beverly Hills Expert
                </Badge>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Specializing in luxury properties in Beverly Hills and the greater Los Angeles area. 
                With over $500M in sales and a track record of exceptional client service, 
                I'm committed to making your real estate dreams a reality.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">$500M+</div>
                <p className="text-sm text-gray-500">Sales Volume</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">150+</div>
                <p className="text-sm text-gray-500">Homes Sold</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">4.9★</div>
                <p className="text-sm text-gray-500">Client Rating</p>
              </div>
            </div>

            {/* Contact & Social Media */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <a href="mailto:michael.sterling@luxuryrealty.com" className="flex items-center text-gray-700 hover:text-orange-600">
                  <Mail size={16} className="mr-1" />
                  <span className="text-sm">michael.sterling@luxuryrealty.com</span>
                </a>
                <a href="tel:3105550123" className="flex items-center text-gray-700 hover:text-orange-600">
                  <Phone size={16} className="mr-1" />
                  <span className="text-sm">(310) 555-0123</span>
                </a>
              </div>
              
              <div className="flex space-x-3">
                <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600">
                  <Instagram size={18} />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Dialog open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                    <User className="mr-2" size={16} />
                    Inquire About This Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white text-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-light text-gray-800">Get Exclusive Access</DialogTitle>
                    <p className="text-gray-600">Fill out the form below and Michael will contact you within 1 hour with detailed information about this luxury property.</p>
                  </DialogHeader>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name *</label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={leadData.firstName}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name *</label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={leadData.lastName}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={leadData.email}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={leadData.phone}
                          onChange={handleChange}
                          required
                          className="bg-gray-50 border-gray-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="timeframe" className="text-sm font-medium text-gray-700">Buying Timeframe</label>
                        <select
                          id="timeframe"
                          name="timeframe"
                          value={leadData.timeframe}
                          onChange={handleChange}
                          className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Select timeframe</option>
                          <option value="immediately">Immediately</option>
                          <option value="3-months">Within 3 months</option>
                          <option value="6-months">Within 6 months</option>
                          <option value="1-year">Within 1 year</option>
                          <option value="exploring">Just exploring</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="budget" className="text-sm font-medium text-gray-700">Budget Range</label>
                        <select
                          id="budget"
                          name="budget"
                          value={leadData.budget}
                          onChange={handleChange}
                          className="w-full h-10 px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="">Select budget</option>
                          <option value="under-2m">Under $2M</option>
                          <option value="2m-5m">$2M - $5M</option>
                          <option value="5m-10m">$5M - $10M</option>
                          <option value="10m-plus">$10M+</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">Additional Message</label>
                      <Textarea
                        id="message"
                        name="message"
                        value={leadData.message}
                        onChange={handleChange}
                        rows={3}
                        className="bg-gray-50 border-gray-200"
                      />
                    </div>
                    
                    <div className="pt-4">
                      <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                        Submit Inquiry
                      </Button>
                      <p className="text-xs text-gray-500 text-center mt-2">
                        By submitting, you agree to receive communications about this property.
                      </p>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" className="border-gray-300 hover:bg-gray-100 text-gray-700">
                <Phone className="mr-2" size={16} />
                Call (310) 555-0123
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};
