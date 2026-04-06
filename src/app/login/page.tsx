import Link from 'next/link';

import { LinkedInSignInButton } from '@/components/linkedin-sign-in-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className='flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Bienvenue</CardTitle>
          <CardDescription>Connectez-vous pour accéder à votre compte</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <LinkedInSignInButton />
          <p className='text-center text-sm text-muted-foreground'>
            Pas encore de compte ?{' '}
            <Link
              href='/register'
              className='font-medium text-[#0A66C2] underline-offset-4 hover:underline dark:text-[#70a8e8]'
            >
              S&apos;inscrire avec LinkedIn
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
