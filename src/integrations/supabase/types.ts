export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      agent_sessions: {
        Row: {
          agent_id: string
          created_at: string
          expires_at: string
          id: string
          session_token: string
        }
        Insert: {
          agent_id: string
          created_at?: string
          expires_at: string
          id?: string
          session_token: string
        }
        Update: {
          agent_id?: string
          created_at?: string
          expires_at?: string
          id?: string
          session_token?: string
        }
        Relationships: [
          {
            foreignKeyName: "agent_sessions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agents: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          contact_email: string | null
          contact_name: string
          contact_phone: string
          created_at: string
          id: string
          notes: string | null
          property_id: string
          session_id: string | null
          showing_type: string
          status: string
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          contact_email?: string | null
          contact_name: string
          contact_phone: string
          created_at?: string
          id?: string
          notes?: string | null
          property_id: string
          session_id?: string | null
          showing_type: string
          status?: string
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          contact_email?: string | null
          contact_name?: string
          contact_phone?: string
          created_at?: string
          id?: string
          notes?: string | null
          property_id?: string
          session_id?: string | null
          showing_type?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      conversations: {
        Row: {
          ai_response: string
          created_at: string
          id: string
          lead_score: number | null
          property_id: string | null
          session_id: string
          user_info: Json | null
          user_message: string
        }
        Insert: {
          ai_response: string
          created_at?: string
          id?: string
          lead_score?: number | null
          property_id?: string | null
          session_id: string
          user_info?: Json | null
          user_message: string
        }
        Update: {
          ai_response?: string
          created_at?: string
          id?: string
          lead_score?: number | null
          property_id?: string | null
          session_id?: string
          user_info?: Json | null
          user_message?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      email_campaigns: {
        Row: {
          agent_id: string | null
          clicked_count: number | null
          created_at: string
          delivered_count: number | null
          email_template: string
          id: string
          name: string
          opened_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          target_audience: Json | null
          total_recipients: number | null
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          clicked_count?: number | null
          created_at?: string
          delivered_count?: number | null
          email_template: string
          id?: string
          name: string
          opened_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          target_audience?: Json | null
          total_recipients?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          clicked_count?: number | null
          created_at?: string
          delivered_count?: number | null
          email_template?: string
          id?: string
          name?: string
          opened_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          target_audience?: Json | null
          total_recipients?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_campaigns_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          contact_info: Json | null
          created_at: string
          id: string
          interest_level: string | null
          notes: string | null
          property_id: string | null
          qualified_status: string | null
          session_id: string
          updated_at: string
        }
        Insert: {
          contact_info?: Json | null
          created_at?: string
          id?: string
          interest_level?: string | null
          notes?: string | null
          property_id?: string | null
          qualified_status?: string | null
          session_id: string
          updated_at?: string
        }
        Update: {
          contact_info?: Json | null
          created_at?: string
          id?: string
          interest_level?: string | null
          notes?: string | null
          property_id?: string | null
          qualified_status?: string | null
          session_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      marketing_lists: {
        Row: {
          agent_id: string | null
          contact_count: number | null
          created_at: string
          criteria: Json | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          contact_count?: number | null
          created_at?: string
          criteria?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          contact_count?: number | null
          created_at?: string
          criteria?: Json | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketing_lists_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          address: string
          agent_id: string | null
          baths: number | null
          beds: number | null
          created_at: string
          description: string | null
          features: string[] | null
          id: string
          images: string[] | null
          listing_url: string | null
          market_data: Json | null
          neighborhood_data: Json | null
          price: string | null
          sqft: string | null
          title: string
          updated_at: string
        }
        Insert: {
          address: string
          agent_id?: string | null
          baths?: number | null
          beds?: number | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          listing_url?: string | null
          market_data?: Json | null
          neighborhood_data?: Json | null
          price?: string | null
          sqft?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          address?: string
          agent_id?: string | null
          baths?: number | null
          beds?: number | null
          created_at?: string
          description?: string | null
          features?: string[] | null
          id?: string
          images?: string[] | null
          listing_url?: string | null
          market_data?: Json | null
          neighborhood_data?: Json | null
          price?: string | null
          sqft?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      property_knowledge_files: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string
          id: string
          property_id: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name: string
          file_size?: number | null
          file_type: string
          file_url: string
          id?: string
          property_id: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string
          id?: string
          property_id?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_knowledge_files_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      realtor_submissions: {
        Row: {
          additional_notes: string | null
          agent_email: string
          agent_id: string | null
          call_logs: string | null
          contact_phone: string | null
          created_at: string
          custom_build_interest: boolean | null
          id: string
          listing_url: string
          preferred_call_time: string | null
          processing_status: string
          social_media_links: Json | null
          updated_at: string
        }
        Insert: {
          additional_notes?: string | null
          agent_email: string
          agent_id?: string | null
          call_logs?: string | null
          contact_phone?: string | null
          created_at?: string
          custom_build_interest?: boolean | null
          id?: string
          listing_url: string
          preferred_call_time?: string | null
          processing_status?: string
          social_media_links?: Json | null
          updated_at?: string
        }
        Update: {
          additional_notes?: string | null
          agent_email?: string
          agent_id?: string | null
          call_logs?: string | null
          contact_phone?: string | null
          created_at?: string
          custom_build_interest?: boolean | null
          id?: string
          listing_url?: string
          preferred_call_time?: string | null
          processing_status?: string
          social_media_links?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "realtor_submissions_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      reminders: {
        Row: {
          appointment_id: string | null
          created_at: string
          id: string
          reminder_type: string
          scheduled_for: string
          sent_at: string | null
          status: string
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string
          id?: string
          reminder_type: string
          scheduled_for: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          appointment_id?: string | null
          created_at?: string
          id?: string
          reminder_type?: string
          scheduled_for?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "reminders_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_campaigns: {
        Row: {
          agent_id: string | null
          created_at: string
          delivered_count: number | null
          description: string | null
          failed_count: number | null
          id: string
          message_template: string
          name: string
          response_count: number | null
          scheduled_at: string | null
          sent_at: string | null
          status: string
          target_audience: Json | null
          total_recipients: number | null
          updated_at: string
        }
        Insert: {
          agent_id?: string | null
          created_at?: string
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          message_template: string
          name: string
          response_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          target_audience?: Json | null
          total_recipients?: number | null
          updated_at?: string
        }
        Update: {
          agent_id?: string | null
          created_at?: string
          delivered_count?: number | null
          description?: string | null
          failed_count?: number | null
          id?: string
          message_template?: string
          name?: string
          response_count?: number | null
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          target_audience?: Json | null
          total_recipients?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_campaigns_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_messages: {
        Row: {
          campaign_id: string | null
          created_at: string
          delivered_at: string | null
          delivery_status: string | null
          error_message: string | null
          id: string
          message_content: string
          recipient_name: string | null
          recipient_phone: string
          response_content: string | null
          response_received_at: string | null
          sent_at: string | null
          status: string
          twilio_sid: string | null
          updated_at: string
        }
        Insert: {
          campaign_id?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          message_content: string
          recipient_name?: string | null
          recipient_phone: string
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string | null
          status?: string
          twilio_sid?: string | null
          updated_at?: string
        }
        Update: {
          campaign_id?: string | null
          created_at?: string
          delivered_at?: string | null
          delivery_status?: string | null
          error_message?: string | null
          id?: string
          message_content?: string
          recipient_name?: string | null
          recipient_phone?: string
          response_content?: string | null
          response_received_at?: string | null
          sent_at?: string | null
          status?: string
          twilio_sid?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sms_messages_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "sms_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      sms_templates: {
        Row: {
          agent_id: string | null
          category: string
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          template_content: string
          updated_at: string
          usage_count: number | null
          variables: Json | null
        }
        Insert: {
          agent_id?: string | null
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          template_content: string
          updated_at?: string
          usage_count?: number | null
          variables?: Json | null
        }
        Update: {
          agent_id?: string | null
          category?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          template_content?: string
          updated_at?: string
          usage_count?: number | null
          variables?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "sms_templates_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
        ]
      }
      submission_documents: {
        Row: {
          created_at: string
          file_name: string
          file_type: string
          file_url: string
          id: string
          submission_id: string | null
          upload_type: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_type: string
          file_url: string
          id?: string
          submission_id?: string | null
          upload_type: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_type?: string
          file_url?: string
          id?: string
          submission_id?: string | null
          upload_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "submission_documents_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "realtor_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
