import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import {
  Case,
  CasePriority,
  CaseStatus,
  PracticeArea,
} from './case.model';

@Service()
export class CasesApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  getCases(filters?: {
    practice_area?: PracticeArea;
    status_?: CaseStatus;
    skip?: number;
    limit?: number;
  }): Observable<Case[]> {
    let params = new HttpParams();

    if (filters?.practice_area) {
      params = params.set('practice_area', filters.practice_area);
    }

    if (filters?.status_) {
      params = params.set('status_', filters.status_);
    }

    if (filters?.skip !== undefined) {
      params = params.set('skip', filters.skip);
    }

    if (filters?.limit !== undefined) {
      params = params.set('limit', filters.limit);
    }

    return this.http.get<Case[]>(`${this.apiUrl}/cases`, { params });
  }

  getCase(caseId: number): Observable<Case> {
    return this.http.get<Case>(`${this.apiUrl}/cases/${caseId}`);
  }

  createCase(data: CreateCaseRequest): Observable<Case> {
    return this.http.post<Case>(`${this.apiUrl}/cases`, data);
  }

  updateCase(
    caseId: number,
    data: UpdateCaseRequest,
  ): Observable<Case> {
    return this.http.patch<Case>(
      `${this.apiUrl}/cases/${caseId}`,
      data,
    );
  }

  deleteCase(caseId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cases/${caseId}`);
  }
}

export interface CreateCaseRequest {
  practice_area: PracticeArea;
  title: string;
  description: string;
  client_name: string;
  lawyer_name: string;
  priority?: CasePriority;
  status?: CaseStatus;
  filing_date?: string | null;
  opened_at?: string | null;
}

export interface UpdateCaseRequest {
  title?: string;
  description?: string;
  client_name?: string;
  lawyer_name?: string;
  priority?: CasePriority;
  status?: CaseStatus;
  filing_date?: string | null;
  closed_at?: string | null;
}
