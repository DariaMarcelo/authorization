import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/auth-api';
import { IUser } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get isAuthorized(): boolean {
    return this.getToken() !== null;
  }

  public login(email: string, password: string): Observable<IUser> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);

    return this.http.post<IUser>(`${API_URL}/api/login`, params, {
      headers: { skip: 'true' },
    });
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }
}
