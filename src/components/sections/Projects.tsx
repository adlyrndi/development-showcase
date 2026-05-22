import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { projects, categories } from '../../data/projects';
import type { Project } from '../../data/projects';
import { ExternalLink, Github, Eye, X } from 'lucide-react';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter(
          (p) => p.category.toLowerCase() === activeFilter.toLowerCase()
        );

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects__label, .projects__title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects__header',
          start: 'top 80%',
        },
      });

      gsap.from('.projects__filter-btn', {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects__filters',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = sectionRef.current.querySelectorAll('.projects__card');
    gsap.fromTo(
      cards,
      { y: 40, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }
    );
  }, [activeFilter]);

  // Modal open/close animation
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';

      const ctx = gsap.context(() => {
        gsap.to(modalRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.fromTo(
          modalContentRef.current,
          { y: 50, scale: 0.95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
        );
      });

      return () => {
        ctx.revert();
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const handleCloseModal = () => {
    gsap.context(() => {
      gsap.to(modalContentRef.current, {
        y: 30,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
      gsap.to(
        modalRef.current,
        {
          opacity: 0,
          duration: 0.3,
          delay: 0.1,
          ease: 'power2.in',
          onComplete: () => setSelectedProject(null),
        }
      );
    });
  };

  return (
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects__header">
          <span className="projects__label mono">// Featured Work</span>
          <h2 className="projects__title">
            Selected <span className="gradient-text">Projects</span>
          </h2>
        </div>

        <div className="projects__filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`projects__filter-btn ${activeFilter === cat ? 'projects__filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`projects__card glass-card ${
                project.featured && index < 3 ? 'projects__card--featured' : ''
              }`}
            >
              <div className="projects__card-image">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                />
                <div className="projects__card-category-badge mono">
                  {project.category}
                </div>
              </div>

              <div className="projects__card-content">
                <h3 className="projects__card-title">{project.title}</h3>
                <p className="projects__card-desc">{project.description}</p>
                
                <div className="projects__card-tags">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="projects__card-tag mono">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="projects__card-tag projects__card-tag--more mono">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                <div className="projects__card-footer">
                  <button
                    className="projects__card-btn-primary"
                    onClick={() => setSelectedProject(project)}
                    id={`view-details-${project.id}`}
                  >
                    <Eye size={16} />
                    <span>View Details</span>
                  </button>
                  
                  <div className="projects__card-actions">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__card-action-btn"
                        aria-label={`View ${project.title} source code`}
                        title="View Source Code"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__card-action-btn"
                        aria-label={`Visit ${project.title} live demo`}
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --- PREMIUM DETAIL MODAL --- */}
      {selectedProject && (
        <div
          className="projects__modal-overlay"
          ref={modalRef}
          onClick={handleCloseModal}
          style={{ opacity: 0 }}
        >
          <div
            className="projects__modal-content glass-card"
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            style={{ opacity: 0 }}
          >
            <button
              className="projects__modal-close"
              onClick={handleCloseModal}
              aria-label="Close modal"
              id="close-project-modal"
            >
              <X size={20} />
            </button>

            <div className="projects__modal-grid">
              <div className="projects__modal-image-wrapper">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="projects__modal-image"
                />
                <div className="projects__modal-image-overlay" />
              </div>

              <div className="projects__modal-info">
                <span className="projects__modal-category mono">
                  {selectedProject.category}
                </span>
                <h3 className="projects__modal-title gradient-text">
                  {selectedProject.title}
                </h3>
                
                <div className="projects__modal-section">
                  <h4 className="projects__modal-section-title">Overview</h4>
                  <p className="projects__modal-desc">
                    {selectedProject.longDescription}
                  </p>
                </div>

                <div className="projects__modal-section">
                  <h4 className="projects__modal-section-title">Technologies Used</h4>
                  <div className="projects__modal-tags">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="projects__modal-tag mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="projects__modal-links">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__modal-btn projects__modal-btn--primary"
                    >
                      <span>Visit Live Site</span>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="projects__modal-btn projects__modal-btn--secondary"
                    >
                      <Github size={16} />
                      <span>View Source</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
