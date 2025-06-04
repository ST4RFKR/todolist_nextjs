'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system" // Используем system по умолчанию
      enableSystem
      disableTransitionOnChange
      {...props}>
      {children}
    </NextThemesProvider>
  );
}
