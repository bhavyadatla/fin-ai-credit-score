
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
          <h1 className="text-3xl font-bold text-orange-600">Score History</h1>
          <p className="text-orange-400">Track your credit score changes over time</p>
        </div>

        {/* Current Score and Trend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white border border-orange-100 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                Current Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600 mb-2">{currentScore}</div>
              <p className="text-sm text-orange-300">
                Updated {scoreHistory.length > 0 ? new Date(scoreHistory[scoreHistory.length - 1].score_date).toLocaleDateString() : 'Never'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-700">
                {trend === 'up' ? (
                  <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                ) : trend === 'down' ? (
                  <TrendingDown className="h-5 w-5 mr-2 text-orange-600" />
                ) : (
                  <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                )}
                Recent Change
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold mb-2 ${
                trend === 'up' ? 'text-orange-500' : 
                trend === 'down' ? 'text-orange-300' : 
                'text-orange-300'
              }`}>
                {trend === 'up' ? '+' : trend === 'down' ? '-' : ''}{change}
              </div>
              <p className="text-sm text-orange-300">
                {trend === 'up' ? 'Points gained' : 
                 trend === 'down' ? 'Points lost' : 
                 'No change'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-100 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-700">Total Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500 mb-2">{scoreHistory.length}</div>
              <p className="text-sm text-orange-300">Score updates recorded</p>
            </CardContent>
          </Card>
        </div>

        {/* Score Chart */}
        {scoreHistory.length > 0 ? (
          <Card className="bg-white border border-orange-100 shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-orange-700">Score Trend</CardTitle>
              <CardDescription className="text-orange-400">Your credit score changes over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={formatChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: "#e56c09" }} />
                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} tick={{ fill: "#e56c09" }} />
                    <Tooltip 
                      contentStyle={{ background: "#fff7ed", borderColor: "#ffedd5", color: "#ea580c" }}
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
          <Card className="bg-white border border-orange-100 shadow-md rounded-xl">
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-orange-400 mb-4">No score history available</p>
                <p className="text-sm text-orange-200">Your score history will appear here as it's tracked over time</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ScoreHistory;
