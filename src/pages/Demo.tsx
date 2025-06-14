
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle, Phone, Mail, MapPin, User } from "lucide-react";

const Demo = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    income: "",
    employment: ""
  });
  const [creditScore, setCreditScore] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const generateScore = () => {
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      const score = Math.floor(Math.random() * (800 - 600) + 600);
      setCreditScore(score);
      setLoading(false);
      setStep(4);
    }, 3000);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 740) return { category: "VERY GOOD", color: "text-green-600" };
    if (score >= 670) return { category: "GOOD", color: "text-blue-600" };
    if (score >= 580) return { category: "FAIR", color: "text-orange-600" };
    return { category: "POOR", color: "text-red-600" };
  };

  const scoreInfo = getScoreCategory(creditScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Live Credit Score Demo
            </h1>
            <p className="text-xl text-gray-600">
              Experience our AI-powered credit scoring in action
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {step} of 4</span>
              <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <Progress value={(step / 4) * 100} className="h-2" />
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-6 w-6 mr-2 text-orange-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  disabled={!formData.name || !formData.email}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Financial Information */}
          {step === 2 && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-600" />
                  Financial Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="income">Monthly Income</Label>
                    <Input
                      id="income"
                      placeholder="Enter monthly income"
                      value={formData.income}
                      onChange={(e) => handleInputChange("income", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="employment">Employment Status</Label>
                    <Input
                      id="employment"
                      placeholder="e.g., Employed, Self-employed, Student"
                      value={formData.employment}
                      onChange={(e) => handleInputChange("employment", e.target.value)}
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleNext} 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  disabled={!formData.income || !formData.employment}
                >
                  Continue
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Consent & Privacy */}
          {step === 3 && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Data Consent & Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">What data will we analyze?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Basic demographic information</li>
                    <li>• Simulated alternative data points</li>
                    <li>• No actual financial data will be collected</li>
                    <li>• This is a demonstration only</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center text-green-800">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-semibold">Your privacy is protected</span>
                  </div>
                  <p className="text-sm text-green-700 mt-2">
                    This demo uses simulated data and does not store any personal information.
                  </p>
                </div>
                <Button 
                  onClick={generateScore} 
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  Generate My Credit Score
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Processing/Results */}
          {step === 4 && (
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle>Your Credit Assessment</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                {loading ? (
                  <div className="py-12">
                    <Loader2 className="h-16 w-16 animate-spin mx-auto text-orange-600 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Analyzing Your Data...</h3>
                    <p className="text-gray-600">Our AI is processing over 50 data points</p>
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="mb-8">
                      <div className="text-6xl font-bold text-gray-900 mb-2">{creditScore}</div>
                      <Badge className={`${scoreInfo.color} bg-transparent border-current text-lg px-4 py-2`}>
                        {scoreInfo.category}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Payment Prediction</h4>
                        <div className="text-2xl font-bold text-orange-600">95%</div>
                        <p className="text-sm text-orange-700">Likely to pay on time</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Risk Level</h4>
                        <div className="text-2xl font-bold text-blue-600">Low</div>
                        <p className="text-sm text-blue-700">Based on AI analysis</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Confidence</h4>
                        <div className="text-2xl font-bold text-green-600">92%</div>
                        <p className="text-sm text-green-700">Model accuracy</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg text-left">
                      <h4 className="font-semibold mb-4">What influenced your score:</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Strong employment history pattern</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span>Consistent digital engagement</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                          <span>Stable location history</span>
                        </div>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-orange-600 mr-2" />
                          <span>Positive alternative data signals</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-4">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700">
                        Get Full Credit Report
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
                        Try Another Demo
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
