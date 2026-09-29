import { describe, it, expect, beforeEach } from 'vitest';
import { ContactService } from '../../src/lib/services/contact.service';

describe('ContactService', () => {
  beforeEach(() => {
    ContactService.clearMessages();
  });

  it('successfully accepts and saves valid contact message', async () => {
    const payload = {
      name: 'Tech Recruiter Lead',
      email: 'recruiter@faang.com',
      company: 'Tech Giants Inc.',
      roleType: 'recruiter_fulltime',
      subject: 'Senior Full Stack & AI Role Open',
      message: 'Hello Pablo, we saw your portfolio and would love to speak with you regarding our new Staff Engineer opening.',
      website_hp: ''
    };

    const result = await ContactService.submitMessage(payload);
    expect(result.success).toBe(true);
    expect(result.id).toContain('msg_');

    const stored = ContactService.getStoredMessages();
    expect(stored.length).toBe(1);
    expect(stored[0].email).toBe('recruiter@faang.com');
  });

  it('silently discards spam when honeypot website_hp is filled', async () => {
    const spamPayload = {
      name: 'Spam Bot',
      email: 'bot@spam.com',
      roleType: 'other',
      subject: 'Buy Crypto Now Fast',
      message: 'Spam message with more than fifteen characters here for test.',
      website_hp: 'http://spam-link.com'
    };

    const result = await ContactService.submitMessage(spamPayload);
    expect(result.success).toBe(true);
    expect(result.id).toBe('hp-discarded');

    const stored = ContactService.getStoredMessages();
    expect(stored.length).toBe(0);
  });

  it('throws ZodError on invalid email or short message', async () => {
    const invalidPayload = {
      name: 'A',
      email: 'not-an-email',
      subject: 'Hi',
      message: 'short'
    };

    await expect(ContactService.submitMessage(invalidPayload)).rejects.toThrow();
  });
});
