import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { useCountUp } from '../../hooks/useCountUp';
import { Code2, Coffee, Rocket } from 'lucide-react';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

function StatCard({ icon: Icon, value, suffix, label }: {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}) {
  const [ref, count] = useCountUp(value, 2000);
  return (
    <div className="about__stat glass-card">
      <Icon size={24} className="about__stat-icon" />
      <span className="about__stat-value" ref={ref}>
        {count}{suffix}
      </span>
      <span className="about__stat-label">{label}</span>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Section title
      gsap.from('.about__label, .about__title, .about__desc', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__header',
          start: 'top 80%',
        },
      });

      // Image
      gsap.from('.about__image-wrapper', {
        x: -80,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__grid',
          start: 'top 75%',
        },
      });

      // Text content
      gsap.from('.about__text-content > *', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__grid',
          start: 'top 75%',
        },
      });

      // Stats
      gsap.from('.about__stat', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__stats',
          start: 'top 85%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={sectionRef}>
      <div className="container">
        <div className="about__header">
          <span className="about__label mono">// About Me</span>
          <h2 className="about__title">
            Passionate about building{' '}
            <span className="gradient-text">exceptional</span> digital products
          </h2>
          <p className="about__desc">
            A creative developer who loves turning complex problems into elegant solutions.
          </p>
        </div>

        <div className="about__grid">
          <div className="about__image-wrapper">
            <div className="about__image-frame glass-card">
              <img 
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80" 
                alt="Adly Renadi profile portrait" 
                className="about__image"
                loading="lazy"
              />
            </div>
            <div className="about__image-accent" />
          </div>

          <div className="about__text-content">
            <h3 className="about__text-title">
              Hi! I'm <span className="gradient-text">Adly Renadi</span>
            </h3>
            <p className="about__text">
              I'm a Fullstack Developer based in Jakarta, Indonesia. I specialize in
              building modern web applications using React, Node.js, Python, and other
              cutting-edge technologies.
            </p>
            <p className="about__text">
              My journey in software development started with curiosity and grew into a
              passion for creating performant, user-friendly applications. I'm particularly
              interested in algorithmic trading systems and real-time applications.
            </p>
            <p className="about__text">
              When I'm not coding, you'll find me exploring new technologies, contributing
              to open source, or learning about financial markets and trading strategies.
            </p>

            <div className="about__tags">
              {['React', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'PostgreSQL'].map(
                (tag) => (
                  <span key={tag} className="about__tag mono">{tag}</span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="about__stats">
          <StatCard icon={Rocket} value={2} suffix="+" label="Years Experience" />
          <StatCard icon={Code2} value={15} suffix="+" label="Projects Built" />
          <StatCard icon={Coffee} value={1200} suffix="+" label="Cups of Coffee" />
        </div>
      </div>
    </section>
  );
}
