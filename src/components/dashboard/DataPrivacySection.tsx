
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Download, Lock, Eye, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const DataPrivacySection = () => {
  const { toast } = useToast();

  const handleDownloadLeads = () => {
    // Simulate CSV download
    const csvContent = `Name,Email,Phone,Property Interest,Date,Status
Sarah Johnson,sarah@email.com,(555) 123-4567,123 Oak Street,2024-06-01,Qualified
Mike Chen,mike@email.com,(555) 234-5678,456 Pine Avenue,2024-06-02,Contacted
Lisa Anderson,lisa@email.com,(555) 345-6789,789 Maple Drive,2024-06-02,New Lead`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leads_export.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Your leads have been downloaded as a CSV file.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Security & Privacy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="h-6 w-6 text-green-600" />
            <span className="font-semibold text-green-800">Bank-Level Security</span>
          </div>
          <p className="text-sm text-green-700">Your data is protected with 256-bit encryption</p>
        </Card>

        <Card className="p-4 border-blue-200 bg-blue-50">
          <div className="flex items-center space-x-3 mb-2">
            <Lock className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-blue-800">SOC 2 Compliant</span>
          </div>
          <p className="text-sm text-blue-700">Certified secure data handling practices</p>
        </Card>

        <Card className="p-4 border-purple-200 bg-purple-50">
          <div className="flex items-center space-x-3 mb-2">
            <Eye className="h-6 w-6 text-purple-600" />
            <span className="font-semibold text-purple-800">Zero Data Sharing</span>
          </div>
          <p className="text-sm text-purple-700">We never sell or share your client data</p>
        </Card>
      </div>

      {/* Data Export & Management */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Download className="h-6 w-6 text-gray-700" />
          <h3 className="text-lg font-semibold">Your Data, Your Control</h3>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Export All Your Leads</h4>
            <p className="text-sm text-gray-600 mb-3">
              Download all your leads data in CSV format. Includes contact information, 
              property interests, engagement history, and notes.
            </p>
            <Button onClick={handleDownloadLeads} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Download All Leads
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Data Privacy Commitment</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Your client data stays exclusively yours</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="h-4 w-4 text-blue-500" />
                <span>Encrypted storage and transmission</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <span>No third-party data sharing or sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-orange-500" />
                <span>GDPR & CCPA compliant data handling</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Secure Login Information */}
      <Card className="p-6 border-blue-200 bg-blue-50">
        <div className="flex items-center space-x-3 mb-3">
          <Lock className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-blue-800">Secure Agent Access</h3>
        </div>
        <div className="text-sm text-blue-700 space-y-2">
          <p>• Each agent dashboard requires secure authentication</p>
          <p>• Multi-factor authentication available for enhanced security</p>
          <p>• Session timeout and secure logout functionality</p>
          <p>• All access attempts are logged and monitored</p>
        </div>
      </Card>
    </div>
  );
};
