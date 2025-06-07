
import { supabase } from '@/integrations/supabase/client';

export interface AppointmentData {
  propertyId: string;
  sessionId?: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  appointmentDate: string;
  appointmentTime: string;
  showingType: 'in-person' | 'virtual';
  notes?: string;
}

export const appointmentService = {
  async createAppointment(data: AppointmentData) {
    try {
      console.log('Creating appointment:', data);
      
      const { data: appointment, error } = await supabase
        .from('appointments')
        .insert({
          property_id: data.propertyId,
          session_id: data.sessionId,
          contact_name: data.contactName,
          contact_phone: data.contactPhone,
          contact_email: data.contactEmail,
          appointment_date: data.appointmentDate,
          appointment_time: data.appointmentTime,
          showing_type: data.showingType,
          notes: data.notes
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email and schedule reminders
      await this.sendConfirmationEmail(appointment.id);
      await this.scheduleReminders(appointment.id);

      return appointment;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  async sendConfirmationEmail(appointmentId: string) {
    try {
      const { error } = await supabase.functions.invoke('send-appointment-email', {
        body: { appointmentId, type: 'confirmation' }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error sending confirmation email:', error);
    }
  },

  async scheduleReminders(appointmentId: string) {
    try {
      const { error } = await supabase.functions.invoke('schedule-reminders', {
        body: { appointmentId }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error scheduling reminders:', error);
    }
  }
};
