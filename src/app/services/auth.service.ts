import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, switchMap, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { checkToken } from '../interceptors/token.interceptor';
import { User } from '../models/user.model';
import { ResponseLogin } from '../models/auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL + '/auth';
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  getDataUser() {
    return this.user$.getValue();
  }

  login(email: string, password: string) {
    return this.http
      .post<ResponseLogin>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, {
      name,
      email,
      password,
    });
  }

  registerAndLogin(name: string, email: string, password: string) {
    return this.register(name, email, password).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  getProfile() {
    const userId = this.tokenService.getUserIdFromToken();
    if (!userId) {
      return this.user$.asObservable();
    }

    return this.http
      .get<User>(`${this.apiUrl}/users/${userId}`, {
        context: checkToken(),
      })
      .pipe(
        tap((user) => {
          this.user$.next(user);
        })
      );
  }

  logout() {
    this.tokenService.removeToken();
  }

  updateUserRole(role: string) {
    const userId = this.tokenService.getUserIdFromToken();
    if (!userId) {
      return this.user$.asObservable();
    }

    return this.http
      .put(
        `${this.apiUrl}/users/${userId}`,
        { role: role },
        {
          context: checkToken(),
        }
      )
      .subscribe({
        next: () => {
          this.getProfile().subscribe();
        },
        error: () => {},
      });
  }
}
