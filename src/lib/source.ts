import { readFileSync } from "node:fs";
import { join } from "node:path";
/** Reads a component's real source at build time (server components only). */
export const readSource = (relPath: string) => readFileSync(join(process.cwd(), relPath), "utf8");
