import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/auth-api';
import { IUser, IAssessment, IAssessmentReport } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${API_URL}/api/users`);
  }

  getAssessments(): Observable<IAssessment[]> {
    return this.http.get<IAssessment[]>(`${API_URL}/api/userassessments`);
  }

  getAssessmentReport(
    assessmentId: string | null
  ): Observable<IAssessmentReport> {
    const params = new HttpParams().set('id', assessmentId!);
    return this.http.get<IAssessmentReport>(
      `${API_URL}/api/userassessments/graph?${params}`
    );
  }
}
