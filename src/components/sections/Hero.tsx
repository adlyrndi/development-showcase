import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { scrollTo } from '../../hooks/useLenis';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Greeting
      tl.from('.hero__greeting', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
      });

      // Name — split text reveal
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.hero__char');
        tl.from(
          chars,
          {
            y: 100,
            opacity: 0,
            rotateX: -90,
            duration: 0.8,
            stagger: 0.03,
          },
          '-=0.4'
        );
      }

      // Subtitle
      tl.from(
        subtitleRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        '-=0.3'
      );

      // CTAs
      if (ctaRef.current) {
        tl.from(
          ctaRef.current.children,
          { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 },
          '-=0.4'
        );
      }

      // Scroll indicator
      tl.from(
        scrollIndicatorRef.current,
        { opacity: 0, duration: 0.6 },
        '-=0.2'
      );

      // Parallax orbs on scroll
      if (orbsRef.current) {
        gsap.to(orbsRef.current.children, {
          y: -150,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="hero__char"
        style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section className="hero section" id="hero" ref={sectionRef}>
      {/* Background orbs */}
      <div className="hero__orbs" ref={orbsRef}>
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
      </div>

      {/* Grid lines */}
      <div className="hero__grid" />

      <div className="container hero__content">
        <p className="hero__greeting mono">
          <span className="hero__greeting-line" />
          Hello, I'm
        </p>

        <h1 className="hero__title" ref={titleRef}>
          {splitText('Adly Renadi')}
        </h1>

        <p className="hero__subtitle" ref={subtitleRef}>
          <span className="gradient-text">Fullstack Developer</span> who builds
          performant web apps & trading systems with modern technologies.
        </p>

        <div className="hero__cta" ref={ctaRef}>
          <button
            className="hero__btn hero__btn--primary"
            onClick={() => scrollTo('#projects')}
            id="hero-cta-projects"
          >
            View Projects
            <span className="hero__btn-glow" />
          </button>
          <button
            className="hero__btn hero__btn--secondary"
            onClick={() => scrollTo('#contact')}
            id="hero-cta-contact"
          >
            Contact Me
          </button>
          <div className="hero__social">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll" ref={scrollIndicatorRef} onClick={() => scrollTo('#about')}>
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span className="hero__scroll-text mono">
          <ArrowDown size={14} />
          Scroll
        </span>
      </div>
    </section>
  );
}
