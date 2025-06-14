
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
        <div className="flex items-center space-x-6 p-6 bg-gradient-to-r from-orange-100 to-blue-100 rounded-xl border animate-slide-in">
          <Avatar className="h-20 w-20 hover-lift animate-bounce-custom">
            <AvatarImage src={profile?.avatar_url} className="object-cover" />
            <AvatarFallback className="bg-gradient-to-r from-orange-500 to-blue-600 text-white text-xl font-bold">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('welcome')}, {getUserName()}! 
              <Star className="inline-block h-8 w-8 text-yellow-500 ml-2 animate-bounce-custom" />
            </h2>
            <p className="text-gray-600 text-lg">Here's your credit overview and recent activity.</p>
          </div>
        </div>

        {/* Credit Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-blue-600 text-white hover-lift animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-2xl">{t('creditScore')}</CardTitle>
              <CardDescription className="text-orange-100">
                Updated 2 hours ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-6xl font-bold mb-2 animate-bounce-custom">{creditData.score}</div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30 animate-fade-in">
                    {creditData.category}
                  </Badge>
                  <p className="text-orange-100 mt-2">Range: 740-799</p>
                </div>
                <div className="w-32 h-32 relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
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
                      stroke="white"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${(creditData.score / 850) * 251.2} 251.2`}
                      className="animate-fade-in"
                      style={{ animationDelay: '0.5s' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-semibold">{Math.round((creditData.score / 850) * 100)}%</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <CardTitle className="text-gray-800">Credit Factors</CardTitle>
              <CardDescription>What affects your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="animate-slide-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex justify-between text-sm mb-1">
                  <span>Payment History</span>
                  <span className="text-green-600 font-semibold">Excellent</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div className="animate-slide-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Utilization</span>
                  <span className="text-orange-600 font-semibold">Good</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="animate-slide-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Age</span>
                  <span className="text-blue-600 font-semibold">Very Good</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600 animate-bounce-custom" />
                Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">+{creditData.trend} points</div>
              <p className="text-sm text-gray-600">In the last 3 months</p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600 animate-bounce-custom" />
                Credit Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-gray-800">{creditData.accounts}</div>
              <p className="text-sm text-gray-600">Active accounts</p>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Bell className="h-5 w-5 mr-2 text-orange-600 animate-bounce-custom" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2 text-gray-800">{creditData.alerts}</div>
              <p className="text-sm text-gray-600">New notifications</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
