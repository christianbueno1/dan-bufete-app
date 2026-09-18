import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import { LanguageService } from '../../i18n/language.service';
import { CasesApiService } from '../cases-api.service';

@Component({
  selector: 'app-case-detail',
  imports: [RouterLink],
  templateUrl: './case-detail.html',
  styleUrl: './case-detail.css',
})
export class CaseDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  private readonly casesApiService = inject(CasesApiService);

  protected readonly t = this.languageService.translations;

  protected readonly caseResource = rxResource({
    stream: () =>
      this.route.paramMap.pipe(
        switchMap((params) => {
          const caseId = Number(params.get('caseId'));

          return this.casesApiService.getCase(caseId);
        }),
      ),
  });
}