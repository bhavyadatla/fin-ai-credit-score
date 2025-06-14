
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Users, Target, Globe, Smartphone, Building, TrendingUp, ArrowRight } from "lucide-react";

const TargetUsers = () => {
  const targetGroups = [
    {
      icon: Users,
      title: "Unbanked Population",
      description: "Individuals without access to traditional banking services",
      stats: "1.7 billion people globally",
      color: "from-orange-500 to-orange-600",
      challenges: [
        "No traditional credit history",
        "Limited access to financial institutions",
        "Lack of required documentation",
        "Geographic barriers"
      ]
    },
    {
      icon: Target,
      title: "Underbanked Communities",
      description: "People with limited access to financial products and services",
      stats: "2.5 billion people worldwide",
      color: "from-blue-500 to-blue-600",
      challenges: [
        "Thin credit files",
        "High-cost financial services",
        "Limited product options",
        "Discriminatory lending practices"
      ]
    },
    {
      icon: Globe,
      title: "Emerging Market Populations",
      description: "Growing economies with developing financial infrastructure",
      stats: "85% of global population",
      color: "from-green-500 to-green-600",
      challenges: [
        "Inadequate financial infrastructure",
        "Currency volatility",
        "Regulatory limitations",
        "Technology adoption gaps"
      ]
    }
  ];

  const useCases = [
    {
      icon: Smartphone,
      title: "Mobile-First Users",
      description: "Individuals who primarily use mobile devices for financial transactions"
    },
    {
      icon: Building,
      title: "Small Business Owners",
      description: "Entrepreneurs needing credit for business growth and operations"
    },
    {
      icon: TrendingUp,
      title: "Young Professionals",
      description: "Recent graduates and early-career individuals building credit history"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200">
              Empowering Financial Inclusion
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Who We Serve
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              CreditAI is designed for underserved populations worldwide who need access to fair, 
              accurate credit scoring despite limited traditional credit history.
            </p>
          </div>

          {/* Target Groups */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Primary Target Groups</h2>
            <div className="space-y-8">
              {targetGroups.map((group, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="flex flex-col lg:flex-row">
                    <div className={`lg:w-1/3 bg-gradient-to-r ${group.color} p-8 text-white`}>
                      <group.icon className="h-16 w-16 mb-4" />
                      <h3 className="text-2xl font-bold mb-2">{group.title}</h3>
                      <p className="text-lg opacity-90 mb-4">{group.description}</p>
                      <Badge className="bg-white/20 text-white hover:bg-white/30">
                        {group.stats}
                      </Badge>
                    </div>
                    <div className="lg:w-2/3 p-8">
                      <h4 className="text-xl font-semibold mb-4 text-gray-800">Key Challenges</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.challenges.map((challenge, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                            <span className="text-gray-700">{challenge}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Use Cases */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Specific Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <useCase.icon className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{useCase.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Global Impact Opportunity</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">4.2B</div>
                <div className="text-gray-600">People Underserved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">$5T</div>
                <div className="text-gray-600">Credit Gap Globally</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-600 mb-2">60%</div>
                <div className="text-gray-600">Of World's Adults</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-gray-600">Countries Affected</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-orange-500 to-blue-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Are You Part of Our Target Audience?</h2>
            <p className="text-xl mb-8 opacity-90">
              Discover how CreditAI can help you access the financial opportunities you deserve.
            </p>
            <Link to="/demo">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Try Our Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TargetUsers;
