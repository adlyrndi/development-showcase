import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { scrollTo } from '../../hooks/useLenis';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
              <span className="footer__logo-bracket">&lt;</span>
              <span className="footer__logo-name">AR</span>
              <span className="footer__logo-bracket">/&gt;</span>
            </a>
            <p className="footer__tagline">
              Crafting digital experiences with code & creativity.
            </p>
          </div>

          <div className="footer__socials">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:hello@adlyrenadi.dev" className="footer__social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Adly Renadi. All rights reserved.
          </p>
          <button
            className="footer__back-top"
            onClick={() => scrollTo('#hero')}
            aria-label="Back to top"
            id="back-to-top"
          >
            <ArrowUp size={16} />
            <span>Back to top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
