
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { QrCode, Smartphone, MapPin, TrendingUp, Calendar } from 'lucide-react';

export const QRCodeAnalytics = () => {
  // Demo data for presentation
  const qrData = {
    totalScans: 89,
    thisWeek: 23,
    conversionRate: 31,
    peakHours: "2-4 PM",
    topDevice: "Mobile (78%)",
    recentScans: [
      {
        id: 1,
        location: "Property Sign - 123 Oak Street",
        device: "iPhone",
        timestamp: "3 hours ago",
        converted: true,
        action: "Scheduled viewing"
      },
      {
        id: 2,
        location: "Business Card - Open House",
        device: "Android",
        timestamp: "5 hours ago",
        converted: false,
        action: "Viewed listing"
      },
      {
        id: 3,
        location: "Flyer - Coffee Shop",
        device: "iPhone",
        timestamp: "1 day ago",
        converted: true,
        action: "Downloaded brochure"
      },
      {
        id: 4,
        location: "Website QR Code",
        device: "iPad",
        timestamp: "2 days ago",
        converted: true,
        action: "Left contact info"
      }
    ],
    deviceBreakdown: [
      { device: "Mobile", percentage: 78, scans: 69 },
      { device: "Desktop", percentage: 15, scans: 13 },
      { device: "Tablet", percentage: 7, scans: 7 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* QR Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Scans</p>
              <p className="text-2xl font-bold text-indigo-600">{qrData.totalScans}</p>
            </div>
            <QrCode className="h-8 w-8 text-indigo-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-green-600">{qrData.thisWeek}</p>
            </div>
            <Calendar className="h-8 w-8 text-green-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-orange-600">{qrData.conversionRate}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-500" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Peak Hours</p>
              <p className="text-lg font-bold text-purple-600">{qrData.peakHours}</p>
            </div>
            <Smartphone className="h-8 w-8 text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Device Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Device Usage</h3>
        <div className="space-y-3">
          {qrData.deviceBreakdown.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="h-5 w-5 text-gray-500" />
                <span className="font-medium">{item.device}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{item.percentage}%</span>
                <span className="text-sm text-gray-500">({item.scans} scans)</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent QR Scans */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent QR Code Scans</h3>
        <div className="space-y-4">
          {qrData.recentScans.map((scan) => (
            <div key={scan.id} className="border-l-4 border-indigo-200 pl-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{scan.location}</span>
                  {scan.converted && (
                    <Badge className="bg-green-100 text-green-800">Converted</Badge>
                  )}
                </div>
                <span className="text-sm text-gray-500">{scan.timestamp}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Device: {scan.device}</span>
                <span className="text-gray-700">Action: {scan.action}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
