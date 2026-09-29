import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsGallery from '../../src/components/sections/ProjectsGallery';
import { initialProjects } from '../../src/data/initialData';

describe('ProjectsGallery Component', () => {
  it('renders all projects initially', () => {
    render(<ProjectsGallery initialProjects={initialProjects} />);

    expect(screen.getByText('Todos los Proyectos')).toBeInTheDocument();
    expect(screen.getByText('NexusAI · Autonomous Agent & RAG Platform')).toBeInTheDocument();
  });

  it('filters by category when button is clicked', () => {
    render(<ProjectsGallery initialProjects={initialProjects} />);

    const aiFilterBtn = screen.getByText('IA & LLMs (RAG)');
    fireEvent.click(aiFilterBtn);

    expect(screen.getByText('NexusAI · Autonomous Agent & RAG Platform')).toBeInTheDocument();
  });
});
