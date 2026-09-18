import { AppTranslations } from './language';

export const en: AppTranslations = {
    navigation: {
        cases: 'Cases',
        documents: 'Documents',
    },

    common: {
        search: 'Search',
        create: 'Create',
        view: 'View',
        edit: 'Edit',
        delete: 'Delete',
        cancel: 'Cancel',
        save: 'Save',
        close: 'Close',
        loading: 'Loading...',
    },

    cases: {
        title: 'Cases',
        listDescription: 'Manage the firm’s cases.',
        empty: 'No cases found.',
        loadError: 'Unable to load cases.',
        newCase: 'New case',
        caseNumber: 'Case number',
        titleField: 'Title',
        description: 'Description',
        client: 'Client',
        lawyer: 'Lawyer',
        practiceArea: 'Practice area',
        status: 'Status',
        priority: 'Priority',
        filingDate: 'Filing date',
        openedAt: 'Opened at',
        closedAt: 'Closed at',

        statusValues: {
            open: 'Open',
            in_progress: 'In progress',
            on_hold: 'On hold',
            closed: 'Closed',
        },

        priorityValues: {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
        },

        practiceAreaValues: {
            COMMERCIAL: 'Commercial',
            CIVIL: 'Civil',
            CRIMINAL: 'Criminal',
            LABOR: 'Labor',
            FAMILY: 'Family',
            ADMINISTRATIVE: 'Administrative',
            TAX: 'Tax',
            CONSTITUTIONAL: 'Constitutional',
        },
    },
};
