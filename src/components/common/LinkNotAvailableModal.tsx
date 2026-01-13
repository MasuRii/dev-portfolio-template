import React, { useEffect, useState, useCallback, useRef } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';

interface LinkInfo {
  type: 'live' | 'github' | 'generic';
  url: string;
}

export const LinkNotAvailableModal: React.FC = () => {
  const [linkInfo, setLinkInfo] = useState<LinkInfo | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const closeModal = useCallback(() => {
    setLinkInfo(null);
    document.body.style.overflow = 'auto';
    if (previousFocus.current) {
      previousFocus.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<LinkInfo>;
      previousFocus.current = document.activeElement as HTMLElement;
      setLinkInfo(customEvent.detail);
      document.body.style.overflow = 'hidden';
    };

    window.addEventListener('open-link-not-available-modal', handleOpen);
    return () => {
      window.removeEventListener('open-link-not-available-modal', handleOpen);
    };
  }, []);

  useEffect(() => {
    if (linkInfo && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [linkInfo]);

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

    if (linkInfo) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [linkInfo, closeModal]);

  const getContentByType = (type: LinkInfo['type']) => {
    switch (type) {
      case 'live':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          ),
          title: 'Demo Link',
          message:
            'This is a sample portfolio link. In a real portfolio, this would take you to the live project or deployed application.',
          description: 'Live Project / Demo Site',
        };
      case 'github':
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-accent"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          ),
          title: 'Repository Link',
          message:
            'This is a sample portfolio link. In a real portfolio, this would take you to the GitHub repository with the source code.',
          description: 'Source Code Repository',
        };
      default:
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          ),
          title: 'Sample Link',
          message:
            'This is a placeholder link for demonstration purposes. In a real portfolio, this would navigate to actual content.',
          description: 'External Link',
        };
    }
  };

  const content = linkInfo ? getContentByType(linkInfo.type) : null;

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {linkInfo && content && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-primary/40 backdrop-blur-xl"
              aria-hidden="true"
            />

            {/* Centering Container */}
            <div className="min-h-full flex items-center justify-center p-4">
              {/* Modal Content */}
              <m.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative w-full max-w-md bg-surface border border-border rounded-3xl shadow-2xl p-8 text-center"
                role="dialog"
                aria-modal="true"
                aria-labelledby="link-modal-title"
                aria-describedby="link-modal-description"
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/50 backdrop-blur-md border border-border text-primary hover:scale-110 active:scale-95 transition-all group"
                  aria-label="Close modal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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

                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                    {content.icon}
                  </div>
                </div>

                {/* Content */}
                <h2
                  id="link-modal-title"
                  className="text-2xl font-display font-bold text-primary mb-2"
                >
                  {content.title}
                </h2>

                <span className="inline-block px-3 py-1 rounded bg-accent/10 text-accent text-xs font-bold tracking-widest uppercase mb-4">
                  {content.description}
                </span>

                <p
                  id="link-modal-description"
                  className="text-secondary text-base leading-relaxed mb-8"
                >
                  {content.message}
                </p>

                {/* Action Button */}
                <button
                  onClick={closeModal}
                  className="px-8 py-4 bg-accent text-white rounded-full font-bold shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Got it!
                </button>
              </m.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

/**
 * Checks if a URL is a placeholder/demo link that should trigger the modal
 */
export function isPlaceholderLink(url: string): boolean {
  if (!url) return true;

  const placeholderPatterns = [
    /^#$/,
    /^#[^/]/,
    /example\.com/i,
    /github\.com\/example\//i,
    /placeholder/i,
    /demo\.test/i,
    /^javascript:/i,
  ];

  return placeholderPatterns.some((pattern) => pattern.test(url));
}

/**
 * Gets the link type based on the URL
 */
export function getLinkType(url: string): 'live' | 'github' | 'generic' {
  if (url.includes('github.com')) return 'github';
  if (
    url.includes('example.com') ||
    url.includes('demo') ||
    url.includes('live')
  )
    return 'live';
  return 'generic';
}

/**
 * Opens the LinkNotAvailableModal with the given link info
 */
export function openLinkNotAvailableModal(
  type: 'live' | 'github' | 'generic',
  url: string
): void {
  window.dispatchEvent(
    new CustomEvent('open-link-not-available-modal', {
      detail: { type, url },
    })
  );
}
