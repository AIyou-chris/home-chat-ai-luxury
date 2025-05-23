
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
        <h2 className="text-3xl md:text-4xl font-light mb-4">Ready to Make This Home Yours?</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Contact our luxury real estate expert to schedule a private tour and discuss this exceptional opportunity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="bg-gradient-to-br from-gray-900 to-black border-gray-800 p-8">
          <h3 className="text-xl font-medium mb-6">Get In Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="bg-gray-800 border-gray-700"
              />
            </div>
            
            <Button type="submit" className="w-full bg-amber-400 hover:bg-amber-500 text-black font-medium">
              Send Message
            </Button>
          </form>
        </Card>

        {/* Property Summary */}
        <div className="space-y-6">
          <Card className="bg-black/50 border-gray-800 p-6">
            <h4 className="text-lg font-medium mb-4">Property Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Address</span>
                <span className="text-right">{property.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Price</span>
                <span className="text-amber-400 font-medium">{property.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bedrooms</span>
                <span>{property.beds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Bathrooms</span>
                <span>{property.baths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Square Feet</span>
                <span>{property.sqft}</span>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card className="bg-gradient-to-br from-amber-400/10 to-amber-600/5 border-amber-400/20 p-6">
            <h4 className="text-lg font-medium mb-4 text-amber-400">Direct Contact</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="font-medium">(310) 555-0123</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">michael.sterling@luxuryrealty.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Office</p>
                <p className="font-medium">Beverly Hills Luxury Realty</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
