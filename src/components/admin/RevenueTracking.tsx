
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, CreditCard, Users } from 'lucide-react';

export const RevenueTracking = () => {
  const revenueData = [
    { month: 'Jan', revenue: 89400, recurring: 84200, newCustomers: 5200 },
    { month: 'Feb', revenue: 95600, recurring: 89800, newCustomers: 5800 },
    { month: 'Mar', revenue: 103200, recurring: 96400, newCustomers: 6800 },
    { month: 'Apr', revenue: 112800, recurring: 104600, newCustomers: 8200 },
    { month: 'May', revenue: 121500, recurring: 112300, newCustomers: 9200 },
    { month: 'Jun', revenue: 127450, recurring: 117250, newCustomers: 10200 }
  ];

  const planRevenue = [
    { plan: 'Starter', revenue: 58702, customers: 1198, arpu: 49 },
    { plan: 'Professional', revenue: 113781, customers: 1649, arpu: 69 },
    { plan: 'Enterprise', revenue: 26611, customers: 89, arpu: 299 }
  ];

  const metrics = [
    {
      title: 'Monthly Recurring Revenue',
      value: '$117,250',
      change: '+12.4%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Average Revenue Per User',
      value: '$63.45',
      change: '+8.2%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Payment Success Rate',
      value: '98.7%',
      change: '+0.3%',
      icon: CreditCard,
      color: 'text-purple-600'
    },
    {
      title: 'Revenue Growth Rate',
      value: '18.4%',
      change: '+2.1%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs font-medium ${metric.color}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue breakdown including recurring and new customer revenue</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Area type="monotone" dataKey="recurring" stackId="1" stroke="#10b981" fill="#10b981" />
              <Area type="monotone" dataKey="newCustomers" stackId="1" stroke="#f97316" fill="#f97316" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Plan Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Plan</CardTitle>
            <CardDescription>Revenue distribution across subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={planRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="revenue" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
            <CardDescription>Key financial metrics and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Revenue (June)</span>
                <span className="font-bold text-lg">$127,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Monthly Growth Rate</span>
                <span className="font-bold text-lg text-green-600">+12.4%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Churn Rate</span>
                <span className="font-bold text-lg text-red-600">2.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Lifetime Value</span>
                <span className="font-bold text-lg">$1,847</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Projected Annual Revenue</span>
                  <span className="font-bold text-xl text-blue-600">$1.68M</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
