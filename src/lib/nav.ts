export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/skills' },
  { label: 'Blog', href: '/blog' },
  { label: 'Activities', href: '/activities' },
  { label: 'Resume', href: '/resume' },
];

export const secondaryNavLinks: NavLink[] = [
  { label: 'Contact', href: '/contact' },
  { label: 'Uses', href: '/uses' },
];
