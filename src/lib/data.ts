import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import blogData from '../data/blog.json';
import navigationData from '../data/navigation.json';
import type { Project } from '../types/project';
import type { BlogPost } from '../types/blog';
import type { Experience } from '../types/experience';
import { PUBLIC_EMAIL } from './env';

// Data Loaders

// Personal
export const getPersonalData = () => {
  const data = { ...personalData };
  if (PUBLIC_EMAIL) {
    data.contact.email = PUBLIC_EMAIL;
  }
  return data;
};

// Projects
export const getProjectsData = () => projectsData as Project[];

export const getFeaturedProjects = () =>
  (projectsData as Project[]).filter((project) => project.featured);

export const getProjectsByCategory = (category: string) => {
  const projects = projectsData as Project[];
  if (category.toLowerCase() === 'all') return projects;
  return projects.filter(
    (project) => project.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProjectById = (id: string) =>
  (projectsData as Project[]).find((project) => project.id === id);

export const getProjectCategories = () => [
  'All',
  ...new Set((projectsData as Project[]).map((project) => project.category)),
];

// Skills
export const getSkillsData = () => skillsData;

export const getSkillsByCategory = (category: string) =>
  skillsData.find((c) => c.category.toLowerCase() === category.toLowerCase());

// Experience
export const getExperienceData = () => experienceData as Experience[];

export const getExperienceSorted = () =>
  [...(experienceData as Experience[])].sort((a, b) =>
    b.period.localeCompare(a.period)
  );

// Blog
export const getBlogData = () => blogData as BlogPost[];

export const getBlogPostsSorted = () =>
  [...(blogData as BlogPost[])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

// Navigation
export const getNavigationData = () => navigationData;

// Types
export type PersonalData = typeof personalData;
export { type Project, type BlogPost, type Experience };
export type SkillCategory = (typeof skillsData)[0];
export type NavItem = (typeof navigationData)[0];
