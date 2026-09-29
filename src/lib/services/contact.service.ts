import { getSupabaseServerClient, isSupabaseServerConfigured } from '../supabase/server';
import { ContactMessageSchema, type ContactMessage } from '../schemas/contact.schema';

export interface SavedContactResult {
  success: boolean;
  id: string;
  message: string;
}

let memoryMessages: Array<ContactMessage & { id: string; createdAt: string }> = [];

export class ContactService {
  static async submitMessage(payload: unknown): Promise<SavedContactResult> {
    const validated = ContactMessageSchema.parse(payload);

    // Spam honeypot check
    if (validated.website_hp && validated.website_hp.length > 0) {
      return {
        success: true,
        id: 'hp-discarded',
        message: 'Mensaje procesado correctamente.'
      };
    }

    const id = `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const createdAt = new Date().toISOString();

    const supabase = getSupabaseServerClient();
    if (supabase) {
      try {
        const { error } = await supabase.from('contact_messages').insert({
          id,
          name: validated.name,
          email: validated.email,
          company: validated.company || null,
          role_type: validated.roleType,
          subject: validated.subject,
          message: validated.message,
          read: false,
          created_at: createdAt
        });

        if (error) {
          console.error('[ContactService] Error saving message to Supabase:', error.message);
        }
      } catch (err) {
        console.error('[ContactService] Exception saving message:', err);
      }
    }

    memoryMessages.push({ ...validated, id, createdAt });

    return {
      success: true,
      id,
      message: '¡Gracias por tu mensaje! Me pondré en contacto contigo a la brevedad.'
    };
  }

  static getStoredMessages() {
    return [...memoryMessages];
  }

  static clearMessages() {
    memoryMessages = [];
  }
}
