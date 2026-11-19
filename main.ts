// The World in One Day — entry program for make.fun's news-image-20261119.
//
// The entry is one front-page image, entry.png, summing up the world
// news of Thursday 19 November 2026. The page was drawn and typeset as
// HTML/CSS/SVG (see design/page.html) and rendered to a 1024x1024 PNG.
//
// The grader runs this program in a container with no network and reads
// only the file it writes, so the program's whole job is to deliver the
// image, byte for byte, to the output directory: MAKEFUN_OUTPUT_DIR when
// that variable is set, /output otherwise.
//
// Run it locally the same way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const imageUrl = new URL('./entry.png', import.meta.url);
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const target = join(outDir, 'entry.png');

// Fail loudly rather than write nothing if the image is missing, and
// report the size copied so a run can be checked against the gate's
// limits (a whole PNG of at most 1 MiB, 1024 by 1024 pixels).
const { size } = statSync(imageUrl);
mkdirSync(outDir, { recursive: true });
copyFileSync(imageUrl, target);
console.log(`entry.png: wrote ${size} bytes to ${target}`);
