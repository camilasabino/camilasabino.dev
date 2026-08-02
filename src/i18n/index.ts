export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'es';

export const routes = {
  home: { es: '/', en: '/en/' },
  about: { es: '/sobre', en: '/en/about/' },
  contact: { es: '/contacto', en: '/en/contact/' },
  blendify: { es: '/projects/blendify/', en: '/en/projects/blendify/' },
  work: { es: '/#proyectos', en: '/en/#work' },
} as const;

export type RouteKey = keyof typeof routes;

const pathToRoute: Record<string, RouteKey> = {
  '/': 'home',
  '/sobre': 'about',
  '/sobre/': 'about',
  '/contacto': 'contact',
  '/contacto/': 'contact',
  '/projects/blendify': 'blendify',
  '/projects/blendify/': 'blendify',
  '/en': 'home',
  '/en/': 'home',
  '/en/about': 'about',
  '/en/about/': 'about',
  '/en/contact': 'contact',
  '/en/contact/': 'contact',
  '/en/projects/blendify': 'blendify',
  '/en/projects/blendify/': 'blendify',
};

export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1) || '/';
  }
  return pathname || '/';
}

export function getLangFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

export function getRouteKey(pathname: string): RouteKey {
  const exact = pathToRoute[pathname] ?? pathToRoute[`${pathname}/`];
  if (exact) return exact;
  if (pathname.includes('blendify')) return 'blendify';
  if (pathname.includes('about') || pathname.includes('sobre')) return 'about';
  if (pathname.includes('contact') || pathname.includes('contacto')) return 'contact';
  return 'home';
}

export function getLocalizedPath(route: RouteKey, lang: Lang): string {
  return routes[route][lang];
}

export function getAlternatePath(pathname: string): string {
  const lang = getLangFromPath(pathname);
  const route = getRouteKey(pathname);
  const nextLang: Lang = lang === 'es' ? 'en' : 'es';
  return getLocalizedPath(route, nextLang);
}

export function t<T extends Record<Lang, unknown>>(dictionary: T, lang: Lang): T[Lang] {
  return dictionary[lang];
}
