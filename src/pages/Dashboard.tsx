
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, CreditCard, Bell, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [creditData, setCreditData] = useState({
    score: 742,
    category: "VERY GOOD",
    trend: 23,
    accounts: 5,
    alerts: 2
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
      loadCreditData();
    }
  }, [user]);

  const loadProfileData = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data) {
      setProfile(data);
    }
  };

  const loadCreditData = async () => {
    if (!user) return;

    const { data: creditReport } = await supabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (creditReport) {
      setCreditData(prev => ({
        ...prev,
        score: creditReport.score
      }));
    }
  };

  const getUserName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`.toUpperCase();
    }
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Welcome Section with User Profile */}
        <div className="flex items-center space-x-6 p-6 rounded-xl border bg-gradient-to-r from-orange-50 to-blue-50 border-gray-200">
          <Avatar className="h-20 w-20">
            <AvatarImage src={profile?.avatar_url} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-blue-600 text-white text-xl font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              {t('welcome')}, {getUserName()}!
              <Star className="inline-block h-8 w-8 text-yellow-400 ml-2" />
            </h2>
            <p className="text-gray-500 text-lg">Here's your credit overview and recent activity.</p>
          </div>
        </div>

        {/* Credit Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score */}
          <Card className="lg:col-span-2 p-0 overflow-hidden shadow-md" style={{
            background: "linear-gradient(105deg, #EA580C 0%, #2563EB 100%)",
            color: "#fff",
            border: 'none'
          }}>
            <CardHeader className="p-6 pb-3">
              <CardTitle className="text-white text-2xl">{t('creditScore')}</CardTitle>
              <CardDescription className="text-orange-100">
                Updated 2 hours ago
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-3">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex-1 mb-6 lg:mb-0">
                  <div className="text-6xl font-bold mb-2">{creditData.score}</div>
                  <Badge className="bg-white/20 text-white font-bold px-4 py-2 rounded-lg">
                    {creditData.category}
                  </Badge>
                  <p className="text-orange-100 mt-2">Range: 740-799</p>
                </div>
                {/* Circular Progress */}
                <div className="relative flex items-center justify-center w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="rgba(255,255,255,0.3)"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#fff"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(creditData.score / 850) * 251.2} 251.2`}
                      style={{ transition: "stroke-dasharray 0.6s" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-semibold">{Math.round((creditData.score / 850) * 100)}%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credit Factors */}
          <Card className="bg-white shadow-md border border-gray-200">
            <CardHeader>
              <CardTitle className="text-orange-900">Credit Factors</CardTitle>
              <CardDescription>What affects your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Payment History</span>
                  <span className="text-green-600 font-semibold">Excellent</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-3 rounded-full bg-orange-500" style={{ width: "95%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Utilization</span>
                  <span className="text-orange-600 font-semibold">Good</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-3 rounded-full bg-orange-500" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Age</span>
                  <span className="text-blue-600 font-semibold">Very Good</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div className="h-3 rounded-full bg-orange-500" style={{ width: "85%" }} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Score Trend */}
          <Card className="shadow-md border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">
                +{creditData.trend} points
              </div>
              <span className="text-sm text-gray-600">In the last 3 months</span>
            </CardContent>
          </Card>
          {/* Credit Accounts */}
          <Card className="shadow-md border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Credit Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 mb-2">{creditData.accounts}</div>
              <span className="text-sm text-gray-600">Active accounts</span>
            </CardContent>
          </Card>
          {/* Alerts */}
          <Card className="shadow-md border border-gray-200 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Bell className="h-5 w-5 mr-2 text-orange-500" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500 mb-2">{creditData.alerts}</div>
              <span className="text-sm text-gray-600">New notifications</span>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

