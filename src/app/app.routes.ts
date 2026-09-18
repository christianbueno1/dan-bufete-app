import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'cases',
    },
    {
        path: 'cases',
        loadComponent: () =>
            import('./cases/case-list/case-list').then(
                (component) => component.CaseList,
            ),
    },
    {
        path: 'cases/new',
        loadComponent: () =>
            import('./cases/case-form/case-form').then(
                (component) => component.CaseForm,
            ),
    },
    {
        path: 'cases/:caseId/edit',
        loadComponent: () =>
            import('./cases/case-form/case-form').then(
                (component) => component.CaseForm,
            ),
    },
    {
        path: 'cases/:caseId',
        loadComponent: () =>
            import('./cases/case-detail/case-detail').then(
                (component) => component.CaseDetail,
            ),
    },
];