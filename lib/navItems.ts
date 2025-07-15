export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'History', href: '/history' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'News', href: '/news' },
  { name: 'Events', href: '/events' },
  { name: 'Back Corner', href: '/back-corner' },
] as const;
export type NavItem = (typeof navItems)[number];
