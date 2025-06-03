
import { supabase } from '@/integrations/supabase/client';

interface NotificationData {
  type: 'lead' | 'appointment' | 'qr_scan';
  data: any;
  agentId?: string;
}

export const notificationService = {
  async sendNotification({ type, data, agentId }: NotificationData) {
    try {
      // Get notification preferences
      const { data: preferences } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('agent_id', agentId)
        .maybeSingle();

      // If no preferences found or notifications disabled, return early
      if (!preferences || !preferences.email_notifications || !preferences.notification_email) {
        console.log('Notifications disabled or no email configured');
        return { success: false, reason: 'notifications_disabled' };
      }

      // Check if specific notification type is enabled
      const isTypeEnabled = 
        (type === 'lead' && preferences.lead_notifications) ||
        (type === 'appointment' && preferences.appointment_notifications) ||
        (type === 'qr_scan' && preferences.qr_scan_notifications);

      if (!isTypeEnabled) {
        console.log(`${type} notifications disabled`);
        return { success: false, reason: 'type_disabled' };
      }

      // Send notification via edge function
      const { data: result, error } = await supabase.functions.invoke('send-notification', {
        body: {
          type,
          email: preferences.notification_email,
          data,
          agentId
        }
      });

      if (error) {
        console.error('Error sending notification:', error);
        return { success: false, error: error.message };
      }

      console.log('Notification sent successfully:', result);
      return { success: true, result };
    } catch (error: any) {
      console.error('Notification service error:', error);
      return { success: false, error: error.message };
    }
  },

  async trackQRScan(propertyData: any) {
    // Log QR scan event and send notification
    const notificationData = {
      property_address: propertyData.address,
      property_title: propertyData.title,
      scan_time: new Date().toISOString()
    };

    return this.sendNotification({
      type: 'qr_scan',
      data: notificationData,
      agentId: propertyData.agent_id
    });
  }
};
