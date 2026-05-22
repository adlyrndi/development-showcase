import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.contact__label, .contact__title, .contact__desc', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__header',
          start: 'top 80%',
        },
      });

      gsap.from('.contact__form-wrapper', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__grid',
          start: 'top 75%',
        },
      });

      gsap.from('.contact__info', {
        x: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__grid',
          start: 'top 75%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate send
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
      setFormState({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      {/* Background orbs */}
      <div className="contact__orbs">
        <div className="contact__orb contact__orb--1" />
        <div className="contact__orb contact__orb--2" />
      </div>

      <div className="container">
        <div className="contact__header">
          <span className="contact__label mono">// Get In Touch</span>
          <h2 className="contact__title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="contact__desc">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__form-wrapper glass-card">
            <form className="contact__form" onSubmit={handleSubmit} id="contact-form">
              <div className="contact__field">
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  className="contact__input"
                  placeholder=" "
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-name" className="contact__label-float">
                  Your Name
                </label>
              </div>

              <div className="contact__field">
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  className="contact__input"
                  placeholder=" "
                  value={formState.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-email" className="contact__label-float">
                  Email Address
                </label>
              </div>

              <div className="contact__field">
                <input
                  type="text"
                  name="subject"
                  id="contact-subject"
                  className="contact__input"
                  placeholder=" "
                  value={formState.subject}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-subject" className="contact__label-float">
                  Subject
                </label>
              </div>

              <div className="contact__field">
                <textarea
                  name="message"
                  id="contact-message"
                  className="contact__input contact__textarea"
                  placeholder=" "
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="contact-message" className="contact__label-float">
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                className={`contact__submit ${isSent ? 'contact__submit--sent' : ''}`}
                disabled={isSending}
                id="contact-submit"
              >
                {isSending ? (
                  <span className="contact__spinner" />
                ) : isSent ? (
                  'Message Sent! ✓'
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="contact__info">
            <div className="contact__info-card glass-card">
              <div className="contact__info-icon">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="contact__info-title">Email</h4>
                <p className="contact__info-text">hello@adlyrenadi.dev</p>
              </div>
            </div>

            <div className="contact__info-card glass-card">
              <div className="contact__info-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="contact__info-title">Location</h4>
                <p className="contact__info-text">Jakarta, Indonesia</p>
              </div>
            </div>

            <div className="contact__info-card glass-card">
              <div className="contact__info-icon">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="contact__info-title">Phone</h4>
                <p className="contact__info-text">+62 xxx xxxx xxxx</p>
              </div>
            </div>

            <div className="contact__availability">
              <div className="contact__availability-dot" />
              <span>Available for freelance & full-time opportunities</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
