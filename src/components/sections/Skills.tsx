import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { skillCategories } from '../../data/skills';
import { Monitor, Server, Database, Settings } from 'lucide-react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  monitor: Monitor,
  server: Server,
  database: Database,
  settings: Settings,
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.skills__label, .skills__title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__header',
          start: 'top 80%',
        },
      });

      gsap.from('.skills__card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__grid',
          start: 'top 80%',
        },
      });

      // Animate progress bars
      const bars = sectionRef.current!.querySelectorAll('.skills__progress-fill');
      bars.forEach((bar) => {
        const width = bar.getAttribute('data-width') || '0';
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className="skills__header">
          <span className="skills__label mono">// Skills & Technologies</span>
          <h2 className="skills__title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
        </div>

        <div className="skills__grid">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] || Monitor;
            return (
              <div key={category.title} className="skills__card glass-card">
                <div className="skills__card-header">
                  <div className="skills__card-icon-wrapper">
                    <Icon size={22} />
                  </div>
                  <h3 className="skills__card-title">{category.title}</h3>
                </div>

                <div className="skills__list">
                  {category.skills.map((skill) => (
                    <div key={skill.name} className="skills__item">
                      <div className="skills__item-header">
                        <span className="skills__item-name">{skill.name}</span>
                        <span className="skills__item-level mono">{skill.level}%</span>
                      </div>
                      <div className="skills__progress">
                        <div
                          className="skills__progress-fill"
                          data-width={skill.level}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
