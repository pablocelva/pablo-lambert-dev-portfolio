import React, { useState, useMemo } from 'react';
import type { Project, ProjectCategory } from '../../lib/schemas/project.schema';
import { formatCategoryLabel } from '../../lib/utils/formatters';
import styles from './ProjectsGallery.module.css';

interface Props {
  initialProjects: Project[];
}

type FilterOption = 'all' | ProjectCategory;

export default function ProjectsGallery({ initialProjects }: Props) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filterButtons: Array<{ id: FilterOption; label: string; count: number }> = useMemo(() => {
    const counts = {
      all: initialProjects.length,
      fullstack: initialProjects.filter((p) => p.category === 'fullstack').length,
      'ai-ml': initialProjects.filter((p) => p.category === 'ai-ml').length,
      'data-science': initialProjects.filter((p) => p.category === 'data-science').length,
      'ux-ui': initialProjects.filter((p) => p.category === 'ux-ui').length
    };

    return [
      { id: 'all' as const, label: 'Todos los Proyectos', count: counts.all },
      { id: 'fullstack' as const, label: 'Full Stack', count: counts.fullstack },
      { id: 'ai-ml' as const, label: 'IA & LLMs (RAG)', count: counts['ai-ml'] },
      { id: 'data-science' as const, label: 'Data Science & Analytics', count: counts['data-science'] },
      { id: 'ux-ui' as const, label: 'UX / UI Engineering', count: counts['ux-ui'] }
    ];
  }, [initialProjects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return initialProjects;
    return initialProjects.filter((p) => p.category === activeFilter);
  }, [initialProjects, activeFilter]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.filtersWrapper} role="tablist" aria-label="Filtrar proyectos por categoría">
        {filterButtons.map((btn) => (
          <button
            key={btn.id}
            type="button"
            role="tab"
            aria-selected={activeFilter === btn.id}
            className={`${styles.filterBtn} ${activeFilter === btn.id ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveFilter(btn.id)}
          >
            <span>{btn.label}</span>
            <span className={styles.countBadge}>{btn.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredProjects.map((project) => (
          <article key={project.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={project.image}
                alt={project.title}
                className={styles.image}
                loading="lazy"
                width="600"
                height="340"
              />
              <div className={styles.imageOverlay}>
                <span className={`${styles.categoryBadge} ${styles[`cat_${project.category}`]}`}>
                  {formatCategoryLabel(project.category)}
                </span>
                {project.featured && <span className={styles.featuredBadge}>⭐ Destacado</span>}
              </div>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.tagline}>{project.tagline}</p>
              <p className={styles.description}>{project.description}</p>

              {project.metrics && project.metrics.length > 0 && (
                <div className={styles.metricsRow}>
                  {project.metrics.map((m, i) => (
                    <div key={i} className={styles.metricPill}>
                      <span className={styles.metricVal}>{m.value}</span>
                      <span className={styles.metricLbl}>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className={styles.techList}>
                {project.techStack.map((tech, i) => (
                  <span key={i} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              {project.architectureNotes && (
                <div className={styles.archNotes}>
                  <strong className={styles.archLabel}>Arquitectura:</strong>
                  <p className={styles.archText}>{project.architectureNotes}</p>
                </div>
              )}

              <div className={styles.cardFooter}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.demoLink}
                  >
                    <span>Ver Demo Live</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                    aria-label={`Código fuente de ${project.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Código Repo</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
