
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

export const SystemAnalytics = () => {
  const conversionData = [
    { month: 'Jan', visitors: 4200, conversions: 756, rate: 18.0 },
    { month: 'Feb', visitors: 4890, conversions: 923, rate: 18.9 },
    { month: 'Mar', visitors: 5234, conversions: 1045, rate: 20.0 },
    { month: 'Apr', visitors: 5678, conversions: 1193, rate: 21.0 },
    { month: 'May', visitors: 6123, conversions: 1347, rate: 22.0 },
    { month: 'Jun', visitors: 6789, conversions: 1534, rate: 22.6 }
  ];

  const planDistribution = [
    { name: 'Starter', value: 1198, color: '#8b5cf6' },
    { name: 'Professional', value: 1649, color: '#f97316' },
    { name: 'Enterprise', value: 89, color: '#06b6d4' }
  ];

  const smsMetrics = [
    { month: 'Jan', sent: 12400, delivered: 12156, rate: 98.0 },
    { month: 'Feb', sent: 14200, delivered: 13982, rate: 98.5 },
    { month: 'Mar', sent: 16800, delivered: 16632, rate: 99.0 },
    { month: 'Apr', sent: 19200, delivered: 19008, rate: 99.0 },
    { month: 'May', sent: 22100, delivered: 21879, rate: 99.0 },
    { month: 'Jun', sent: 25600, delivered: 25344, rate: 99.0 }
  ];

  return (
    <div className="space-y-6">
      {/* Conversion Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trends</CardTitle>
            <CardDescription>Visitor to customer conversion rates over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conversionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#f97316" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
            <CardDescription>Current distribution of subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={planDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {planDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* SMS Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>SMS Performance</CardTitle>
          <CardDescription>SMS delivery rates and volume over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={smsMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sent" fill="#e5e7eb" name="Sent" />
              <Bar dataKey="delivered" fill="#10b981" name="Delivered" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">8:42</div>
            <p className="text-sm text-gray-600">+15% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lead Quality Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">8.7/10</div>
            <p className="text-sm text-gray-600">Based on conversion data</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">94%</div>
            <p className="text-sm text-gray-600">From user surveys</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
