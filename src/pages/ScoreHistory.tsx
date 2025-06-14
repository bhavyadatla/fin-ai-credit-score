
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import DashboardLayout from '@/components/DashboardLayout';

const ScoreHistory = () => {
  const { user } = useAuth();
  const [scoreHistory, setScoreHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadScoreHistory();
    }
  }, [user]);

  const loadScoreHistory = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('score_history')
      .select('*')
      .eq('user_id', user.id)
      .order('score_date', { ascending: true });

    if (error) {
      console.error('Error loading score history:', error);
    } else if (data) {
      setScoreHistory(data);
    }
    setLoading(false);
  };

  const getScoreTrend = () => {
    if (scoreHistory.length < 2) return { trend: 'stable', change: 0 };
    
    const latest = scoreHistory[scoreHistory.length - 1];
    const previous = scoreHistory[scoreHistory.length - 2];
    const change = latest.score - previous.score;
    
    return {
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      change: Math.abs(change)
    };
  };

  const formatChartData = () => {
    return scoreHistory.map(item => ({
      date: new Date(item.score_date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      score: item.score,
      change: item.change_amount
    }));
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

  const { trend, change } = getScoreTrend();
  const currentScore = scoreHistory.length > 0 ? scoreHistory[scoreHistory.length - 1].score : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Score History</h1>
          <p className="text-gray-600">Track your credit score changes over time</p>
        </div>

        {/* Current Score and Trend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 mb-2">{currentScore}</div>
              <p className="text-sm text-gray-600">
                Updated {scoreHistory.length > 0 ? new Date(scoreHistory[scoreHistory.length - 1].score_date).toLocaleDateString() : 'Never'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                ) : trend === 'down' ? (
                  <TrendingDown className="h-5 w-5 mr-2 text-red-600" />
                ) : (
                  <Calendar className="h-5 w-5 mr-2 text-gray-600" />
                )}
                Recent Change
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-2 ${
                trend === 'up' ? 'text-green-600' : 
                trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{change}
              </div>
              <p className="text-sm text-gray-600">
                {trend === 'up' ? 'Points gained' : 
                 trend === 'down' ? 'Points lost' : 
                 'No change'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">{scoreHistory.length}</div>
              <p className="text-sm text-gray-600">Score updates recorded</p>
            </CardContent>
          </Card>
        </div>

        {/* Score Chart */}
        {scoreHistory.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Score Trend</CardTitle>
              <CardDescription>Your credit score changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} />
                    <Tooltip 
                      formatter={(value: any) => [value, 'Credit Score']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#ea580c" 
                      strokeWidth={3}
                      dot={{ fill: '#ea580c', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-500 mb-4">No score history available</p>
                <p className="text-sm text-gray-400">Your score history will appear here as it's tracked over time</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ScoreHistory;
