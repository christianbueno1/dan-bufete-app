import { Component, effect, inject } from '@angular/core';
import {
    ActivatedRoute,
    Router,
    RouterLink,
} from '@angular/router';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { EMPTY } from 'rxjs';

import { LanguageService } from '../../i18n/language.service';
import {
    CasesApiService,
    CreateCaseRequest,
    UpdateCaseRequest,
} from '../cases-api.service';
import {
    CasePriority,
    CaseStatus,
    PracticeArea,
} from '../case.model';

@Component({
    selector: 'app-case-form',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './case-form.html',
    styleUrl: './case-form.css',
})
export class CaseForm {
    protected readonly today = new Date()
        .toISOString()
        .split('T')[0];
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly languageService = inject(LanguageService);
    private readonly casesApiService = inject(CasesApiService);

    protected readonly returnTo =
        this.route.snapshot.queryParamMap.get('returnTo') ?? 'list';

    protected readonly t = this.languageService.translations;

    protected readonly caseId = Number(
        this.route.snapshot.paramMap.get('caseId'),
    );

    protected readonly isEditMode = !Number.isNaN(this.caseId);

    protected readonly caseResource = rxResource({
        stream: () => {
            if (!this.isEditMode) {
                return EMPTY;
            }

            return this.casesApiService.getCase(this.caseId);
        },
    });

    protected readonly form = new FormGroup({
        practice_area: new FormControl<PracticeArea>('CIVIL', {
            nonNullable: true,
            validators: [Validators.required],
        }),

        title: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(255),
            ],
        }),

        description: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(10),
            ],
        }),

        client_name: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(255),
            ],
        }),

        lawyer_name: new FormControl('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.minLength(2),
                Validators.maxLength(255),
            ],
        }),

        priority: new FormControl<CasePriority>('medium', {
            nonNullable: true,
            validators: [Validators.required],
        }),

        status: new FormControl<CaseStatus>('open', {
            nonNullable: true,
            validators: [Validators.required],
        }),

        filing_date: new FormControl<string | null>(null),
    });

    protected readonly practiceAreas: PracticeArea[] = [
        'COMMERCIAL',
        'CIVIL',
        'CRIMINAL',
        'LABOR',
        'FAMILY',
        'ADMINISTRATIVE',
        'TAX',
        'CONSTITUTIONAL',
    ];

    protected readonly priorities: CasePriority[] = [
        'low',
        'medium',
        'high',
    ];

    protected readonly statuses: CaseStatus[] = [
        'open',
        'in_progress',
        'on_hold',
        'closed',
    ];

    constructor() {
        effect(() => {
            const caseItem = this.caseResource.value();

            if (!caseItem) {
                return;
            }

            this.form.patchValue({
                practice_area: caseItem.practice_area,
                title: caseItem.title,
                description: caseItem.description,
                client_name: caseItem.client_name,
                lawyer_name: caseItem.lawyer_name,
                priority: caseItem.priority,
                status: caseItem.status,
                filing_date: caseItem.filing_date,
            });
        });
    }

    protected submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const value = this.form.getRawValue();

        if (this.isEditMode) {
            const payload: UpdateCaseRequest = {
                title: value.title,
                description: value.description,
                client_name: value.client_name,
                lawyer_name: value.lawyer_name,
                priority: value.priority,
                status: value.status,
                filing_date: value.filing_date,
            };

            this.casesApiService
                .updateCase(this.caseId, payload)
                .subscribe(() => {
                    this.router.navigate(['/cases', this.caseId]);
                });

            return;
        }

        const payload: CreateCaseRequest = {
            practice_area: value.practice_area,
            title: value.title,
            description: value.description,
            client_name: value.client_name,
            lawyer_name: value.lawyer_name,
            priority: value.priority,
            status: value.status,
            filing_date: value.filing_date,
        };

        this.casesApiService
            .createCase(payload)
            .subscribe((caseItem) => {
                this.router.navigate(['/cases', caseItem.id]);
            });
    }
}