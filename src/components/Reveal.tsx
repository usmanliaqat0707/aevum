import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset (px) the element rises from. */
  y?: number;
  /** Animation delay (s) — useful for manual staggering. */
  delay?: number;
  /** Fraction of the element that must be visible before it animates in. */
  amount?: number;
  duration?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Scroll-driven reveal: fades + rises its children into place the first time
 * they enter the viewport. Used to give the page a continuous, choreographed
 * feel instead of sections simply appearing.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  y = 28,
  delay = 0,
  amount = 0.15,
  duration = 0.6,
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount }}
    transition={{ duration, delay, ease: EASE }}
  >
    {children}
  </motion.div>
);
