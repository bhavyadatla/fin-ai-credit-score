
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type Theme = 'light' | 'dark' | 'system' | 'custom';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  customColors?: any;
  setCustomColors: (colors: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [customColors, setCustomColorsState] = useState<any>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserSettings();
    }
  }, [user]);

  useEffect(() => {
    applyTheme();
  }, [theme, customColors]);

  const loadUserSettings = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_settings')
      .select('theme, custom_theme_colors')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data) {
      setThemeState(data.theme as Theme);
      setCustomColorsState(data.custom_theme_colors);
    }
  };

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    
    if (user) {
      await supabase
        .from('user_settings')
        .update({ theme: newTheme })
        .eq('user_id', user.id);
    }
  };

  const setCustomColors = async (colors: any) => {
    setCustomColorsState(colors);
    
    if (user) {
      await supabase
        .from('user_settings')
        .update({ custom_theme_colors: colors })
        .eq('user_id', user.id);
    }
  };

  const applyTheme = () => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    } else if (theme === 'custom' && customColors) {
      root.classList.remove('dark');
      // Apply custom colors to CSS variables
      Object.entries(customColors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value as string);
      });
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, customColors, setCustomColors }}>
      {children}
    </ThemeContext.Provider>
  );
};
