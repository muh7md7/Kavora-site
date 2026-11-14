import * as R from "react/jsx-dev-runtime";
import { fixProps } from "../tr";
type A = Parameters<typeof R.jsxDEV>;
export const Fragment = R.Fragment;
export function jsxDEV(type: A[0], props: A[1], key: A[2], isStatic: A[3], source?: A[4], self?: A[5]) {
  return R.jsxDEV(type, fixProps(type, props as Record<string, unknown>) as A[1], key, isStatic, source, self);
}
export type { JSX } from "react/jsx-runtime";
