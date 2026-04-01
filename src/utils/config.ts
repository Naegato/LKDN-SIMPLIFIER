import type { EnvKey } from '@/generated/types/env-keys';

export function config(key: EnvKey, options?: { required?: true }): string;
export function config(key: EnvKey, options: { required: false }): string | undefined;
export function config(key: EnvKey, options: { required?: boolean } = {}): string | undefined {
  const value = process.env[key];
  if (!value && (options.required ?? true)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
