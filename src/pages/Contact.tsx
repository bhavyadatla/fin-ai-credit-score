
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted");
    // Handle form submission
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Office Address",
      details: ["123 Innovation Street", "Tech District, Silicon Valley", "CA 94025, United States"],
      color: "text-orange-600"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Available 24/7"],
      color: "text-blue-600"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: ["support@creditai.com", "partnerships@creditai.com", "media@creditai.com"],
      color: "text-green-600"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: Closed"],
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Have questions about CreditAI? We're here to help. Reach out to our team for support, 
              partnerships, or general inquiries about our AI-powered credit scoring platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl hover-lift animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
                      <Input id="firstName" required className="border-gray-300 focus:border-orange-500" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
                      <Input id="lastName" required className="border-gray-300 focus:border-orange-500" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                    <Input id="email" type="email" required className="border-gray-300 focus:border-orange-500" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input id="phone" type="tel" className="border-gray-300 focus:border-orange-500" />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="text-gray-700">Subject</Label>
                    <Input id="subject" required className="border-gray-300 focus:border-orange-500" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-gray-700">Message</Label>
                    <Textarea 
                      id="message" 
                      rows={6} 
                      placeholder="Tell us how we can help you..."
                      required 
                      className="border-gray-300 focus:border-orange-500"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover-lift"
                  >
                    Send Message <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow hover-lift animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`${info.color} mt-1`}>
                        <info.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover-lift animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">How accurate is CreditAI's scoring?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Our AI-powered system achieves 95% accuracy through advanced machine learning 
                    algorithms that analyze over 50 alternative data points.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Is my data secure with CreditAI?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Yes, we use bank-grade encryption and comply with international privacy standards 
                    including GDPR to protect your personal information.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">How long does it take to get my score?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CreditAI provides real-time credit scoring. You can get your credit assessment 
                    instantly, 24/7, through our platform.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">Can I use CreditAI without credit history?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Absolutely! CreditAI is specifically designed for individuals without traditional 
                    credit history, using alternative data sources for assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <Card className="overflow-hidden hover-lift animate-fade-in">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-gray-800">Find Us</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-orange-100 to-blue-100 h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-orange-600 mx-auto mb-4 animate-bounce-custom" />
                    <p className="text-lg font-semibold text-gray-800">Interactive Map Coming Soon</p>
                    <p className="text-gray-600">123 Innovation Street, Silicon Valley, CA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
