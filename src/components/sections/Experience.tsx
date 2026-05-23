import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { experiences as mockExperiences } from '../../data/experience';
import type { Experience } from '../../data/experience';
import { getExperiences } from '../../utils/sanity';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [experienceList, setExperienceList] = useState<Experience[]>(mockExperiences);

  useEffect(() => {
    async function fetchSanityExperiences() {
      const data = await getExperiences();
      setExperienceList(data);
    }
    fetchSanityExperiences();
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.experience__label, .experience__title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience__header',
          start: 'top 80%',
        },
      });

      // Timeline line draw
      gsap.fromTo(
        '.experience__line-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: '.experience__timeline',
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 1,
          },
        }
      );

      // Timeline items
      const items = sectionRef.current!.querySelectorAll('.experience__item');
      items.forEach((item, index) => {
        const direction = index % 2 === 0 ? -60 : 60;
        gsap.from(item, {
          x: direction,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
          },
        });
      });

      // Dots
      gsap.from('.experience__dot', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: '.experience__timeline',
          start: 'top 70%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className="experience__header">
          <span className="experience__label mono">// Career Journey</span>
          <h2 className="experience__title">
            Work <span className="gradient-text">Experience</span>
          </h2>
        </div>

        <div className="experience__timeline">
          <div className="experience__line">
            <div className="experience__line-fill" />
          </div>

          {experienceList.map((exp, index) => (
            <div
              key={exp.id}
              className={`experience__item ${
                index % 2 === 0 ? 'experience__item--left' : 'experience__item--right'
              }`}
            >
              <div className={`experience__dot ${exp.isCurrent ? 'experience__dot--active' : ''}`} />

              <div className="experience__card glass-card">
                <div className="experience__card-header">
                  <span className="experience__period mono">{exp.period}</span>
                  {exp.isCurrent && (
                    <span className="experience__badge">Current</span>
                  )}
                </div>
                <h3 className="experience__role">{exp.role}</h3>
                <p className="experience__company">
                  {exp.company} · {exp.location}
                </p>
                <p className="experience__desc">{exp.description}</p>
                <ul className="experience__achievements">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="experience__achievement">
                      {achievement}
                    </li>
                  ))}
                </ul>
                <div className="experience__tags">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="experience__tag mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
