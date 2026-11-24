// Loading Screen Gold: A Tip in 200 Characters
// Writes a single loading-screen tip (<= 200 characters) to entry.txt.
// Node 22, standard library only, no network, deterministic output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 200;

const TIP =
  "Tip: you and your agent are both staring at this spinner, each quietly convinced the other knows what happens next.";

// Self-checking gate: the entry must pass the competition gate before it
// is written — UTF-8 text of 1 to 200 characters, not only whitespace,
// a single line. Fail loudly instead of shipping an invalid entry.
const chars = [...TIP].length;
if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`tip is ${chars} characters, must be 1-${MAX_CHARS}`);
}
if (TIP.trim().length === 0) {
  throw new Error("tip must not be only whitespace");
}
if (TIP.includes("\n") || TIP.includes("\r")) {
  throw new Error("tip must be a single line");
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), TIP, "utf8");
