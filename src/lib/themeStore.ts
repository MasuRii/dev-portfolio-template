import { atom } from 'nanostores';

export type Theme = 'light' | 'dark' | undefined;

export const themeStore = atom<Theme>(undefined);

export function toggleTheme() {
  const current = themeStore.get();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
}

export function setTheme(newTheme: Theme) {
  if (!newTheme) return;

  const root = window.document.documentElement;
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  if (newTheme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
    if (themeColorMeta) themeColorMeta.setAttribute('content', '#0a0a0b');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    if (themeColorMeta) themeColorMeta.setAttribute('content', '#ffffff');
  }

  localStorage.setItem('theme', newTheme);
  themeStore.set(newTheme);
}
