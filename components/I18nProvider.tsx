"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, translations } from "@/lib/content";

const STORAGE_KEY = "consultation-language";

type I18nValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  copy: (typeof translations)[Language];
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ne") setLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "ne" ? "ne" : "en";
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, copy: translations[language] }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside I18nProvider");
  return value;
}
