import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { projects, categories } from '../../data/projects';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Separate featured and other projects
  const featuredProjects = projects.filter((p) => p.featured);
  
  // Non-featured projects filtered by active tab
  const filteredOtherProjects = projects.filter((p) => {
    if (p.featured) return false;
    if (activeFilter === 'All') return true;
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from('.projects__label, .projects__title', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects__header',
          start: 'top 80%',
        },
      });

      // Animating Featured Project Rows on Scroll
      const rows = gsap.utils.toArray('.projects__featured-row');
      rows.forEach((row: any) => {
        const img = row.querySelector('.projects__featured-image-wrapper');
        const content = row.querySelector('.projects__featured-content');
        
        gsap.from(img, {
          x: row.classList.contains('projects__featured-row--reverse') ? 100 : -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
          },
        });

        gsap.from(content, {
          x: row.classList.contains('projects__featured-row--reverse') ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 75%',
          },
        });
      });

      // Grid header and filter anims
      gsap.from('.projects__grid-header, .projects__filters', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects__grid-section',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animating grid cards on filter change
  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = sectionRef.current.querySelectorAll('.projects__grid-card');
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        
        {/* SECTION HEADER */}
        <header className="projects__header">
          <span className="projects__label mono" id="projects-label">// Portfolio</span>
          <h2 className="projects__title">
            Featured <span className="gradient-text">Creations</span>
          </h2>
        </header>

        {/* 1. FEATURED PROJECTS - ALTERNATING ROW LAYOUT */}
        <div className="projects__featured-list">
          {featuredProjects.map((project, index) => {
            const isReverse = index % 2 !== 0;
            const projectNumber = String(index + 1).padStart(2, '0');
            
            return (
              <article 
                key={project.id} 
                className={`projects__featured-row ${isReverse ? 'projects__featured-row--reverse' : ''}`}
              >
                {/* Visual Image Showcase */}
                <div className="projects__featured-image-container">
                  <div className="projects__featured-image-glow" />
                  <div className="projects__featured-image-wrapper">
                    <img 
                      src={project.image} 
                      alt={`Screenshot of ${project.title}`}
                      loading="lazy" 
                    />
                    <div className="projects__featured-image-overlay" />
                  </div>
                </div>

                {/* Details Content Showcase */}
                <div className="projects__featured-content">
                  <header className="projects__featured-meta">
                    <span className="projects__featured-number mono">{projectNumber}</span>
                    <span className="projects__featured-category mono">{project.category}</span>
                  </header>
                  
                  <h3 className="projects__featured-title">{project.title}</h3>
                  
                  <p className="projects__featured-desc">
                    {project.longDescription || project.description}
                  </p>

                  <ul className="projects__featured-tags mono">
                    {project.tags.map((tag) => (
                      <li key={tag} className="projects__featured-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <footer className="projects__featured-links">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__featured-btn projects__featured-btn--primary"
                        id={`featured-live-${project.id}`}
                      >
                        <span>Visit Live Site</span>
                        <ArrowUpRight size={18} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__featured-btn projects__featured-btn--secondary"
                        id={`featured-code-${project.id}`}
                        aria-label={`View ${project.title} code source`}
                      >
                        <Github size={18} />
                        <span>Source Code</span>
                      </a>
                    )}
                  </footer>
                </div>
              </article>
            );
          })}
        </div>

        {/* 2. OTHER NOTABLE PROJECTS - FILTERABLE GRID LAYOUT */}
        <div className="projects__grid-section">
          <header className="projects__grid-header">
            <h3 className="projects__grid-subtitle">Other Notable Projects</h3>
            <p className="projects__grid-desc">A curated list of applications and experiments I've built along the way.</p>
          </header>

          {/* Filter Navigation */}
          <nav className="projects__filters" aria-label="Project category filter">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`projects__filter-btn ${activeFilter === cat ? 'projects__filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                id={`filter-btn-${cat.toLowerCase()}`}
                aria-pressed={activeFilter === cat}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Grid Layout */}
          <div className="projects__grid">
            {filteredOtherProjects.map((project) => (
              <article key={project.id} className="projects__grid-card glass-card">
                <header className="projects__grid-card-image">
                  <img 
                    src={project.image} 
                    alt={`Preview of ${project.title}`}
                    loading="lazy"
                  />
                  <div className="projects__grid-card-badge mono">{project.category}</div>
                </header>

                <div className="projects__grid-card-content">
                  <h4 className="projects__grid-card-title">{project.title}</h4>
                  <p className="projects__grid-card-desc">{project.description}</p>
                  
                  <ul className="projects__grid-card-tags mono">
                    {project.tags.map((tag) => (
                      <li key={tag} className="projects__grid-card-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                  
                  <footer className="projects__grid-card-footer">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__grid-card-action"
                        aria-label={`View ${project.title} GitHub repository`}
                        id={`grid-code-${project.id}`}
                        title="GitHub Repository"
                      >
                        <Github size={18} />
                        <span>Source</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="projects__grid-card-action"
                        aria-label={`View ${project.title} live demo`}
                        id={`grid-live-${project.id}`}
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                        <span>Demo</span>
                      </a>
                    )}
                  </footer>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
