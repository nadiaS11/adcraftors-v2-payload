'use client'

import { motion, type Variants, type MotionProps } from 'framer-motion'

/**
 * Animation Variants
 *
 * Reusable animation presets for consistent motion throughout the site.
 */

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
}

export const scaleInSpring: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
}

// Stagger container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Slide animations
export const slideInFromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Hero animations
export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Button hover effects
export const buttonHover = {
  scale: 1.02,
  transition: { duration: 0.2 },
}

export const buttonTap = {
  scale: 0.98,
}

// Card hover effects
export const cardHover = {
  y: -5,
}

// Default viewport settings for scroll animations
export const defaultViewport = {
  once: true,
  margin: '-50px',
  amount: 0.2 as const,
}

// Motion component wrappers
export { motion }
export type { Variants, MotionProps }

/**
 * Create stagger delay for items
 */
export function getStaggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay
}

/**
 * Counter animation for stats
 */
export function useCounterAnimation(
  end: number,
  duration: number = 2,
  startOnView: boolean = true,
) {
  return {
    from: 0,
    to: end,
    duration,
    startOnView,
  }
}
