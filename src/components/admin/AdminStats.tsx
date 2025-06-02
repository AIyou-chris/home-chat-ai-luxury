
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, MessageSquare, TrendingUp, Smartphone, Calendar } from 'lucide-react';

export const AdminStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$127,450',
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Active Agents',
      value: '2,847',
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Conversations',
      value: '89,432',
      change: '+45.3%',
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'SMS Messages Sent',
      value: '34,891',
      change: '+67.8%',
      icon: Smartphone,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Appointments Booked',
      value: '12,456',
      change: '+34.2%',
      icon: Calendar,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    },
    {
      title: 'Conversion Rate',
      value: '18.4%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 font-medium">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activity and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">New agent signup: sarah.miller@realty.com</span>
                <span className="text-xs text-gray-400">2 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">SMS campaign sent to 1,247 agents</span>
                <span className="text-xs text-gray-400">15 min ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">High conversion rate alert: 24.5%</span>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Performance and uptime metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Response Time</span>
                <span className="text-sm font-medium text-green-600">89ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="text-sm font-medium text-green-600">99.98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">SMS Delivery Rate</span>
                <span className="text-sm font-medium text-green-600">99.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Conversations</span>
                <span className="text-sm font-medium text-blue-600">1,234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
