'use client';

import { ChevronLeft, ChevronRight, Home, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { signOut, useSession } from '@/utils/auth-client';

const NAV_ITEMS = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/settings', icon: Settings, label: 'Paramètres' },
];

function NavItem({
  href,
  icon: Icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const item = (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        isActive && 'bg-sidebar-accent text-sidebar-accent-foreground',
        collapsed && 'justify-center px-2',
      )}
    >
      <Icon className='size-5 shrink-0' />
      {!collapsed && <span>{label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{item}</TooltipTrigger>
        <TooltipContent side='right'>{label}</TooltipContent>
      </Tooltip>
    );
  }

  return item;
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300',
          collapsed ? 'w-16' : 'w-60',
        )}
      >
        {/* Toggle button */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className='absolute -right-3 top-6 z-10 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground'
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className='size-3.5' /> : <ChevronLeft className='size-3.5' />}
        </button>

        {/* Logo / brand */}
        <div
          className={cn('flex h-14 items-center border-b px-4', collapsed && 'justify-center px-0')}
        >
          {collapsed ? (
            <span className='text-lg font-bold text-sidebar-primary'>L</span>
          ) : (
            <span className='text-base font-semibold text-sidebar-foreground'>LinkedIn App</span>
          )}
        </div>

        {/* Nav */}
        <nav className='flex flex-1 flex-col gap-1 overflow-y-auto p-2'>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} collapsed={collapsed} />
          ))}
        </nav>

        {/* Footer — user info + logout */}
        <div className='p-2'>
          <Separator className='mb-2' />
          <div
            className={cn(
              'flex items-center gap-3 rounded-lg px-2 py-2',
              collapsed && 'justify-center',
            )}
          >
            <Avatar className='size-8 shrink-0'>
              <AvatarImage src={user?.image ?? undefined} alt={user?.name ?? 'User'} />
              <AvatarFallback className='text-xs'>{initials}</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-sidebar-foreground'>
                  {user?.name ?? '—'}
                </p>
                <p className='truncate text-xs text-muted-foreground'>{user?.email ?? ''}</p>
              </div>
            )}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon-sm'
                  className='shrink-0 text-muted-foreground hover:text-destructive'
                  onClick={() =>
                    signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          window.location.href = '/login';
                        },
                      },
                    })
                  }
                  aria-label='Se déconnecter'
                >
                  <LogOut className='size-4' />
                </Button>
              </TooltipTrigger>
              <TooltipContent side='right'>Se déconnecter</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
