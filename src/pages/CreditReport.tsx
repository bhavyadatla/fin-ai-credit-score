
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';

const CreditReport = () => {
  const { user } = useAuth();
  const [creditReport, setCreditReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCreditReport();
    }
  }, [user]);

  const loadCreditReport = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('credit_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error('Error loading credit report:', error);
    } else if (data) {
      setCreditReport(data);
    }
    setLoading(false);
  };

  const getScoreCategory = (score: number) => {
    if (score >= 800) return 'EXCELLENT';
    if (score >= 740) return 'VERY GOOD';
    if (score >= 670) return 'GOOD';
    if (score >= 580) return 'FAIR';
    return 'POOR';
  };

  // Map score category to orange-tinted badge classes/text
  const getScoreBadgeClass = (score: number) => {
    if (score >= 800) return 'bg-orange-500 text-white';
    if (score >= 740) return 'border-orange-400 text-orange-700';
    if (score >= 670) return 'border-orange-300 text-orange-500';
    if (score >= 580) return 'border-orange-200 text-orange-400';
    return 'bg-orange-200 text-orange-500';
  };

  const getScoreColor = (score: number) => {
    // Only use orange scale for numbers
    if (score >= 800) return 'text-orange-700';
    if (score >= 740) return 'text-orange-600';
    if (score >= 670) return 'text-orange-500';
    if (score >= 580) return 'text-orange-400';
    return 'text-orange-300';
  };

  // Helper for icon colors (all orange theme)
  const iconClass = "h-4 w-4 text-orange-500";
  const scoreIconClass = "h-4 w-4 text-orange-400";

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!creditReport) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-orange-600">Credit Report</h1>
          <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-orange-400 mb-4">No credit report available</p>
                <p className="text-sm text-orange-200">Your credit report will appear here once generated</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-orange-600">Credit Report</h1>
          <p className="text-orange-400">Detailed analysis of your credit profile</p>
        </div>

        {/* Credit Score Overview */}
        <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
          <CardHeader>
            <CardTitle className="text-orange-600">Credit Score Overview</CardTitle>
            <CardDescription className="text-orange-400">
              Report generated on{' '}
              <span className="text-orange-500 font-semibold">{new Date(creditReport.report_date).toLocaleDateString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-5xl font-extrabold mb-2 ${getScoreColor(creditReport.score)}`}>
                  {creditReport.score}
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full border font-semibold text-xs uppercase ${getScoreBadgeClass(creditReport.score)}`}
                  style={{
                    borderWidth: 1,
                  }}
                >
                  {getScoreCategory(creditReport.score)}
                </span>
                <p className="text-orange-300 mt-2 text-sm">Range: 300-850</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-400">Your score is better than</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round((creditReport.score / 850) * 100)}%
                </p>
                <p className="text-sm text-orange-400">of consumers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-600">Payment History</CardTitle>
              <CardDescription className="text-orange-400">35% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700">On-time payments</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600 font-semibold">Excellent</span>
                    <TrendingUp className={iconClass} />
                  </div>
                </div>
                <Progress value={95} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
                <p className="text-sm text-orange-400">
                  You have made 95% of your payments on time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-600">Credit Utilization</CardTitle>
              <CardDescription className="text-orange-400">30% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700">Credit usage</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-500 font-semibold">Good</span>
                    <Minus className={iconClass} />
                  </div>
                </div>
                <Progress value={25} className="h-2 bg-orange-100 [&>div]:bg-orange-400" />
                <p className="text-sm text-orange-400">
                  You're using 25% of your available credit
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-600">Credit History Length</CardTitle>
              <CardDescription className="text-orange-400">15% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700">Average account age</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-600 font-semibold">Very Good</span>
                    <TrendingUp className={iconClass} />
                  </div>
                </div>
                <Progress value={80} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
                <p className="text-sm text-orange-400">
                  Your accounts average 8 years old
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-600">Credit Mix</CardTitle>
              <CardDescription className="text-orange-400">10% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-orange-700">Account variety</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-orange-500 font-semibold">Good</span>
                    <TrendingUp className={iconClass} />
                  </div>
                </div>
                <Progress value={70} className="h-2 bg-orange-100 [&>div]:bg-orange-400" />
                <p className="text-sm text-orange-400">
                  You have a good mix of credit types
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreditReport;

