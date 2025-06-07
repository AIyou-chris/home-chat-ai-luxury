
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Bell, Mail, Settings, TestTube, Activity } from 'lucide-react';

interface NotificationPreferences {
  id?: string;
  email_notifications: boolean;
  lead_notifications: boolean;
  appointment_notifications: boolean;
  qr_scan_notifications: boolean;
  notification_email: string;
}

export const NotificationPreferencesTab = () => {
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_notifications: true,
    lead_notifications: true,
    appointment_notifications: true,
    qr_scan_notifications: true,
    notification_email: ''
  });
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPreferences();
    fetchRecentEvents();
  }, []);

  const fetchPreferences = async () => {
    const { data, error } = await supabase
      .from('notification_preferences')
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error fetching preferences:', error);
    } else if (data) {
      setPreferences(data);
    }
  };

  const fetchRecentEvents = async () => {
    const { data, error } = await supabase
      .from('notification_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Error fetching events:', error);
    } else {
      setEvents(data || []);
    }
  };

  const savePreferences = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notification_preferences')
        .upsert(preferences)
        .select()
        .single();

      if (error) throw error;

      setPreferences(data);
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendTestNotification = async () => {
    if (!preferences.notification_email) {
      toast({
        title: "Email Required",
        description: "Please enter your notification email address first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-notification', {
        body: {
          type: 'test',
          email: preferences.notification_email,
          data: {
            message: 'This is a test notification from your Home Listing AI system'
          }
        }
      });

      if (error) throw error;

      toast({
        title: "Test Notification Sent",
        description: `Test email sent to ${preferences.notification_email}`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || 'Failed to send test notification',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const eventStats = {
    totalEvents: events.length,
    leadEvents: events.filter(e => e.event_type === 'lead').length,
    appointmentEvents: events.filter(e => e.event_type === 'appointment').length,
    qrScanEvents: events.filter(e => e.event_type === 'qr_scan').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Notifications</p>
                <p className="text-2xl font-bold">{eventStats.totalEvents}</p>
              </div>
              <Bell className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lead Alerts</p>
                <p className="text-2xl font-bold text-green-600">{eventStats.leadEvents}</p>
              </div>
              <Mail className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Appointments</p>
                <p className="text-2xl font-bold text-purple-600">{eventStats.appointmentEvents}</p>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">QR Scans</p>
                <p className="text-2xl font-bold text-orange-600">{eventStats.qrScanEvents}</p>
              </div>
              <TestTube className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="settings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="settings">Notification Settings</TabsTrigger>
          <TabsTrigger value="history">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure when and how you receive notifications about your property activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Notification Email Address</label>
                    <Input
                      type="email"
                      value={preferences.notification_email}
                      onChange={(e) => setPreferences({ ...preferences, notification_email: e.target.value })}
                      placeholder="your-email@example.com"
                      className="max-w-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      All notifications will be sent to this email address
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Enable or disable all email notifications</p>
                    </div>
                    <Switch
                      checked={preferences.email_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, email_notifications: checked })}
                    />
                  </div>
                </div>
              </div>

              {/* Event Type Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Types</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">New Lead Notifications</p>
                      <p className="text-sm text-gray-500">Get notified when someone submits a lead form</p>
                    </div>
                    <Switch
                      checked={preferences.lead_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, lead_notifications: checked })}
                      disabled={!preferences.email_notifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Appointment Notifications</p>
                      <p className="text-sm text-gray-500">Get notified when someone books an appointment</p>
                    </div>
                    <Switch
                      checked={preferences.appointment_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, appointment_notifications: checked })}
                      disabled={!preferences.email_notifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">QR Code Scan Notifications</p>
                      <p className="text-sm text-gray-500">Get notified when someone scans your property QR code</p>
                    </div>
                    <Switch
                      checked={preferences.qr_scan_notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, qr_scan_notifications: checked })}
                      disabled={!preferences.email_notifications}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button onClick={savePreferences} disabled={loading}>
                  <Settings className="h-4 w-4 mr-2" />
                  {loading ? 'Saving...' : 'Save Preferences'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={sendTestNotification}
                  disabled={loading || !preferences.notification_email}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Send Test Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>View your recent notification activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recent notifications</p>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={
                            event.event_type === 'lead' ? 'default' : 
                            event.event_type === 'appointment' ? 'secondary' : 
                            'outline'
                          }>
                            {event.event_type.replace('_', ' ').toUpperCase()}
                          </Badge>
                          {event.notification_sent && (
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Sent
                            </Badge>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {event.event_type === 'lead' && event.event_data?.contact_name && (
                          <p>New lead from {event.event_data.contact_name}</p>
                        )}
                        {event.event_type === 'appointment' && event.event_data?.contact_name && (
                          <p>Appointment booked by {event.event_data.contact_name}</p>
                        )}
                        {event.event_type === 'qr_scan' && (
                          <p>QR code scanned for property listing</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
