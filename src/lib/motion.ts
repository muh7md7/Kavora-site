// Motion tokens — mirrors tokens.css. transform/opacity only.
export const spring = { type: "spring", stiffness: 420, damping: 34 } as const;
export const easeOut = [0.22, 1, 0.36, 1] as const;
export const dur = { micro: 0.14, comp: 0.28, section: 0.56 } as const;
export const reveal = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: dur.section, ease: easeOut, delay: i * 0.05 } }),
};
