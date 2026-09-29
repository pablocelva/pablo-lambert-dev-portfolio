import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminDashboard from '../../src/components/admin/AdminDashboard';
import { initialProjects } from '../../src/data/initialData';

describe('AdminDashboard Component', () => {
  beforeEach(() => {
    window.confirm = vi.fn().mockReturnValue(true);
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, project: initialProjects[0] })
    });
  });

  it('renders login screen by default when not authenticated and shows error on bad password', async () => {
    render(<AdminDashboard initialProjects={initialProjects} />);

    const emailInput = screen.getByLabelText(/Correo Administrador/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'notanemail' } });
    fireEvent.change(passInput, { target: { value: 'wrongpass' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('logs in with test credentials in fallback mode and displays dashboard', async () => {
    render(<AdminDashboard initialProjects={initialProjects} />);

    const emailInput = screen.getByLabelText(/Correo Administrador/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'admin@pablolambert.dev' } });
    fireEvent.change(passInput, { target: { value: 'admin123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Admin CMS · Pablo Lambert/i)).toBeInTheDocument();
      expect(screen.getByText(/Gestión de Proyectos/i)).toBeInTheDocument();
    });

    // Test logout
    const logoutBtn = screen.getByRole('button', { name: /Cerrar Sesión/i });
    fireEvent.click(logoutBtn);
    expect(screen.getByRole('heading', { name: /Panel de Administración/i })).toBeInTheDocument();
  });

  it('switches between projects and settings tabs', async () => {
    render(<AdminDashboard initialProjects={initialProjects} />);

    const emailInput = screen.getByLabelText(/Correo Administrador/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'admin@pablolambert.dev' } });
    fireEvent.change(passInput, { target: { value: 'admin123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/Gestión de Proyectos/i)).toBeInTheDocument();
    });

    const settingsTab = screen.getByText(/Integraciones & Cloud/i);
    fireEvent.click(settingsTab);

    expect(screen.getByText(/Configuración de Integraciones/i)).toBeInTheDocument();
    expect(screen.getByText(/Cloudinary/i)).toBeInTheDocument();
  });

  it('allows opening new project modal, editing fields, and saving', async () => {
    render(<AdminDashboard initialProjects={initialProjects} />);

    const emailInput = screen.getByLabelText(/Correo Administrador/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'admin@pablolambert.dev' } });
    fireEvent.change(passInput, { target: { value: 'admin123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/\+ Nuevo Proyecto/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(/\+ Nuevo Proyecto/i));
    expect(screen.getByText(/Crear Nuevo Proyecto/i)).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/Título/i);
    const slugInput = screen.getByLabelText(/Slug/i);
    const taglineInput = screen.getByLabelText(/Tagline/i);
    const descInput = screen.getByLabelText(/Descripción detallada/i);
    const techInput = screen.getByLabelText(/Tecnologías/i);

    fireEvent.change(titleInput, { target: { value: 'Super AI App' } });
    fireEvent.change(slugInput, { target: { value: 'super-ai-app' } });
    fireEvent.change(taglineInput, { target: { value: 'Super AI Application tagline' } });
    fireEvent.change(descInput, { target: { value: 'Detailed description with sufficient length for project test.' } });
    fireEvent.change(techInput, { target: { value: 'Python, FastAPI, Astro' } });

    const modalForm = titleInput.closest('form')!;
    fireEvent.submit(modalForm);

    await waitFor(() => {
      expect(screen.getByText(/Proyecto guardado exitosamente/i)).toBeInTheDocument();
    });
  });

  it('allows editing an existing project, toggling publish, and deleting', async () => {
    render(<AdminDashboard initialProjects={initialProjects} />);

    const emailInput = screen.getByLabelText(/Correo Administrador/i);
    const passInput = screen.getByLabelText(/Contraseña/i);
    const form = emailInput.closest('form')!;

    fireEvent.change(emailInput, { target: { value: 'admin@pablolambert.dev' } });
    fireEvent.change(passInput, { target: { value: 'admin123' } });
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByText(/Editar/i)[0]).toBeInTheDocument();
    });

    // Edit button
    fireEvent.click(screen.getAllByText(/Editar/i)[0]);
    expect(screen.getByRole('button', { name: /Guardar Proyecto/i })).toBeInTheDocument();

    // Close modal
    fireEvent.click(screen.getByText('✕'));

    // Toggle publish
    const publishBtn = screen.getAllByRole('button', { name: /Publicado/i })[0];
    fireEvent.click(publishBtn);

    // Delete project
    const deleteBtn = screen.getAllByRole('button', { name: /Eliminar/i })[0];
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(screen.getByText(/Proyecto eliminado/i)).toBeInTheDocument();
    });
  });
});
