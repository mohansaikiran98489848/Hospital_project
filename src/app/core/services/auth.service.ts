import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'token';
  private roleKey = 'role';
  private usernameKey = 'username';

  constructor(private http: HttpClient, private router: Router) {}

  login(dto: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, dto).pipe(
      tap((res: any) => {
        if (res?.token) {
          this.saveToken(res.token, res.role ?? 'Reception', res.userName ?? dto.username);
        } else if (typeof res === 'string') {
          this.saveToken(res, 'Reception', dto.username);
        }
      })
    );
  }

  saveToken(token: string, role: string, username: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
    localStorage.setItem(this.usernameKey, username);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  hasRole(allowedRoles: string[]): boolean {
    const role = this.getRole();
    return role ? allowedRoles.includes(role) : false;
  }

 isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000;
    return Date.now() < expiry;
  } catch {
    return false;
  }
}

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

