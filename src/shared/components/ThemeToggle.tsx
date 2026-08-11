import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/app/store/themeStore';
import { cn } from '@/shared/utils/cn';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function ThemeToggle({ className, variant = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore();

  // ✅ Ajout de logs pour le debug
  console.log('Current theme in toggle:', theme);

  if (variant === 'compact') {
    return (
      <button
        onClick={() => {
          console.log('Toggle button clicked');
          toggleTheme();
        }}
        className={cn(
          "rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200",
          className
        )}
        aria-label="Changer le thème"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        console.log('Toggle button clicked');
        toggleTheme();
      }}
      className={cn(
        "relative inline-flex h-10 w-20 items-center rounded-full bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 dark:bg-gray-700",
        className
      )}
      aria-label="Changer le thème"
    >
      {/* Icône Soleil */}
      <span className="absolute left-1.5 text-gray-600 transition-opacity duration-300 dark:text-gray-400">
        <Sun className="h-5 w-5" />
      </span>
      
      {/* Icône Lune */}
      <span className="absolute right-1.5 text-gray-400 transition-opacity duration-300 dark:text-gray-200">
        <Moon className="h-5 w-5" />
      </span>

      {/* Curseur */}
      <span
        className={cn(
          "inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-1 ring-gray-300 transition-transform duration-300 dark:ring-gray-600",
          theme === 'dark' ? 'translate-x-10' : 'translate-x-0'
        )}
      />
    </button>
  );
}