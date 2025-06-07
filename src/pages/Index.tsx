import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { UserMenu } from '@/components/UserMenu';

const Index = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [terms, setTerms] = useState(false);
  const [marketing, setMarketing] = useState('email');
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted', { name, email, message, terms, marketing, date });
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">AI Real Estate Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-orange-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Unlock the Power of AI for Your Real Estate Business
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Revolutionize how you connect with clients and manage properties with our AI-powered
            assistant.
          </p>
          <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Intelligent Lead Generation</CardTitle>
                <CardDescription>
                  Automatically identify and qualify potential leads with AI-driven insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our AI analyzes market trends and customer behavior to find the best leads for
                  your properties.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>24/7 Virtual Assistant</CardTitle>
                <CardDescription>
                  Provide instant support and information to clients around the clock.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Our AI assistant is always available to answer questions, schedule viewings, and
                  more.
                </p>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Automated Property Management</CardTitle>
                <CardDescription>
                  Streamline your property management tasks with AI-powered automation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  From listing creation to tenant screening, our AI helps you manage your
                  properties efficiently.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
                <CardDescription>
                  Get in touch to learn more about our AI real estate solutions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your Message"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label>
                      <Checkbox checked={terms} onCheckedChange={(checked) => setTerms(!!checked)} className="mr-2" />
                      I agree to the terms and conditions
                    </Label>
                  </div>

                  <div>
                    <Label className="block mb-2">
                      How would you like to be contacted?
                    </Label>
                    <RadioGroup defaultValue={marketing} className="flex">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="email" id="email-contact" />
                        <Label htmlFor="email-contact">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="phone" id="phone-contact" />
                        <Label htmlFor="phone-contact">Phone</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Appointment Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="center" side="bottom">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 AI Real Estate Assistant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
