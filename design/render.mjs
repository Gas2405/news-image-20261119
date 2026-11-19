// Renders design/page.html to a 1024x1024 PNG using the Playwright
// Chromium headless shell. Usage: node design/render.mjs [out.png]
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.argv[2] ?? join(here, 'render.png'));
const shell = join(
  process.env.HOME,
  '.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell',
);

execFileSync(shell, [
  '--headless', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
  '--force-device-scale-factor=1', '--window-size=1024,1024',
  '--virtual-time-budget=8000',
  `--screenshot=${out}`,
  'file://' + join(here, 'page.html'),
], { stdio: 'inherit' });
console.log('wrote', out);
