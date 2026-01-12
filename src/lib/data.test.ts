import { describe, it, expect } from 'vitest';
import {
  getPersonalData,
  getProjectsData,
  getFeaturedProjects,
  getProjectsByCategory,
  getProjectById,
  getProjectCategories,
  getSkillsData,
  getExperienceSorted,
  getBlogPostsSorted,
} from './data';

describe('Data Loader', () => {
  it('loads personal data', () => {
    const data = getPersonalData();
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('title');
  });

  it('loads projects data', () => {
    const projects = getProjectsData();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('filters featured projects', () => {
    const featured = getFeaturedProjects();
    featured.forEach((p) => expect(p.featured).toBe(true));
  });

  it('filters projects by category', () => {
    const allCategories = getProjectCategories();
    if (allCategories.length > 1) {
      const category = allCategories[1];
      const filtered = getProjectsByCategory(category);
      filtered.forEach((p) => expect(p.category).toBe(category));
    }
  });

  it('gets project by id', () => {
    const projects = getProjectsData();
    const project = projects[0];
    const found = getProjectById(project.id);
    expect(found).toEqual(project);
  });

  it('loads skills data', () => {
    const skills = getSkillsData();
    expect(Array.isArray(skills)).toBe(true);
    expect(skills[0]).toHaveProperty('category');
    expect(skills[0]).toHaveProperty('skills');
  });

  it('sorts experience by period', () => {
    const sorted = getExperienceSorted();
    expect(Array.isArray(sorted)).toBe(true);
    if (sorted.length > 1) {
      // Basic check that it's sorted (lexicographical comparison of period)
      expect(
        sorted[0].period.localeCompare(sorted[1].period)
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it('sorts blog posts by date', () => {
    const sorted = getBlogPostsSorted();
    expect(Array.isArray(sorted)).toBe(true);
    if (sorted.length > 1) {
      const date1 = new Date(sorted[0].date).getTime();
      const date2 = new Date(sorted[1].date).getTime();
      expect(date1).toBeGreaterThanOrEqual(date2);
    }
  });
});
