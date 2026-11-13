// Motion tokens — single source for JS motion (Motion / framer-motion). Mirrors tokens.css.
// Rule: animate transform + opacity only. Reduced motion is handled globally by <MotionConfig reducedMotion="user">.
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const dur = { micro: 0.35, reveal: 0.7, hero: 1.1, comp: 0.35, section: 0.7 } as const;
export const stagger = 0.07;
export const spring = { type: "spring", stiffness: 420, damping: 34 } as const;
export const softSpring = { type: "spring", stiffness: 160, damping: 22, mass: 0.6 } as const;
/** IntersectionObserver margin that fires when an element's top crosses 85% of the viewport. */
export const revealMargin = "0px 0px -15% 0px";
export const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: dur.reveal, ease: easeOut, delay: i * stagger } }),
};
