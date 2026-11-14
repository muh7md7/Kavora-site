// Custom JSX runtime (tsconfig jsxImportSource): identical to React's, plus automatic Arabic for the /ar/ build.
import * as R from "react/jsx-runtime";
import { fixProps } from "../tr";
type T = Parameters<typeof R.jsx>[0];
type Pr = Parameters<typeof R.jsx>[1];
type K = Parameters<typeof R.jsx>[2];
export const Fragment = R.Fragment;
export function jsx(type: T, props: Pr, key?: K) { return R.jsx(type, fixProps(type, props as Record<string, unknown>) as Pr, key); }
export function jsxs(type: T, props: Pr, key?: K) { return R.jsxs(type, fixProps(type, props as Record<string, unknown>) as Pr, key); }
export type { JSX } from "react/jsx-runtime";
