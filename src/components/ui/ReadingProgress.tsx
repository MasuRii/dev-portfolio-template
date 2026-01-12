import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ReadingProgress component
 * Displays a fixed progress bar at the top of the page indicating scroll depth.
 */
export const ReadingProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[110]"
      style={{ scaleX }}
      aria-hidden="true"
      data-testid="reading-progress"
    />
  );
};

export default ReadingProgress;
