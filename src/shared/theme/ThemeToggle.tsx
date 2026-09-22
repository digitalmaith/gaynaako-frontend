import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../app/store/themeStore';

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'dark'
          ? 'Activer le thème clair'
          : 'Activer le thème sombre'
      }
      title={
        theme === 'dark'
          ? 'Passer au thème clair'
          : 'Passer au thème sombre'
      }
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/5"
    >
      {theme === 'dark' ? (
        <Sun size={16} />
      ) : (
        <Moon size={16} />
      )}
    </button>
  );
}
