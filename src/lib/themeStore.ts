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
  if (newTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  localStorage.setItem('theme', newTheme);
  themeStore.set(newTheme);
}
