export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          tagline: string;
          description: string;
          category: 'fullstack' | 'ai-ml' | 'data-science' | 'ux-ui';
          tags: string[];
          featured: boolean;
          metrics: Json;
          tech_stack: string[];
          architecture_notes: string | null;
          github_url: string | null;
          demo_url: string | null;
          case_study_url: string | null;
          image: string;
          order_index: number;
          published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'created_at' | 'updated_at'> & {
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      experiences: {
        Row: {
          id: string;
          role: string;
          company: string;
          company_url: string | null;
          location: string;
          period: string;
          type: 'full-time' | 'lead' | 'contract' | 'consulting';
          current: boolean;
          description: string;
          achievements: string[];
          tech: string[];
          order_index: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['experiences']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['experiences']['Insert']>;
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string;
          credential_url: string | null;
          badge_url: string | null;
          category: 'fullstack' | 'ai-ml' | 'data-science' | 'cloud-devops' | 'ux-design';
          skills: string[];
          order_index: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['certifications']['Row'], 'created_at'> & {
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['certifications']['Insert']>;
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          role_type: string;
          subject: string;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contact_messages']['Row'], 'id' | 'read' | 'created_at'> & {
          id?: string;
          read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contact_messages']['Insert']>;
      };
    };
  };
}
