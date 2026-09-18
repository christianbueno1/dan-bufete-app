import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Language } from '../i18n/language';
import { LanguageService } from '../i18n/language.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
})
export class AppHeader {
  private readonly languageService = inject(LanguageService);

  protected readonly language = this.languageService.language;
  protected readonly t = this.languageService.translations;

  protected setLanguage(language: Language): void {
    this.languageService.setLanguage(language);
  }
}