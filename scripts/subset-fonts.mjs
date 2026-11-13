// Subsets the self-hosted variable fonts to the characters the site actually uses.
// Geist Sans carries all body copy, so it keeps full Latin-1 punctuation; Geist Mono is only used
// for eyebrows, numbers and small labels, so it keeps uppercase, digits and a little punctuation.
// Run: node scripts/subset-fonts.mjs  (needs python3 + fonttools: pip install fonttools brotli)
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const SANS_IN = "node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2";
const MONO_IN = "node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2";

// U+0020–007E basic latin, plus the punctuation the copy uses (— – ’ “ ” · × → ↑ © …), and Latin-1 accents.
const SANS_UNICODES = "U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+2000-206F,U+2010-2027,U+20AC,U+2122,U+2190-2193,U+2212,U+00D7";
const MONO_UNICODES = "U+0020-007E,U+00B7,U+2010-2014,U+2018-201D,U+2026,U+2192";

mkdirSync("src/fonts", { recursive: true });
const run = (input, out, unicodes) => execFileSync("python3", [
  "-m", "fontTools.subset", input,
  `--unicodes=${unicodes}`,
  "--layout-features=kern,liga,calt,ss01,cv11,tnum",
  "--flavor=woff2", "--with-zopfli",
  "--no-hinting", "--desubroutinize",
  "--name-IDs=1,2,3,4,6", "--drop-tables+=DSIG",
  `--output-file=${out}`,
], { stdio: "inherit" });

run(SANS_IN, "src/fonts/Geist-subset.woff2", SANS_UNICODES);
run(MONO_IN, "src/fonts/GeistMono-subset.woff2", MONO_UNICODES);
console.log("done");
