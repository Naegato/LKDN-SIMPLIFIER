import { watch } from 'fs';
import type { NextConfig } from 'next';

import { ENV_EXAMPLE_PATH, generateEnvKeys } from './scripts/generate-env-keys';

generateEnvKeys();

if (process.env.NODE_ENV === 'development') {
  watch(ENV_EXAMPLE_PATH, () => generateEnvKeys());
}

const nextConfig: NextConfig = {};

export default nextConfig;
