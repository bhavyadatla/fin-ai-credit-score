
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Heart, TrendingUp } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Rodriguez",
      location: "Mexico City, Mexico",
      role: "Small Business Owner",
      rating: 5,
      image: "/placeholder.svg",
      story: "As an immigrant with no credit history in the US, I couldn't get a loan to expand my bakery. CreditAI analyzed my mobile payments and utility bills, giving me a 720 credit score. I got approved for a $25,000 business loan and now employ 8 people!",
      impact: "Grew business from 2 to 8 employees"
    },
    {
      name: "James Okafor",
      location: "Lagos, Nigeria",
      role: "University Student",
      rating: 5,
      image: "/placeholder.svg",
      story: "I needed funds for my final year engineering project. Traditional banks wouldn't even look at my application. CreditAI used my academic records and mobile money transactions to give me a score of 680. I got my education loan approved within 24 hours!",
      impact: "Secured education funding in 24 hours"
    },
    {
      name: "Priya Sharma",
      location: "Mumbai, India",
      role: "Freelance Designer",
      rating: 5,
      image: "/placeholder.svg",
      story: "Working as a freelancer, I had irregular income and no traditional employment history. CreditAI analyzed my digital portfolio, client reviews, and payment patterns to give me a 750 score. I finally got approved for a home loan!",
      impact: "Purchased first home with AI-powered score"
    },
    {
      name: "Ahmed Hassan",
      location: "Cairo, Egypt",
      role: "Tech Entrepreneur",
      rating: 5,
      image: "/placeholder.svg",
      story: "Starting a tech company in Egypt was challenging without access to credit. CreditAI looked at my coding contributions, online presence, and digital transactions. With a 710 score, I secured startup funding and now we're serving 10,000+ users!",
      impact: "Launched successful tech startup"
    },
    {
      name: "Sarah Chen",
      location: "Manila, Philippines",
      role: "Healthcare Worker",
      rating: 5,
      image: "/placeholder.svg",
      story: "After working abroad for years, I returned home with no local credit history. CreditAI used my remittance patterns and international work history to generate a 695 score. I got approved for a car loan to serve rural communities better.",
      impact: "Improved healthcare access in rural areas"
    },
    {
      name: "Carlos Mendoza",
      location: "São Paulo, Brazil",
      role: "Delivery Driver",
      rating: 5,
      image: "/placeholder.svg",
      story: "As a gig economy worker, banks saw me as too risky. CreditAI analyzed my delivery app ratings, consistent earnings, and payment history. My 660 score helped me get a motorcycle loan to expand my delivery business.",
      impact: "Expanded delivery business operations"
    }
  ];

  const stats = [
    { label: "Average Score Improvement", value: "125 points" },
    { label: "Loan Approval Rate", value: "89%" },
    { label: "Time to Credit Decision", value: "< 24 hours" },
    { label: "Customer Satisfaction", value: "4.9/5 stars" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Success Stories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who transformed their financial lives through AI-powered credit scoring.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-orange-600 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{testimonial.location}</p>
                      <div className="flex items-center space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Quote className="h-8 w-8 text-orange-200 absolute -top-2 -left-2" />
                    <p className="text-gray-700 italic mb-4 pl-6">
                      "{testimonial.story}"
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Impact: {testimonial.impact}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-orange-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Ready to Write Your Success Story?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Join thousands of people who have transformed their financial lives with AI-powered credit scoring.
              </p>
              <a
                href="/demo"
                className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                Get Your Credit Score Now
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Testimonials;
