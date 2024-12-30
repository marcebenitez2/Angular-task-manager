import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from '../../core/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl;
  private userSubject = new BehaviorSubject<AuthResponse['user']>({ id: '', email: '', name: '' });
  user$ = this.userSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/users/login`, credentials)
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  register(credentials: RegisterCredentials): Observable<AuthResponse> {
    console.log('credentials', credentials);
    return this.http
      .post<AuthResponse>(`${this.API_URL}/users/register`, credentials)
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  private handleAuthentication(response: AuthResponse): void {
    console.log('response', response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.userSubject.next(response.user);
    this.isAuthenticatedSubject.next(true); // Actualiza el estado
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next({ id: '', email: '', name: '' });
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): Observable<AuthResponse['user']> {
    return this.user$;
  }
}
