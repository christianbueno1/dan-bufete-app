export type DocumentType =
  | 'contract'
  | 'evidence'
  | 'court_filing'
  | 'correspondence'
  | 'other';

export interface CaseDocument {
  id: number;
  case_id: number;
  name: string;
  document_type: DocumentType;
  file_url: string;
  uploaded_by: string;
  uploaded_at: string;
}
