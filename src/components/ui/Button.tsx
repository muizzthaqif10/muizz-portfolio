import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type BaseProps = {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = BaseProps & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  >;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-accent text-accent-foreground hover:opacity-90',
  secondary:
    'border border-border-strong text-foreground hover:bg-surface-raised',
  ghost: 'text-foreground hover:bg-surface-raised',
};

const sizes = {
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-5 py-2.5',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, children, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <Link href={props.href} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
