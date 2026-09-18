export type Language = 'es' | 'en';

export interface AppTranslations {
  navigation: {
    cases: string;
    documents: string;
  };

  common: {
    search: string;
    create: string;
    view: string;
    edit: string;
    delete: string;
    cancel: string;
    save: string;
    close: string;
    loading: string;
  };

  cases: {
    title: string;
    listDescription: string;
    empty: string;
    loadError: string;
    newCase: string;
    caseNumber: string;
    titleField: string;
    description: string;
    client: string;
    lawyer: string;
    practiceArea: string;
    status: string;
    priority: string;
    filingDate: string;
    openedAt: string;
    closedAt: string;

    statusValues: {
      open: string;
      in_progress: string;
      on_hold: string;
      closed: string;
    };

    priorityValues: {
      low: string;
      medium: string;
      high: string;
    };

    practiceAreaValues: {
      COMMERCIAL: string;
      CIVIL: string;
      CRIMINAL: string;
      LABOR: string;
      FAMILY: string;
      ADMINISTRATIVE: string;
      TAX: string;
      CONSTITUTIONAL: string;
    };
  };
}
