
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CreditCard, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [creditData, setCreditData] = useState({
    score: 742,
    category: "VERY GOOD",
    trend: 23,
    accounts: 5,
    alerts: 2
  });

  useEffect(() => {
    if (user) {
      loadCreditData();
    }
  }, [user]);

  const loadCreditData = async () => {
    if (!user) return;

    // Load latest credit report
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
    if (user?.user_metadata?.first_name) {
      return user.user_metadata.first_name;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('welcome')}, {getUserName()}!
          </h2>
          <p className="text-gray-600">Here's your credit overview and recent activity.</p>
        </div>

        {/* Credit Score Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="text-white">{t('creditScore')}</CardTitle>
              <CardDescription className="text-orange-100">
                Updated 2 hours ago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-6xl font-bold mb-2">{creditData.score}</div>
                  <Badge className="bg-white/20 text-white hover:bg-white/30">
                    {creditData.category}
                  </Badge>
                  <p className="text-orange-100 mt-2">Range: 740-799</p>
                </div>
                <div className="w-32 h-32 relative">
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

          <Card>
            <CardHeader>
              <CardTitle>Credit Factors</CardTitle>
              <CardDescription>What affects your score</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Payment History</span>
                  <span className="text-green-600">Excellent</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Utilization</span>
                  <span className="text-orange-600">Good</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Credit Age</span>
                  <span className="text-blue-600">Very Good</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Score Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-2">+{creditData.trend} points</div>
              <p className="text-sm text-gray-600">In the last 3 months</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Credit Accounts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{creditData.accounts}</div>
              <p className="text-sm text-gray-600">Active accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2 text-orange-600" />
                Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{creditData.alerts}</div>
              <p className="text-sm text-gray-600">New notifications</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
