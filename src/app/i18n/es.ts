import { AppTranslations } from './language';

export const es: AppTranslations = {
    navigation: {
        cases: 'Casos',
        documents: 'Documentos',
    },

    common: {
        search: 'Buscar',
        create: 'Crear',
        view: 'Ver',
        edit: 'Editar',
        delete: 'Eliminar',
        cancel: 'Cancelar',
        save: 'Guardar',
        close: 'Cerrar',
        loading: 'Cargando...',
    },

    cases: {
        title: 'Casos',
        listDescription: 'Administra los casos del bufete.',
        empty: 'No hay casos registrados.',
        loadError: 'No se pudieron cargar los casos.',
        newCase: 'Nuevo caso',
        caseNumber: 'Número de caso',
        titleField: 'Título',
        description: 'Descripción',
        client: 'Cliente',
        lawyer: 'Abogado',
        practiceArea: 'Área de práctica',
        status: 'Estado',
        priority: 'Prioridad',
        filingDate: 'Fecha de presentación',
        openedAt: 'Fecha de apertura',
        closedAt: 'Fecha de cierre',

        statusValues: {
            open: 'Abierto',
            in_progress: 'En proceso',
            on_hold: 'En espera',
            closed: 'Cerrado',
        },

        priorityValues: {
            low: 'Baja',
            medium: 'Media',
            high: 'Alta',
        },

        practiceAreaValues: {
            COMMERCIAL: 'Comercial',
            CIVIL: 'Civil',
            CRIMINAL: 'Penal',
            LABOR: 'Laboral',
            FAMILY: 'Familia',
            ADMINISTRATIVE: 'Administrativo',
            TAX: 'Tributario',
            CONSTITUTIONAL: 'Constitucional',
        },
    },
};
