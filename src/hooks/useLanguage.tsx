
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    creditReport: 'Credit Report',
    scoreHistory: 'Score History',
    documents: 'Documents',
    settings: 'Settings',
    logout: 'Logout',
    welcome: 'Welcome back',
    creditScore: 'Your Credit Score',
    // Add more translations as needed
  },
  es: {
    dashboard: 'Panel',
    profile: 'Perfil',
    creditReport: 'Reporte de Crédito',
    scoreHistory: 'Historial de Puntuación',
    documents: 'Documentos',
    settings: 'Configuración',
    logout: 'Cerrar Sesión',
    welcome: 'Bienvenido de nuevo',
    creditScore: 'Tu Puntuación de Crédito',
  },
  // Add more languages as needed
  fr: {
    dashboard: 'Tableau de bord',
    profile: 'Profil',
    creditReport: 'Rapport de crédit',
    scoreHistory: 'Historique des scores',
    documents: 'Documents',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    welcome: 'Bon retour',
    creditScore: 'Votre score de crédit',
  },
  de: {
    dashboard: 'Dashboard',
    profile: 'Profil',
    creditReport: 'Kreditbericht',
    scoreHistory: 'Score-Verlauf',
    documents: 'Dokumente',
    settings: 'Einstellungen',
    logout: 'Abmelden',
    welcome: 'Willkommen zurück',
    creditScore: 'Ihr Kredit-Score',
  },
  it: {
    dashboard: 'Dashboard',
    profile: 'Profilo',
    creditReport: 'Rapporto di credito',
    scoreHistory: 'Cronologia punteggio',
    documents: 'Documenti',
    settings: 'Impostazioni',
    logout: 'Disconnetti',
    welcome: 'Bentornato',
    creditScore: 'Il tuo punteggio di credito',
  },
  pt: {
    dashboard: 'Painel',
    profile: 'Perfil',
    creditReport: 'Relatório de Crédito',
    scoreHistory: 'Histórico de Pontuação',
    documents: 'Documentos',
    settings: 'Configurações',
    logout: 'Sair',
    welcome: 'Bem-vindo de volta',
    creditScore: 'Sua pontuação de crédito',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadUserLanguage();
    }
  }, [user]);

  const loadUserLanguage = async () => {
    if (!user) return;
    
    const { data } = await supabase
      .from('user_settings')
      .select('language')
      .eq('user_id', user.id)
      .maybeSingle();

    if (data?.language) {
      setLanguageState(data.language as Language);
    }
  };

  const setLanguage = async (newLanguage: Language) => {
    setLanguageState(newLanguage);
    
    if (user) {
      await supabase
        .from('user_settings')
        .update({ language: newLanguage })
        .eq('user_id', user.id);
    }
  };

  const t = (key: string) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
