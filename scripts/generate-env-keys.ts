import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';

const ROOT = process.cwd();
export const ENV_EXAMPLE_PATH = resolve(ROOT, '.env.example');
const OUT_PATH = resolve(ROOT, 'generated/types/env-keys.ts');

export function generateEnvKeys() {
  if (!ENV_EXAMPLE_PATH) {
    console.warn('No .env.example file found, skipping env keys generation.');
    return;
  }
  const keys = readFileSync(ENV_EXAMPLE_PATH, 'utf-8')
    .split('\n')
    .filter((line) => /^[A-Z_][A-Z0-9_]*=/.test(line))
    .map((line) => line.split('=')[0]);

  if (keys.length === 0) return;

  const content =
    '// generated from .env.example — do not edit manually\n' +
    'export type EnvKey =\n' +
    keys.map((k) => `  | '${k}'`).join('\n') +
    ';\n';

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, content);
}

if (import.meta.main) {
  generateEnvKeys();
}
