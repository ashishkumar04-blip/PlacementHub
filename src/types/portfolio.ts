export type ProjectCategory = 'all' | 'hardware' | 'systems' | 'web' | 'ai' | 'distributed' | 'frontend';

export interface ArchitectureNode {
  name: string;
  role: string;
  tech: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  featured: boolean;
  year: string;
  role: string;
  problem: string;
  architecture: string;
  architectureNodes: ArchitectureNode[];
  challenge: string;
  solution: string;
  results: string[];
  metrics?: { label: string; value: string }[];
  stack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  codeSnippet?: {
    filename: string;
    language: string;
    code: string;
    description: string;
  };
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
    context: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'Academic' | 'Full-Time' | 'Internship' | 'Open-Source' | 'Leadership';
  description: string[];
  technologies: string[];
  impactMetric?: string;
}

export interface EducationItem {
  institution: string;
  location: string;
  degree: string;
  grade: string;
  period: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export interface SystemStatus {
  status: 'ONLINE' | 'STANDBY' | 'ENGAGED';
  location: string;
  timeZone: string;
  currentFocus: string;
  nodeVersion: string;
  latencyMs: number;
}
