import { useState } from 'react';
import './Projects.css';
import ProjectModal from './ProjectModal';

// ── Featured (resume-level, shown prominently) ──────────────────────
const featured = [
  {
    id: 'couplespace',
    name: 'Couplespace.in',
    period: '01/2024 – Present',
    tag: 'Live Product',
    description:
      'A relationship-focused social platform with API integrations and responsive UI. Features Cloudinary media handling and optimized routing. Won ₹80,000 in seed funding at college Shark Tank.',
    stack: ['React.js', 'Node.js', 'REST APIs', 'Cloudinary'],
    link: 'https://couplespace.in',
    github: null,
    preview: null, // domain expired
  },
  {
    id: 'chong',
    name: 'Chong — EV Scooter App',
    period: '02/2026',
    tag: '🏆 Hackathon Winner',
    description:
      'Full-stack Hybrid EV Scooter application with MQTT-based server communication, real-time vehicle telematics, remote immobilization, and security geofencing. Won ₹20,000 at ASME MACE Vajra Hackathon.',
    stack: ['JavaScript', 'MQTT', 'React Native', 'Node.js'],
    link: null,
    github: 'https://github.com/vkwizz/Chong',
    preview: null,
  },
  {
    id: 'vk-music',
    name: 'VK — Free Music App',
    period: '12/2025',
    tag: 'Live',
    description:
      'Ad-free music player application. Features a sleek dark UI with email/password auth, optimized for seamless listening without interruptions.',
    stack: ['JavaScript', 'React', 'Vercel'],
    link: 'https://vk-alpha-inky.vercel.app',
    github: 'https://github.com/vkwizz/VK',
    preview: '/preview-vk.png',
  },
  {
    id: 'hideseek',
    name: 'Hide & Seek Web Game',
    period: '10/2025 – 11/2025',
    tag: 'Live',
    description:
      'Tactical browser-based grid game. Players set hider coordinates and compete against a seeker AI using event-driven TypeScript. Features optimized DOM manipulation and randomized gameplay.',
    stack: ['TypeScript', 'HTML', 'CSS'],
    link: 'https://vkwizz.github.io/HIDE-SEEK',
    github: 'https://github.com/vkwizz/HIDE-SEEK',
    preview: '/preview-hideseek.png',
  },
];

// ── GitHub Repos (from vkwizz, shown in compact grid) ───────────────
const githubRepos = [
  {
    id: 'snakefit',
    name: 'SnakeFit',
    lang: 'JavaScript',
    desc: 'Gamified fitness tracker combining Snake Game with real-world data — steps, calories, hydration goals become in-game events.',
    github: 'https://github.com/vkwizz/snakefit',
  },
  {
    id: 'petzz',
    name: 'Petzz',
    lang: 'JavaScript',
    desc: 'Pet adoption site with browsable listings and responsive card grid UI.',
    github: 'https://github.com/vkwizz/Petzz',
  },
  {
    id: 'codescape',
    name: 'Codescape Website',
    lang: 'HTML',
    desc: 'Website for Codescape — a coding community platform built with pure HTML & CSS.',
    github: 'https://github.com/vkwizz/codescape-website',
  },
  {
    id: 'bdaywish',
    name: 'Birthday Wish',
    lang: 'CSS',
    desc: 'A delightful animated birthday wish experience with polaroid photos and floating hearts, deployed on GitHub Pages.',
    github: 'https://github.com/vkwizz/bdaywish',
    live: 'https://vkwizz.github.io/bdaywish',
    preview: '/preview-bdaywish.png',
  },
  {
    id: 'threads',
    name: 'Threads Clone',
    lang: null,
    desc: 'A Threads social app clone exploring feed design and social UX patterns.',
    github: 'https://github.com/vkwizz/threads',
  },
];

const langColor = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#264de4',
};

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);

  return (
    <section id="work" className="projects-section">
      <div className="projects-inner">
        <div className="projects-header">
          <span className="projects-eyebrow">Selected Work</span>
          <h2 className="projects-heading">Projects</h2>
          <div className="projects-rule" />
        </div>

        {/* ── Featured cards ── */}
        <div className="projects-grid">
          {featured.map((p, i) => (
            <article key={p.id} className="project-card" style={{ '--i': i }}>
              <div className="project-card__top">
                <span className="project-card__tag">{p.tag}</span>
                <span className="project-card__period">{p.period}</span>
              </div>

              <h3 className="project-card__name">{p.name}</h3>
              <p className="project-card__desc">{p.description}</p>

              <div className="project-card__stack">
                {p.stack.map((s) => (
                  <span key={s} className="project-card__chip">{s}</span>
                ))}
              </div>

              <div className="project-card__actions">
                {/* Preview button — opens modal */}
                <button
                  className="project-card__preview-btn"
                  id={`preview-${p.id}`}
                  onClick={() => setActiveProject(p)}
                >
                  <span className="project-card__preview-icon">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>
                  Preview
                </button>

                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer"
                    className="project-card__link project-card__link--gh" id={`gh-${p.id}`}>
                    GitHub ↗
                  </a>
                )}
              </div>

              <div className="project-card__number">0{i + 1}</div>
            </article>
          ))}
        </div>

        {/* ── GitHub repos strip ── */}
        <div className="gh-strip-header">
          <span className="gh-strip-eyebrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            More from GitHub · vkwizz
          </span>
        </div>

        <div className="gh-grid">
          {githubRepos.map((r) => (
            <div key={r.id} className="gh-card-wrap">
              <a href={r.github} target="_blank" rel="noopener noreferrer"
                className="gh-card" id={`gh-card-${r.id}`}>
                <div className="gh-card__top">
                  <span className="gh-card__name">{r.name}</span>
                  {r.lang && (
                    <span className="gh-card__lang">
                      <span className="gh-card__lang-dot"
                        style={{ background: langColor[r.lang] ?? '#888' }} />
                      {r.lang}
                    </span>
                  )}
                </div>
                <p className="gh-card__desc">{r.desc}</p>
                <div className="gh-card__footer">
                  <span className="gh-card__arrow">→</span>
                  {r.live && <span className="gh-card__live">Live ↗</span>}
                </div>
              </a>
              {r.preview && (
                <button
                  className="gh-card__preview-btn"
                  id={`preview-gh-${r.id}`}
                  onClick={() => setActiveProject({
                    ...r,
                    tag: 'GitHub',
                    period: '',
                    stack: r.lang ? [r.lang] : [],
                    link: r.live || null,
                    description: r.desc,
                  })}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  Preview
                </button>
              )}
            </div>
          ))}
        </div>

        {/* View all on GitHub */}
        <div className="projects-github-cta">
          <a href="https://github.com/vkwizz" target="_blank" rel="noopener noreferrer"
            id="github-all" className="projects-github-link">
            View all repositories on GitHub ↗
          </a>
        </div>

      </div>

      {/* ── Modal ── */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
