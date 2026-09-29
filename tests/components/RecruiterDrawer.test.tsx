import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RecruiterDrawer from '../../src/components/sections/RecruiterDrawer';
import { initialProfile } from '../../src/data/initialData';

describe('RecruiterDrawer Component', () => {
  beforeEach(() => {
    // Mock navigator.clipboard
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockImplementation(() => Promise.resolve())
      }
    });
  });

  it('does not render modal by default until triggered', () => {
    render(<RecruiterDrawer profile={initialProfile} />);
    expect(screen.queryByText('Pablo Lambert · Executive TL;DR')).toBeNull();
  });

  it('opens drawer when trigger button event is fired and copies email', async () => {
    const trigger = document.createElement('button');
    trigger.id = 'open-recruiter-drawer-btn';
    document.body.appendChild(trigger);

    render(<RecruiterDrawer profile={initialProfile} />);

    act(() => {
      trigger.click();
    });

    expect(screen.getByText('Pablo Lambert · Executive TL;DR')).toBeInTheDocument();
    expect(screen.getByText('⚡ Core Tech Stack')).toBeInTheDocument();

    // Test copy email
    const copyBtn = screen.getByText(/Copiar Email/i);
    fireEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(initialProfile.email);
    expect(screen.getByText(/¡Email Copiado!/i)).toBeInTheDocument();

    // Close button
    const closeBtn = screen.getByLabelText('Cerrar modal');
    fireEvent.click(closeBtn);
    expect(screen.queryByText('Pablo Lambert · Executive TL;DR')).toBeNull();

    document.body.removeChild(trigger);
  });

  it('opens drawer when hero recruiter button is clicked', () => {
    const heroBtn = document.createElement('button');
    heroBtn.id = 'hero-recruiter-quick-btn';
    document.body.appendChild(heroBtn);

    render(<RecruiterDrawer profile={initialProfile} />);

    act(() => {
      heroBtn.click();
    });

    expect(screen.getByText('Pablo Lambert · Executive TL;DR')).toBeInTheDocument();

    // Test backdrop click closes modal
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(screen.queryByText('Pablo Lambert · Executive TL;DR')).toBeNull();

    document.body.removeChild(heroBtn);
  });

  it('closes on Escape key press', () => {
    const trigger = document.createElement('button');
    trigger.id = 'open-recruiter-drawer-btn';
    document.body.appendChild(trigger);

    render(<RecruiterDrawer profile={initialProfile} />);

    act(() => {
      trigger.click();
    });

    expect(screen.getByText('Pablo Lambert · Executive TL;DR')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(screen.queryByText('Pablo Lambert · Executive TL;DR')).toBeNull();
    document.body.removeChild(trigger);
  });
});
