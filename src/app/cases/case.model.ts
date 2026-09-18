import { CaseDocument } from './case-document.model';

export type PracticeArea =
  | 'COMMERCIAL'
  | 'CIVIL'
  | 'CRIMINAL'
  | 'LABOR'
  | 'FAMILY'
  | 'ADMINISTRATIVE'
  | 'TAX'
  | 'CONSTITUTIONAL';

export type CaseStatus =
  | 'open'
  | 'in_progress'
  | 'on_hold'
  | 'closed';

export type CasePriority =
  | 'low'
  | 'medium'
  | 'high';

export interface Case {
  id: number;
  case_number: string;
  practice_area: PracticeArea;
  title: string;
  description: string;
  client_name: string;
  lawyer_name: string;
  priority: CasePriority;
  status: CaseStatus;
  filing_date: string | null;
  opened_at: string | null;
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  documents?: CaseDocument[];
}
