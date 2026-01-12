import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import skillsData from '../data/skills.json';
import experienceData from '../data/experience.json';
import blogData from '../data/blog.json';
import navigationData from '../data/navigation.json';

export const getPersonalData = () => personalData;
export const getProjectsData = () => projectsData;
export const getSkillsData = () => skillsData;
export const getExperienceData = () => experienceData;
export const getBlogData = () => blogData;
export const getNavigationData = () => navigationData;

export type PersonalData = typeof personalData;
export type Project = (typeof projectsData)[0];
export type SkillCategory = (typeof skillsData)[0];
export type Experience = (typeof experienceData)[0];
export type BlogPost = (typeof blogData)[0];
export type NavItem = (typeof navigationData)[0];
