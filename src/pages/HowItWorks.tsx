
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Database, Brain, BarChart3, Shield, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection",
      description: "We gather alternative data points from various sources including mobile usage, social media activity, transaction history, and more.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Brain,
      title: "AI Analysis",
      description: "Our advanced machine learning algorithms analyze the data to identify patterns and creditworthiness indicators.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Score Generation",
      description: "A comprehensive credit score is generated in real-time, providing instant assessment of credit risk.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Shield,
      title: "Secure Delivery",
      description: "The credit score and detailed report are securely delivered through our encrypted platform.",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const dataPoints = [
    "Mobile phone usage patterns",
    "Social media activity and connections",
    "Transaction history and spending behavior",
    "Utility payment records",
    "Educational background",
    "Employment history",
    "Geographic location data",
    "Device and technology usage",
    "Online shopping behavior",
    "Peer-to-peer payment patterns"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
              Revolutionary Technology
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              How CreditAI Works
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover how our AI-powered platform creates accurate credit scores using 
              alternative data sources, making financial inclusion accessible to everyone.
            </p>
          </div>

          {/* Process Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-slide-in">The CreditAI Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full hover:shadow-lg transition-shadow hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center animate-bounce-custom`}>
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-500 mb-2">Step {index + 1}</div>
                      <CardTitle className="text-xl text-gray-800">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-center">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < steps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 h-6 w-6 text-gray-400 animate-pulse-slow" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Data Points */}
          <div className="mb-16">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Alternative Data Points We Analyze</h2>
              <p className="text-center text-gray-700 mb-8 max-w-3xl mx-auto">
                Unlike traditional credit scoring that relies solely on credit history, we analyze 
                over 50 different data points to create a comprehensive picture of creditworthiness.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3 animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 animate-fade-in">Our Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover-lift animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-xl text-blue-800">Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Advanced neural networks and ensemble models trained on millions of data points 
                    to predict creditworthiness with 95% accuracy.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-800">Real-time Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">
                    Cloud-based infrastructure that processes credit assessments in real-time, 
                    providing instant results 24/7.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="text-xl text-green-800">Data Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700">
                    Bank-grade encryption and security protocols ensure your data is protected 
                    with full GDPR and privacy compliance.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-12 text-white animate-scale-in">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Your Credit Score?</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the future of credit scoring with our AI-powered platform.
            </p>
            <Link to="/demo">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg hover-lift">
                Try Live Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
