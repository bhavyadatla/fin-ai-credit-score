import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, CreditCard, Bell, Star } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import CreditScoreGauge from "@/components/CreditScoreGauge";
import ScorePeriodSelector from "@/components/ScorePeriodSelector";
import { addDays, subMonths, subYears, isWithinInterval } from "date-fns";

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  // More advanced: period selection for the main score and report
  const [selectedPeriod, setSelectedPeriod] = useState<{ period: string, dateRange?: { from?: Date; to?: Date } }>({ period: "3mo" });
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
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
      loadCreditReports();
    }
  }, [user]);

  useEffect(() => {
    // Refetch/compute for selected period
    if (user) {
      loadCreditReports();
    }
  }, [user, selectedPeriod]);

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

  const loadCreditReports = async () => {
    if (!user) return;

    // Filter for the selected period; fallback to "all".
    const { period, dateRange } = selectedPeriod;
    let from: Date | undefined, to: Date | undefined = new Date();
    switch (period) {
      case "7d":
        from = addDays(new Date(), -7);
        break;
      case "1mo":
        from = subMonths(new Date(), 1);
        break;
      case "3mo":
        from = subMonths(new Date(), 3);
        break;
      case "6mo":
        from = subMonths(new Date(), 6);
        break;
      case "1y":
        from = subYears(new Date(), 1);
        break;
      case "2y":
        from = subYears(new Date(), 2);
        break;
      case "3y":
        from = subYears(new Date(), 3);
        break;
      case "custom":
        if (dateRange && dateRange.from && dateRange.to) {
          from = dateRange.from;
          to = dateRange.to;
        }
        break;
      default:
        from = undefined;
        break;
    }

    let query = supabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (from) {
      query = query.gte('report_date', from.toISOString().substring(0, 10));
    }
    if (to) {
      query = query.lte('report_date', to.toISOString().substring(0, 10));
    }

    const { data } = await query;
    setScoreHistory(Array.isArray(data) ? data : []);
    // Update score for gauge (latest in period)
    if (data && data.length > 0) {
      setCreditData(cd => ({
        ...cd,
        score: data[0].score
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

  const periodHeader = () => {
    if (selectedPeriod.period === "custom" && selectedPeriod.dateRange?.from && selectedPeriod.dateRange.to) {
      return `${t("creditScore")} (${selectedPeriod.dateRange.from.toLocaleDateString()} - ${selectedPeriod.dateRange.to.toLocaleDateString()})`;
    }
    const period = PERIOD_OPTIONS.find(p => p.value === selectedPeriod.period);
    return period ? `${t("creditScore")} (${period.label})` : t("creditScore");
  };

  const PERIOD_OPTIONS = [
    { value: "7d", label: "Last 7 days" },
    { value: "1mo", label: "Last 1 month" },
    { value: "3mo", label: "Last 3 months" },
    { value: "6mo", label: "Last 6 months" },
    { value: "1y", label: "Last 1 year" },
    { value: "2y", label: "Last 2 years" },
    { value: "3y", label: "Last 3 years" },
    { value: "custom", label: "Custom Range" },
  ];

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

        {/* Score Gauge + Period Selector */}
        <Card className="p-0 overflow-visible shadow-md mb-6" style={{ background: "linear-gradient(105deg, #EA580C 0%, #2563EB 100%)", color: "#fff", border: 'none' }}>
          <CardHeader className="p-6 pb-2 flex flex-col md:flex-row md:items-end gap-3">
            <div className="flex-1">
              <CardTitle className="text-white text-2xl">{periodHeader()}</CardTitle>
              <CardDescription className="text-orange-100">
                Updated within selected period
              </CardDescription>
            </div>
            <ScorePeriodSelector value={selectedPeriod} onChange={setSelectedPeriod} />
          </CardHeader>
          <CardContent className="p-6 pt-0 flex flex-col items-center">
            <CreditScoreGauge score={creditData.score} />
          </CardContent>
        </Card>

        {/* Legacy section - keep rest of page unchanged */}
        {/* Credit Factors & Add'l Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
