import { computed, inject, Service, signal } from '@angular/core';

import { en } from './en';
import { es } from './es';
import { AppTranslations, Language } from './language';

const translations: Record<Language, AppTranslations> = {
  es,
  en,
};

const DEFAULT_LANGUAGE: Language = 'es';
const STORAGE_KEY = 'dan-bufete-language';

@Service()
export class LanguageService {
  private readonly languageState = signal<Language>(
    this.getInitialLanguage(),
  );

  readonly language = this.languageState.asReadonly();

  readonly translations = computed<AppTranslations>(
    () => translations[this.languageState()],
  );

  setLanguage(language: Language): void {
    this.languageState.set(language);
    localStorage.setItem(STORAGE_KEY, language);
  }

  private getInitialLanguage(): Language {
    const storedLanguage = localStorage.getItem(STORAGE_KEY);

    if (storedLanguage === 'es' || storedLanguage === 'en') {
      return storedLanguage;
    }

    return DEFAULT_LANGUAGE;
  }
}