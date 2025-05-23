
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  property: any;
}

export const ContactSection = ({ property }: ContactSectionProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${property.title} at ${property.address}. Please contact me to schedule a viewing.`
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "Michael will contact you within 24 hours to schedule your private tour.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: `I'm interested in ${property.title} at ${property.address}. Please contact me to schedule a viewing.`
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-800">Ready to Make This Home Yours?</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Contact our luxury real estate expert to schedule a private tour and discuss this exceptional opportunity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="bg-white border-gray-200 shadow-md p-8">
          <h3 className="text-xl font-medium mb-6 text-gray-800">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-50 border-gray-200"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-50 border-gray-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="text-gray-700">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-gray-50 border-gray-200"
              />
            </div>
            
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Property Summary */}
        <div className="space-y-6">
          <Card className="bg-gray-50 border-gray-200 shadow-sm p-6">
            <h4 className="text-lg font-medium mb-4 text-gray-800">Property Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Address</span>
                <span className="text-right text-gray-800">{property.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Price</span>
                <span className="text-amber-600 font-medium">{property.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bedrooms</span>
                <span className="text-gray-800">{property.beds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Bathrooms</span>
                <span className="text-gray-800">{property.baths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Square Feet</span>
                <span className="text-gray-800">{property.sqft}</span>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 p-6 shadow-sm">
            <h4 className="text-lg font-medium mb-4 text-amber-700">Direct Contact</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800">(310) 555-0123</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800">michael.sterling@luxuryrealty.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Office</p>
                <p className="font-medium text-gray-800">Beverly Hills Luxury Realty</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
