"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../locales/en.json';
import fr from '../locales/fr.json';

type Lang = 'en' | 'fr';

type I18nContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const bundles: Record<Lang, Record<string, any>> = {
  en,
  fr,
};

function getByKey(obj: Record<string, any>, key: string): string | undefined {
  const parts = key.split('.');
  let cur: any = obj;
  for (const p of parts) {
    if (!cur) return undefined;
    cur = cur[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang');
      if (stored === 'fr' || stored === 'en') setLangState(stored as Lang);
    } catch (e) {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('site-lang', l);
    } catch (e) {
      // ignore
    }
  };

  const t = (key: string) => {
    const bundle = bundles[lang] || bundles.en;
    return getByKey(bundle, key) ?? key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}

export default LanguageProvider;
