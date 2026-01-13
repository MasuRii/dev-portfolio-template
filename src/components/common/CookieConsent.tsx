import React, { useState, useEffect } from 'react';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'motion/react';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000); // Show after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {isVisible && (
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-1/2 z-50 w-[calc(100%-3rem)] max-w-lg -translate-x-1/2 rounded-2xl border border-border bg-background/80 p-6 shadow-2xl backdrop-blur-xl md:bottom-8 md:p-8"
            role="region"
            aria-label="Cookie consent"
          >
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-primary">
                  Cookie <span className="text-accent">Protocol</span>
                </h3>
                <p className="text-sm leading-relaxed text-secondary">
                  This site uses cookies to enhance the user experience and
                  analyze traffic. By continuing to browse, you agree to our use
                  of tracking technologies in accordance with our{' '}
                  <a
                    href="#"
                    className="text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleAccept}
                  className="flex-1 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-background transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex-none"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold text-primary transition-all hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:flex-none"
                >
                  Decline
                </button>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default CookieConsent;
