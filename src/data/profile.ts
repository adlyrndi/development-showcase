export interface ProfileInfo {
  name: string;
  roles: string[];
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutText: string;
  aboutImage: string;
  cvUrl?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export const defaultProfile: ProfileInfo = {
  name: 'Adly Renadi',
  roles: ['Software Engineer', 'Fullstack Developer', 'Mobile Developer'],
  heroTitle: "Hello, I'm",
  heroSubtitle: 'who builds performant web apps & trading systems with modern technologies.',
  aboutTitle: 'Passionate about building exceptional digital products',
  aboutText: "I'm a Fullstack Developer based in Jakarta, Indonesia. I specialize in building modern web applications using React, Node.js, Python, and other cutting-edge technologies.\n\nMy journey in software development started with curiosity and grew into a passion for creating performant, user-friendly applications. I'm particularly interested in algorithmic trading systems and real-time applications.\n\nWhen I'm not coding, you'll find me exploring new technologies, contributing to open source, or learning about financial markets and trading strategies.",
  aboutImage: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
  githubUrl: 'https://github.com/adlyrndi',
  linkedinUrl: 'https://linkedin.com/in/adlyrenadi',
  email: 'adlyrenadi@example.com',
};
