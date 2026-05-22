export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack';
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'tradeflow',
    title: 'TradeFlow',
    description: 'Algorithmic trading platform with real-time market data, automated bot execution, and portfolio analytics dashboard.',
    longDescription: 'A comprehensive algorithmic trading platform built with FastAPI and React. Features include real-time WebSocket data feeds, automated trading bot management, backtesting engine, and detailed portfolio analytics with interactive charts.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    tags: ['Python', 'FastAPI', 'React', 'WebSocket', 'PostgreSQL'],
    category: 'fullstack',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'smart-task-hub',
    title: 'Smart Task Hub',
    description: 'Productivity platform with Kanban boards, Google OAuth, and real-time collaboration features.',
    longDescription: 'A smart productivity application featuring drag-and-drop Kanban boards, Google OAuth authentication, real-time task assignment between project managers and developers, and automated productivity analytics.',
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80',
    tags: ['React', 'Node.js', 'TypeScript', 'OAuth', 'MongoDB'],
    category: 'fullstack',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'wfh-attendance',
    title: 'WFH Attendance System',
    description: 'Employee attendance & monitoring platform for remote work with HRD admin dashboard.',
    longDescription: 'Full-stack WFH attendance and monitoring system with dual frontends — one for employees and one for HRD admins. Features clock-in/out tracking, activity monitoring, leave management, and comprehensive reporting.',
    image: 'https://images.unsplash.com/photo-1587560699334-bea93391dcef?w=800&q=80',
    tags: ['React', 'NestJS', 'MySQL', 'TypeScript', 'Docker'],
    category: 'fullstack',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 'ecommerce-api',
    title: 'E-Commerce REST API',
    description: 'Scalable REST API with JWT auth, payment integration, and event-driven voucher system.',
    longDescription: 'A robust e-commerce backend API featuring JWT authentication, Midtrans payment gateway integration, event-driven voucher/promotion system, and comprehensive inventory management.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    tags: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'JWT'],
    category: 'backend',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio Website',
    description: 'Modern portfolio with GSAP animations, smooth scrolling, and premium dark UI.',
    longDescription: 'A personal portfolio website built with React and GSAP for buttery-smooth scroll-driven animations, featuring Lenis smooth scroll, glassmorphism design, and optimized performance scoring 95+ on Lighthouse.',
    image: 'https://images.unsplash.com/photo-1545665277-5937489d95eb?w=800&q=80',
    tags: ['React', 'TypeScript', 'GSAP', 'CSS', 'Vite'],
    category: 'frontend',
    liveUrl: '#',
    githubUrl: '#',
    featured: false,
  },
  {
    id: 'realtime-chat',
    title: 'Realtime Chat App',
    description: 'WebSocket-based chat with rooms, typing indicators, and message persistence.',
    longDescription: 'A real-time chat application using Socket.io with features including private/group messaging, typing indicators, read receipts, file sharing, and message search with full persistence.',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80',
    tags: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Redis'],
    category: 'fullstack',
    githubUrl: '#',
    featured: false,
  },
];

export const categories = ['All', 'Frontend', 'Backend', 'Fullstack'] as const;
