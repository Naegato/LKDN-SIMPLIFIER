import Link from 'next/link';

import { LinkedInSignUpButton } from '@/components/linkedin-sign-in-button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className='flex flex-1 items-center justify-center bg-zinc-50 px-4 dark:bg-black'>
      <Card className='w-full max-w-sm'>
        <CardHeader className='text-center'>
          <CardTitle className='text-2xl'>Créer un compte</CardTitle>
          <CardDescription>Inscrivez-vous pour commencer</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
          <LinkedInSignUpButton />
          <p className='text-center text-sm text-muted-foreground'>
            Déjà un compte ?{' '}
            <Link
              href='/login'
              className='font-medium text-[#0A66C2] underline-offset-4 hover:underline dark:text-[#70a8e8]'
            >
              Se connecter
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
