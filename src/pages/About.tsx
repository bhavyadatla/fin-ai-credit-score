import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Globe, Award, Brain, Shield } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              About CreditAI
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              We're on a mission to democratize access to credit and financial services through 
              innovative AI-powered alternative credit scoring solutions.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg hover-lift animate-slide-in">
              <CardHeader>
                <Target className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-2xl text-orange-800">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700">
                  To bridge the credit gap by providing fair, accurate, and inclusive credit scoring 
                  solutions that empower the unbanked and underbanked populations worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg hover-lift animate-slide-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle className="text-2xl text-blue-800">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">
                  A world where everyone has equal access to financial opportunities, regardless of 
                  their traditional credit history or geographic location.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Key Features - cards re-designed */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-orange-800 animate-fade-in">
              Why Choose CreditAI?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* AI-Powered Intelligence */}
              <Card className="text-center border-0 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 bg-gradient-to-br from-orange-50 via-white to-orange-100">
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <span className="inline-flex items-center justify-center rounded-full bg-orange-100 shadow animate-float" style={{ width: 66, height: 66 }}>
                      <Brain className="h-12 w-12 text-orange-600" />
                    </span>
                  </div>
                  <CardTitle className="text-orange-800">AI-Powered Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-700">
                    Advanced machine learning algorithms analyze over 50 alternative data points 
                    to create comprehensive credit profiles.
                  </p>
                </CardContent>
              </Card>

              {/* Bank-Grade Security */}
              <Card className="text-center border-0 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 bg-gradient-to-br from-blue-50 via-white to-blue-100" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <span className="inline-flex items-center justify-center rounded-full bg-blue-100 shadow animate-float" style={{ width: 66, height: 66 }}>
                      <Shield className="h-12 w-12 text-blue-600" />
                    </span>
                  </div>
                  <CardTitle className="text-blue-800">Bank-Grade Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700">
                    Your data is protected with enterprise-level encryption and compliance 
                    with international privacy standards.
                  </p>
                </CardContent>
              </Card>

              {/* Proven Results */}
              <Card className="text-center border-0 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-200 bg-gradient-to-br from-green-50 via-white to-green-100" style={{ animationDelay: "0.4s" }}>
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <span className="inline-flex items-center justify-center rounded-full bg-green-100 shadow animate-float" style={{ width: 66, height: 66 }}>
                      <Award className="h-12 w-12 text-green-600" />
                    </span>
                  </div>
                  <CardTitle className="text-green-800">Proven Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700">
                    95% accuracy rate with continuous improvement through real-time 
                    data analysis and machine learning optimization.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-16 animate-fade-in">
            <h2 className="text-3xl font-bold text-center mb-12 text-orange-800">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="animate-bounce-custom">
                <div className="text-4xl font-bold text-orange-600 mb-2">1M+</div>
                <div className="text-slate-700">Credit Scores Generated</div>
              </div>
              <div className="animate-bounce-custom" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-slate-700">Countries Served</div>
              </div>
              <div className="animate-bounce-custom" style={{ animationDelay: '0.4s' }}>
                <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-slate-700">Accuracy Rate</div>
              </div>
              <div className="animate-bounce-custom" style={{ animationDelay: '0.6s' }}>
                <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
                <div className="text-slate-700">Real-time Processing</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl font-bold mb-8 text-orange-800">Our Team</h2>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto">
              We're a diverse team of data scientists, financial experts, and technology innovators 
              passionate about creating inclusive financial solutions for everyone.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
