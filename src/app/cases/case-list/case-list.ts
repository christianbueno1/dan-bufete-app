import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { LanguageService } from '../../i18n/language.service';
import { CasesApiService } from '../cases-api.service';

@Component({
  selector: 'app-case-list',
  imports: [RouterLink],
  templateUrl: './case-list.html',
  styleUrl: './case-list.css',
})
export class CaseList {
  private readonly languageService = inject(LanguageService);
  private readonly casesApiService = inject(CasesApiService);

  protected readonly t = this.languageService.translations;

  protected readonly casesResource = rxResource({
    stream: () => this.casesApiService.getCases(),
  });
}