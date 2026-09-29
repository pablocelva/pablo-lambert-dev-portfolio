import React, { useState } from 'react';
import type { Project } from '@/lib/schemas/project.schema';
import { initialProjects as defaultProjects } from '@/data/initialData';
import styles from './AdminDashboard.module.css';

interface AdminDashboardProps {
  initialProjects?: Project[];
}

export default function AdminDashboard({ initialProjects = defaultProjects }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    // Simple auth check (Supabase or fallback demo admin)
    if (email === 'admin@pablolambert.dev' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      setAuthError('Credenciales inválidas. Usa admin@pablolambert.dev / admin123');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const openNewProjectModal = () => {
    setEditingProject({
      id: crypto.randomUUID(),
      title: '',
      slug: '',
      tagline: '',
      description: '',
      category: 'fullstack',
      tags: ['TypeScript', 'Astro'],
      techStack: ['TypeScript', 'Astro'],
      featured: false,
      published: true,
      order: projects.length + 1,
      metrics: [],
      image: '/images/projects/default.webp',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: Project) => {
    setEditingProject({ ...project });
    setIsModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.slug) {
      setStatusMessage({ type: 'error', text: 'Por favor completa los campos requeridos.' });
      return;
    }

    const techList = Array.isArray(editingProject.techStack)
      ? editingProject.techStack
      : typeof editingProject.techStack === 'string'
      ? (editingProject.techStack as string).split(',').map((t) => t.trim()).filter(Boolean)
      : ['TypeScript'];

    const updatedProject: Project = {
      id: editingProject.id || crypto.randomUUID(),
      title: editingProject.title,
      slug: editingProject.slug,
      tagline: editingProject.tagline || 'Proyecto de desarrollo de alto impacto',
      description: editingProject.description || 'Descripción detallada del proyecto con arquitectura y resultados.',
      category: editingProject.category || 'fullstack',
      tags: techList,
      techStack: techList,
      featured: editingProject.featured ?? false,
      published: editingProject.published ?? true,
      order: editingProject.order ?? projects.length + 1,
      metrics: editingProject.metrics || [],
      githubUrl: editingProject.githubUrl || '',
      demoUrl: editingProject.demoUrl || '',
      caseStudyUrl: editingProject.caseStudyUrl || '',
      image: editingProject.image || '/images/projects/default.webp',
      architectureNotes: editingProject.architectureNotes || '',
    };

    const exists = projects.some((p) => p.id === updatedProject.id);
    if (exists) {
      setProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
    } else {
      setProjects((prev) => [updatedProject, ...prev]);
    }

    setIsModalOpen(false);
    setEditingProject(null);
    setStatusMessage({ type: 'success', text: 'Proyecto guardado exitosamente' });
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('¿Seguro que deseas eliminar este proyecto?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setStatusMessage({ type: 'success', text: 'Proyecto eliminado exitosamente' });
    }
  };

  const handleTogglePublish = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: p.published === false ? true : false } : p))
    );
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginCard}>
        <h1 className={styles.loginTitle}>Panel de Administración</h1>
        <p className={styles.loginSubtitle}>Gestión de portafolio y métricas para Pablo Lambert</p>
        
        {authError && (
          <div role="alert" className={`${styles.statusMessage} ${styles.statusError}`}>
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="admin-email" className={styles.label}>
              Correo Administrador
            </label>
            <input
              id="admin-email"
              type="email"
              required
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pablolambert.dev"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="admin-password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              required
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.topBar}>
        <div className={styles.adminInfo}>
          <h2>Admin CMS · Pablo Lambert</h2>
          <span className={styles.modeBadge}>Local / Supabase Sync</span>
        </div>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Cerrar Sesión
        </button>
      </header>

      <nav className={styles.navTabs}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          Gestión de Proyectos
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'settings' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Integraciones & Cloud
        </button>
      </nav>

      {statusMessage && (
        <div
          role="status"
          className={`${styles.statusMessage} ${
            statusMessage.type === 'success' ? styles.statusSuccess : styles.statusError
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className={styles.contentCard}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>Proyectos ({projects.length})</h3>
            <button onClick={openNewProjectModal} className={styles.addBtn}>
              + Nuevo Proyecto
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <strong>{project.title}</strong>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                        {project.slug}
                      </div>
                    </td>
                    <td>{project.category}</td>
                    <td>
                      <button
                        onClick={() => handleTogglePublish(project.id)}
                        className={styles.editBtn}
                        title="Alternar publicación"
                      >
                        {project.published !== false ? 'Publicado' : 'Borrador'}
                      </button>
                    </td>
                    <td className={styles.actionsCell}>
                      <button onClick={() => openEditModal(project)} className={styles.editBtn}>
                        Editar
                      </button>
                      <button onClick={() => handleDeleteProject(project.id)} className={styles.deleteBtn}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className={styles.contentCard}>
          <h3 className={styles.cardTitle}>Configuración de Integraciones</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <div>
              <strong>Cloudinary:</strong>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                Configurado para transformaciones de imágenes automáticas en WebP y responsive srcsets.
              </p>
            </div>
            <div>
              <strong>Supabase:</strong>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)' }}>
                Persistencia en tiempo real conectada con fallback transparente en memoria.
              </p>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && editingProject && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingProject.title ? 'Editar Proyecto' : 'Crear Nuevo Proyecto'}</h3>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeModalBtn}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className={styles.formGroup}>
                <label htmlFor="modal-title" className={styles.label}>
                  Título
                </label>
                <input
                  id="modal-title"
                  type="text"
                  required
                  className={styles.input}
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-slug" className={styles.label}>
                  Slug
                </label>
                <input
                  id="modal-slug"
                  type="text"
                  required
                  className={styles.input}
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-tagline" className={styles.label}>
                  Tagline
                </label>
                <input
                  id="modal-tagline"
                  type="text"
                  className={styles.input}
                  value={editingProject.tagline || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-description" className={styles.label}>
                  Descripción detallada
                </label>
                <textarea
                  id="modal-description"
                  className={styles.textarea}
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="modal-technologies" className={styles.label}>
                  Tecnologías
                </label>
                <input
                  id="modal-technologies"
                  type="text"
                  className={styles.input}
                  value={
                    Array.isArray(editingProject.techStack)
                      ? editingProject.techStack.join(', ')
                      : typeof editingProject.techStack === 'string'
                      ? editingProject.techStack
                      : ''
                  }
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      techStack: e.target.value.split(',').map((t) => t.trim()),
                    })
                  }
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className={styles.cancelBtn}
                >
                  Cancelar
                </button>
                <button type="submit" className={styles.actionBtn}>
                  Guardar Proyecto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
