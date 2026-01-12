export interface Project {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  imageAlt: string;
  tags: string[];
  summary: string;
  description: string;
  challenges: string;
  solutions: string;
  technologies: string[];
  links: {
    live: string;
    github: string;
  };
  featured: boolean;
}
