export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: 'monitor',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'GSAP / Framer Motion', level: 75 },
    ],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'Python / FastAPI', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'REST API Design', level: 90 },
      { name: 'WebSocket', level: 80 },
    ],
  },
  {
    title: 'Database',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 70 },
      { name: 'SQLAlchemy / Prisma', level: 75 },
    ],
  },
  {
    title: 'DevOps & Tools',
    icon: 'settings',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'Vercel / AWS', level: 70 },
      { name: 'CI/CD', level: 65 },
      { name: 'Linux / Bash', level: 75 },
    ],
  },
];
