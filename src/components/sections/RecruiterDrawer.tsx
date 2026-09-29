import React, { useState, useEffect } from 'react';
import type { Profile } from '../../lib/schemas/profile.schema';
import styles from './RecruiterDrawer.module.css';

interface Props {
  profile: Profile;
}

export default function RecruiterDrawer({ profile }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const btn = document.getElementById('open-recruiter-drawer-btn');
    const heroBtn = document.getElementById('hero-recruiter-quick-btn');

    btn?.addEventListener('click', handleOpen);
    heroBtn?.addEventListener('click', handleOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      btn?.removeEventListener('click', handleOpen);
      heroBtn?.removeEventListener('click', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={() => setIsOpen(false)} role="dialog" aria-modal="true" aria-labelledby="drawer-title">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <span className={styles.badge}>Quick Pitch para Reclutadores & Leads</span>
            <h2 id="drawer-title" className={styles.title}>Pablo Lambert · Executive TL;DR</h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.statusBox}>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Disponibilidad:</span>
              <strong className={styles.statusValueSuccess}>{profile.availability}</strong>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Ubicación & Zona Horaria:</span>
              <strong className={styles.statusValue}>{profile.location} ({profile.recruiterSummary.timezone})</strong>
            </div>
            <div className={styles.statusItem}>
              <span className={styles.statusLabel}>Idiomas:</span>
              <strong className={styles.statusValue}>{profile.recruiterSummary.languages.join(' · ')}</strong>
            </div>
          </div>

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>🎯 Roles Ideales & Seniority</h3>
            <div className={styles.tagGrid}>
              {profile.recruiterSummary.idealRoles.map((role, i) => (
                <span key={i} className={styles.rolePill}>
                  {role}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>⚡ Core Tech Stack</h3>
            <div className={styles.tagGrid}>
              {profile.recruiterSummary.primaryStack.map((tech, i) => (
                <span key={i} className={styles.techPill}>
                  {tech}
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h3 className={styles.sectionHeading}>💎 Diferenciadores Clave</h3>
            <ul className={styles.checkList}>
              {profile.recruiterSummary.topSkills.map((skill, i) => (
                <li key={i} className={styles.checkItem}>
                  <span className={styles.checkIcon}>✓</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className={styles.metricsRow}>
            {profile.metrics.map((metric, i) => (
              <div key={i} className={styles.metricCard}>
                <span className={styles.metricNum}>{metric.value}</span>
                <span className={styles.metricText}>{metric.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="CV-Pablo-Lambert-FullStack-AI.pdf"
              className={styles.primaryAction}
            >
              📄 Descargar CV en PDF
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className={styles.secondaryAction}
            >
              {copied ? '✓ ¡Email Copiado!' : '📋 Copiar Email'}
            </button>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghostAction}
            >
              Ver LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
