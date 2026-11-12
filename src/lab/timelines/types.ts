export type Step =
  | { t: "move"; to: string; ms?: number }   // move cursor to selector (CSS) inside the stage
  | { t: "hover"; on: string; ms?: number }  // move + dispatch pointer/mouse enter
  | { t: "click"; on: string; ms?: number }  // move + click
  | { t: "wait"; ms: number };
export type Timeline = { duration: number; steps: Step[] };
