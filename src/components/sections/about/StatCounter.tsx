import React, { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useSpring,
  useInView,
  m,
  LazyMotion,
  domAnimation,
} from 'motion/react';

interface StatCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  label,
  suffix = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current) {
        const displayValue = Math.floor(latest);
        const valueElement = ref.current.querySelector('.stat-value');
        if (valueElement) {
          valueElement.textContent = `${displayValue}${suffix}`;
        }
      }
    });
  }, [springValue, suffix]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="p-4 rounded-xl bg-background border border-border group hover:border-accent transition-colors duration-300"
      >
        <div className="stat-value text-h3 font-bold text-primary group-hover:text-accent transition-colors duration-300">
          0{suffix}
        </div>
        <div className="text-small text-secondary group-hover:text-primary transition-colors duration-300">
          {label}
        </div>
      </m.div>
    </LazyMotion>
  );
};
