import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import { config } from '@/utils/config';
import { prisma } from '@/utils/prisma';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    linkedin: {
      clientId: config('LINKEDIN_CLIENT_ID'),
      clientSecret: config('LINKEDIN_CLIENT_SECRET'),
    },
  },
  plugins: [nextCookies()],
});
