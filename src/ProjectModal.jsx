import { useEffect, useCallback } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
    // Close on Escape key
    const handleKey = useCallback(
        (e) => { if (e.key === 'Escape') onClose(); },
        [onClose]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [handleKey]);

    if (!project) return null;

    return (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal-panel" onClick={(e) => e.stopPropagation()}>

                {/* ── Close button ── */}
                <button className="modal-close" onClick={onClose} aria-label="Close preview" id="modal-close-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                {/* ── Browser mockup preview ── */}
                <div className="modal-browser">
                    <div className="modal-browser__bar">
                        <div className="modal-browser__dots">
                            <span /><span /><span />
                        </div>
                        <div className="modal-browser__url">
                            {project.link || project.github || 'github.com/vkwizz'}
                        </div>
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="modal-browser__open" id={`modal-open-${project.id}`}>
                                Open ↗
                            </a>
                        )}
                    </div>

                    <div className="modal-browser__screen">
                        {project.preview ? (
                            <img
                                src={project.preview}
                                alt={`${project.name} screenshot`}
                                className="modal-browser__screenshot"
                            />
                        ) : (
                            <div className="modal-browser__no-preview">
                                <div className="modal-browser__no-preview-icon">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1.5">
                                        <rect x="2" y="3" width="20" height="14" rx="2" />
                                        <path d="M8 21h8M12 17v4" />
                                    </svg>
                                </div>
                                <p>Preview not available</p>
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                                        className="modal-browser__gh-link">
                                        View on GitHub ↗
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Project Details ── */}
                <div className="modal-details">
                    <div className="modal-details__left">
                        <div className="modal-meta">
                            <span className="modal-tag">{project.tag}</span>
                            <span className="modal-period">{project.period}</span>
                        </div>
                        <h2 className="modal-title">{project.name}</h2>
                        <p className="modal-desc">{project.description}</p>
                    </div>

                    <div className="modal-details__right">
                        {/* Tech Stack */}
                        <div className="modal-stack">
                            <span className="modal-stack__label">Stack</span>
                            <div className="modal-stack__chips">
                                {project.stack?.map((s) => (
                                    <span key={s} className="modal-stack__chip">{s}</span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="modal-links">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noopener noreferrer"
                                    className="modal-link modal-link--primary" id={`modal-visit-${project.id}`}>
                                    Visit Site ↗
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    className="modal-link modal-link--ghost" id={`modal-github-${project.id}`}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
