import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { User, UserAuth } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private errorService: ErrorService) { }

  user = signal<User | undefined>(undefined);
  private apiUrl = `${environment.API_URL}/api/auth/`;

  async authenticate(userAuth: UserAuth, authType: string): Promise<void> {
    try {
      const response: any = await fetch(`${this.apiUrl}${authType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userAuth),
      });

      const result = await response.json();

      this.user.set(result);
      localStorage.setItem('user', JSON.stringify(result));
      this.router.navigateByUrl("/");
    }
    catch (error) {
      throw new Error();
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Error decoding token', error);
      return true;
    }
  }

  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;

    const user: User = JSON.parse(userJson);
    if (this.isTokenExpired(user.token)) {
      localStorage.removeItem('user');
      this.errorService.setError("Login token expired, please login again.");
      this.router.navigateByUrl("/login");
      return null;
    }

    return user;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}