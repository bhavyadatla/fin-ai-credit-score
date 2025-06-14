
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

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 740) return 'text-blue-600';
    if (score >= 670) return 'text-yellow-600';
    if (score >= 580) return 'text-orange-600';
    return 'text-red-600';
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Credit Report</h1>
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-500 mb-4">No credit report available</p>
                <p className="text-sm text-gray-400">Your credit report will appear here once generated</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Credit Report</h1>
          <p className="text-gray-600">Detailed analysis of your credit profile</p>
        </div>

        {/* Credit Score Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Credit Score Overview</CardTitle>
            <CardDescription>
              Report generated on {new Date(creditReport.report_date).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-5xl font-bold mb-2 ${getScoreColor(creditReport.score)}`}>
                  {creditReport.score}
                </div>
                <Badge variant="outline" className="mb-2">
                  {getScoreCategory(creditReport.score)}
                </Badge>
                <p className="text-gray-600">Range: 300-850</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Your score is better than</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round((creditReport.score / 850) * 100)}%
                </p>
                <p className="text-sm text-gray-500">of consumers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>35% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>On-time payments</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-semibold">Excellent</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <Progress value={95} className="h-2" />
                <p className="text-sm text-gray-600">
                  You have made 95% of your payments on time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Utilization</CardTitle>
              <CardDescription>30% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Credit usage</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600 font-semibold">Good</span>
                    <Minus className="h-4 w-4 text-yellow-600" />
                  </div>
                </div>
                <Progress value={25} className="h-2" />
                <p className="text-sm text-gray-600">
                  You're using 25% of your available credit
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit History Length</CardTitle>
              <CardDescription>15% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Average account age</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600 font-semibold">Very Good</span>
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <Progress value={80} className="h-2" />
                <p className="text-sm text-gray-600">
                  Your accounts average 8 years old
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Credit Mix</CardTitle>
              <CardDescription>10% of your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Account variety</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-green-600 font-semibold">Good</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-sm text-gray-600">
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
