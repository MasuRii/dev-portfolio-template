import React, { createContext, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { LazyMotion, domAnimation } from 'motion/react';
import {
  themeStore,
  setTheme,
  toggleTheme,
  type Theme,
} from '../../lib/themeStore';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useStore(themeStore);

  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark') ? 'dark' : 'light';
    setTheme(initialTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const theme = useStore(themeStore);

  return {
    theme,
    toggleTheme,
    setTheme,
  };
}
