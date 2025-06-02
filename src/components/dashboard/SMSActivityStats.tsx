
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, CheckCircle, XCircle, Clock } from 'lucide-react';

export const SMSActivityStats = () => {
  // Demo data for presentation
  const smsData = {
    totalSent: 247,
    delivered: 232,
    responses: 57,
    optOuts: 3,
    deliveryRate: 94,
    responseRate: 23,
    recentMessages: [
      {
        id: 1,
        contact: "Sarah Johnson",
        message: "Hi Sarah! Your viewing for 123 Oak St is confirmed for tomorrow at 2 PM",
        status: "delivered",
        timestamp: "2 hours ago",
        response: "Perfect, see you then!"
      },
      {
        id: 2,
        contact: "Mike Chen",
        message: "New listing alert: Luxury condo in downtown with amazing views",
        status: "delivered",
        timestamp: "4 hours ago",
        response: null
      },
      {
        id: 3,
        contact: "Lisa Anderson",
        message: "Thank you for your interest! Here's the property brochure link",
        status: "delivered",
        timestamp: "6 hours ago",
        response: "Thank you! Looks amazing"
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* SMS Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Messages Sent</p>
              <p className="text-2xl font-bold text-blue-600">{smsData.totalSent}</p>
            </div>
            <Send className="h-8 w-8 text-blue-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Delivery Rate</p>
              <p className="text-2xl font-bold text-green-600">{smsData.deliveryRate}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-purple-600">{smsData.responseRate}%</p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Opt-outs</p>
              <p className="text-2xl font-bold text-red-600">{smsData.optOuts}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Recent SMS Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent SMS Activity</h3>
        <div className="space-y-4">
          {smsData.recentMessages.map((msg) => (
            <div key={msg.id} className="border-l-4 border-blue-200 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{msg.contact}</span>
                  {getStatusIcon(msg.status)}
                  <Badge variant="outline" className="text-xs">
                    {msg.status}
                  </Badge>
                </div>
                <span className="text-sm text-gray-500">{msg.timestamp}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
              {msg.response && (
                <div className="bg-gray-50 p-2 rounded text-sm text-gray-600">
                  <strong>Response:</strong> {msg.response}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
