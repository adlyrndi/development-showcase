export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  isCurrent: boolean;
}

export const experiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Fullstack Developer',
    company: 'Tech Startup',
    location: 'Jakarta, Indonesia',
    period: 'Jan 2025 — Present',
    description: 'Building scalable web applications and trading platforms with modern tech stack.',
    achievements: [
      'Developed an algorithmic trading platform processing real-time market data',
      'Built RESTful APIs serving 10K+ daily requests with 99.9% uptime',
      'Implemented WebSocket-based real-time communication systems',
      'Reduced page load times by 40% through performance optimization',
    ],
    tags: ['React', 'FastAPI', 'PostgreSQL', 'WebSocket'],
    isCurrent: true,
  },
  {
    id: 'exp-2',
    role: 'Frontend Developer',
    company: 'Digital Agency',
    location: 'Jakarta, Indonesia',
    period: 'Jun 2024 — Dec 2024',
    description: 'Crafted responsive and interactive user interfaces for various client projects.',
    achievements: [
      'Delivered 5+ production-ready web applications for enterprise clients',
      'Implemented complex UI animations using GSAP and Framer Motion',
      'Achieved 95+ Lighthouse scores across all client projects',
      'Mentored 2 junior developers on React best practices',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'GSAP'],
    isCurrent: false,
  },
  {
    id: 'exp-3',
    role: 'Junior Web Developer',
    company: 'Freelance',
    location: 'Remote',
    period: 'Jan 2024 — May 2024',
    description: 'Started freelancing journey building websites and web applications for local businesses.',
    achievements: [
      'Built responsive e-commerce websites with payment gateway integration',
      'Created inventory management system for small businesses',
      'Learned full-stack development from scratch through client projects',
    ],
    tags: ['HTML/CSS', 'JavaScript', 'Node.js', 'MySQL'],
    isCurrent: false,
  },
];
