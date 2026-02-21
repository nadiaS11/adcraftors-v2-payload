"use client"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations/variants"

export default function HeadingFeature(props: {
  header?: {
    eyebrow?: string
    headline?: string
  }
}) {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
      variants={staggerContainer}
    >
      {props.header?.eyebrow && (
        <motion.span
          variants={fadeInUp}
          className="inline-block text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3"
        >
          {props.header.eyebrow}
        </motion.span>
      )}
      {props.header?.headline && (
        <motion.h2
          variants={fadeInUp}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white"
        >
          {props.header.headline}
        </motion.h2>
      )}
    </motion.div>
  )
}
