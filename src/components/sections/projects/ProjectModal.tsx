import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../../../types/project';

interface ProjectModalProps {
  projects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ projects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(
    null
  );
  const project = projects.find((p) => p.id === selectedProjectId);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setSelectedProjectId(null);
    document.body.style.overflow = 'auto';
    // Restore focus to the element that was focused before opening the modal
    if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      // Save current focus
      previousFocus.current = document.activeElement as HTMLElement;
      setSelectedProjectId(customEvent.detail);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-project-modal', handleOpen);
    return () => {
      window.removeEventListener('open-project-modal', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (selectedProjectId && modalRef.current) {
      // Focus the first focusable element (the close button)
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [selectedProjectId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();

      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (selectedProjectId) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, closeModal]);

  return (
    <AnimatePresence>
      {selectedProjectId && project && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-primary/40 backdrop-blur-xl"
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-surface border border-border rounded-3xl shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-primary hover:scale-110 active:scale-95 transition-all group"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:rotate-90 transition-transform duration-300"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Scrollable Area */}
            <div className="overflow-y-auto custom-scrollbar p-6 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left: Content */}
                <div className="order-2 lg:order-1">
                  <span className="inline-block px-3 py-1 rounded bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-4">
                    {project.category}
                  </span>
                  <h2
                    id="modal-title"
                    className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 leading-tight"
                  >
                    {project.title}
                  </h2>

                  <div className="space-y-8">
                    <section>
                      <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">
                        Overview
                      </h3>
                      <p className="text-secondary text-lg leading-relaxed">
                        {project.description}
                      </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <section>
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">
                          The Challenge
                        </h3>
                        <p className="text-secondary text-base leading-relaxed">
                          {project.challenges}
                        </p>
                      </section>
                      <section>
                        <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">
                          The Solution
                        </h3>
                        <p className="text-secondary text-base leading-relaxed">
                          {project.solutions}
                        </p>
                      </section>
                    </div>

                    <section>
                      <h3 className="text-sm font-bold text-secondary uppercase tracking-widest mb-3">
                        Stack & Tools
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-mono text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-12">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-accent text-white rounded-full font-bold shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                    >
                      Visit Live Project
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-surface border border-border text-primary rounded-full font-bold hover:border-accent/50 hover:scale-105 active:scale-95 transition-all"
                    >
                      View Source Code
                    </a>
                  </div>
                </div>

                {/* Right: Media */}
                <div className="order-1 lg:order-2">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-inner bg-background">
                    <img
                      src={project.thumbnail}
                      alt={project.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
