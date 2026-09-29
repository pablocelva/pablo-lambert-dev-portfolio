import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactSection from '../../src/components/sections/ContactSection';

describe('ContactSection Component', () => {
  it('renders contact section form fields correctly', () => {
    render(
      <ContactSection
        email="pablo.lambert.dev@gmail.com"
        linkedin="https://linkedin.com/in/pablolambert-dev"
        github="https://github.com/pablolambert-dev"
      />
    );

    expect(screen.getByLabelText(/Tu Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tu Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Motivo de Contacto/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
  });

  it('validates fields and shows error on empty required fields submit', async () => {
    render(
      <ContactSection
        email="pablo.lambert.dev@gmail.com"
        linkedin="https://linkedin.com/in/pablolambert-dev"
        github="https://github.com/pablolambert-dev"
      />
    );

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/mínimo 2 caracteres/i)).toBeInTheDocument();
  });

  it('submits form successfully when valid', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: '¡Tu mensaje ha sido enviado exitosamente!' })
    });

    render(
      <ContactSection
        email="pablo.lambert.dev@gmail.com"
        linkedin="https://linkedin.com/in/pablolambert-dev"
        github="https://github.com/pablolambert-dev"
      />
    );

    const nameInput = screen.getByLabelText(/Tu Nombre/i);
    const emailInput = screen.getByLabelText(/Tu Correo Electrónico/i);
    const companyInput = screen.getByLabelText(/Empresa/i);
    const subjectInput = screen.getByLabelText(/Asunto/i);
    const messageInput = screen.getByLabelText(/Mensaje o Detalles/i);

    fireEvent.change(nameInput, { target: { value: 'Laura Recruiter' } });
    fireEvent.change(emailInput, { target: { value: 'laura@techhire.com' } });
    fireEvent.change(companyInput, { target: { value: 'TechHire Labs' } });
    fireEvent.change(subjectInput, { target: { value: 'Lead Software Engineer Role' } });
    fireEvent.change(messageInput, { target: { value: 'Hola Pablo, revisamos tu perfil y queremos agendar una llamada.' } });

    const submitBtn = screen.getByRole('button', { name: /Enviar Mensaje/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/¡Tu mensaje ha sido enviado exitosamente!/i)).toBeInTheDocument();
    });
  });

  it('handles server validation/rejection response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: 'Rechazo del servidor' })
    });

    render(
      <ContactSection
        email="pablo.lambert.dev@gmail.com"
        linkedin="https://linkedin.com/in/pablolambert-dev"
        github="https://github.com/pablolambert-dev"
      />
    );

    fireEvent.change(screen.getByLabelText(/Tu Nombre/i), { target: { value: 'Carlos Dev' } });
    fireEvent.change(screen.getByLabelText(/Tu Correo Electrónico/i), { target: { value: 'carlos@dev.com' } });
    fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Propuesta de Consultoría' } });
    fireEvent.change(screen.getByLabelText(/Mensaje o Detalles/i), { target: { value: 'Mensaje con mas de quince caracteres para prueba.' } });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText('Rechazo del servidor')).toBeInTheDocument();
    });
  });

  it('handles network fetch exception', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    render(
      <ContactSection
        email="pablo.lambert.dev@gmail.com"
        linkedin="https://linkedin.com/in/pablolambert-dev"
        github="https://github.com/pablolambert-dev"
      />
    );

    fireEvent.change(screen.getByLabelText(/Tu Nombre/i), { target: { value: 'Carlos Dev' } });
    fireEvent.change(screen.getByLabelText(/Tu Correo Electrónico/i), { target: { value: 'carlos@dev.com' } });
    fireEvent.change(screen.getByLabelText(/Asunto/i), { target: { value: 'Propuesta de Consultoría' } });
    fireEvent.change(screen.getByLabelText(/Mensaje o Detalles/i), { target: { value: 'Mensaje con mas de quince caracteres para prueba.' } });

    fireEvent.click(screen.getByRole('button', { name: /Enviar Mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error de conexión con el servidor/i)).toBeInTheDocument();
    });
  });
});
