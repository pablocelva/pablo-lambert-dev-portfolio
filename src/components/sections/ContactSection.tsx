import React, { useState } from 'react';
import { ContactMessageSchema, type ContactRoleType } from '../../lib/schemas/contact.schema';
import styles from './ContactSection.module.css';

interface Props {
  email: string;
  linkedin: string;
  github: string;
}

export default function ContactSection({ email, linkedin, github }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    roleType: 'recruiter_fulltime' as ContactRoleType,
    subject: '',
    message: '',
    website_hp: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const roleOptions: Array<{ id: ContactRoleType; label: string }> = [
    { id: 'recruiter_fulltime', label: 'Propuesta Laboral (Full-Time / Reclutador Tech)' },
    { id: 'ai_consulting', label: 'Consultoría en IA & Sistemas RAG' },
    { id: 'contract_freelance', label: 'Proyecto Contract / Freelance' },
    { id: 'architecture_advisory', label: 'Asesoría en Arquitectura Web / UX' },
    { id: 'other', label: 'Otra consulta profesional' }
  ];

  const validateField = (name: string, value: string) => {
    const testData = { ...formData, [name]: value };
    const result = ContactMessageSchema.safeParse(testData);

    if (!result.success) {
      const fieldError = result.error.issues.find((issue) => issue.path.includes(name));
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError.message }));
        return;
      }
    }

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    const validation = ContactMessageSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        fieldErrors[path] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('¡Tu mensaje ha sido enviado exitosamente! Responderé en menos de 24 horas.');
        setFormData({
          name: '',
          email: '',
          company: '',
          roleType: 'recruiter_fulltime',
          subject: '',
          message: '',
          website_hp: ''
        });
        setErrors({});
      } else {
        setErrorMessage(data.error || 'Hubo un problema enviando el mensaje. Por favor intenta de nuevo.');
      }
    } catch (err) {
      setErrorMessage('Error de conexión con el servidor. Puedes escribirme directamente a ' + email);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.contactSection} id="contacto" aria-label="Sección de contacto">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>Hablemos</span>
          <h2 className={styles.title}>¿Tienes una oportunidad o proyecto en mente?</h2>
          <p className={styles.subtitle}>
            Ya seas un reclutador tech buscando talento clave o una empresa necesitando consultoría especializada en Full Stack e IA, Conversemos.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.infoCard}>
            <h3 className={styles.infoTitle}>Canales Directos</h3>
            <p className={styles.infoText}>
              Responderé a tu consulta técnica o propuesta laboral a la brevedad.
            </p>

            <div className={styles.channelList}>
              <a href={`mailto:${email}`} className={styles.channelItem}>
                <div className={styles.channelIcon}>✉️</div>
                <div className={styles.channelDetails}>
                  <span className={styles.channelLabel}>Correo Electrónico</span>
                  <span className={styles.channelVal}>{email}</span>
                </div>
              </a>

              <a href={linkedin} target="_blank" rel="noopener noreferrer" className={styles.channelItem}>
                <div className={styles.channelIcon}>💼</div>
                <div className={styles.channelDetails}>
                  <span className={styles.channelLabel}>LinkedIn</span>
                  <span className={styles.channelVal}>linkedin.com/in/pablolambert-dev</span>
                </div>
              </a>

              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.channelItem}>
                <div className={styles.channelIcon}>🐙</div>
                <div className={styles.channelDetails}>
                  <span className={styles.channelLabel}>GitHub</span>
                  <span className={styles.channelVal}>github.com/pablolambert-dev</span>
                </div>
              </a>
            </div>

            <div className={styles.availabilityNotice}>
              <span className={styles.pulseActive}></span>
              <div>
                <strong>Zona Horaria:</strong> UTC-3 / Santiago, Chile (Overlap disponible con US EST/PST).
              </div>
            </div>
          </div>

          <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="website_hp"
              value={formData.website_hp}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className={styles.honeypot}
              aria-hidden="true"
            />

            {successMessage && (
              <div className={styles.successAlert} role="alert">
                <span>✓</span>
                <p>{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className={styles.errorAlert} role="alert">
                <span>✕</span>
                <p>{errorMessage}</p>
              </div>
            )}

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.label}>
                  Tu Nombre <span className={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Sofia Morales"
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  required
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.label}>
                  Tu Correo Electrónico <span className={styles.required}>*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="sofia@empresa.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  required
                />
                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
              </div>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-company" className={styles.label}>
                  Empresa u Organización (Opcional)
                </label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ej: TechCorp Inc."
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-role-type" className={styles.label}>
                  Motivo de Contacto <span className={styles.required}>*</span>
                </label>
                <select
                  id="contact-role-type"
                  name="roleType"
                  value={formData.roleType}
                  onChange={handleChange}
                  className={styles.select}
                >
                  {roleOptions.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-subject" className={styles.label}>
                Asunto <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Ej: Oportunidad Senior Full Stack & AI Engineer"
                className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                required
              />
              {errors.subject && <span className={styles.fieldError}>{errors.subject}</span>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="contact-message" className={styles.label}>
                Mensaje o Detalles del Proyecto <span className={styles.required}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Cuéntame sobre la posición, requerimientos técnicos o desafíos de tu proyecto..."
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                required
              />
              {errors.message && <span className={styles.fieldError}>{errors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <span>Enviando mensaje...</span>
              ) : (
                <>
                  <span>Enviar Mensaje</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
