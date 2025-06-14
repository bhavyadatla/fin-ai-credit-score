
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Globe, Award, Target, Heart } from "lucide-react";

const Impact = () => {
  const impactData = [
    { year: '2020', users: 50000, countries: 5 },
    { year: '2021', users: 150000, countries: 12 },
    { year: '2022', users: 400000, countries: 25 },
    { year: '2023', users: 800000, countries: 40 },
    { year: '2024', users: 1200000, countries: 50 }
  ];

  const demographicData = [
    { name: 'Young Adults (18-30)', value: 35, color: '#f97316' },
    { name: 'Small Business Owners', value: 25, color: '#3b82f6' },
    { name: 'Immigrants', value: 20, color: '#10b981' },
    { name: 'Rural Communities', value: 15, color: '#8b5cf6' },
    { name: 'Others', value: 5, color: '#f59e0b' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50">
      <Navbar />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <TrendingUp className="h-16 w-16 text-orange-600" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Our Impact Metrics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measuring our progress in creating financial inclusion and empowering communities worldwide.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg">
              <CardHeader>
                <Users className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-orange-600">1.2M+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Lives Impacted</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-600">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Countries Served</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg">
              <CardHeader>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-green-600">95%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Success Rate</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg">
              <CardHeader>
                <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-purple-600">$2.5B</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Credit Facilitated</p>
              </CardContent>
            </Card>
          </div>

          {/* Growth Chart */}
          <Card className="mb-16 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">User Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={impactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Demographics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Who We Serve</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={demographicData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {demographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Global Reach Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>North America</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Europe</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Asia Pacific</span>
                    <span>70%</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Latin America</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Africa</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Impact */}
          <Card className="bg-gradient-to-r from-orange-500 to-blue-600 text-white border-0 shadow-lg">
            <CardHeader className="text-center">
              <Heart className="h-16 w-16 mx-auto mb-4" />
              <CardTitle className="text-3xl">Social Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">650K</div>
                  <div className="text-lg">First-time Credit Recipients</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">320K</div>
                  <div className="text-lg">Small Businesses Funded</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">180K</div>
                  <div className="text-lg">Education Loans Facilitated</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Impact;
