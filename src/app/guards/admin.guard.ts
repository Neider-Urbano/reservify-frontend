import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getProfile().pipe(
      switchMap((user) => {
        if (user?.role === 'admin') {
          return of(true);
        } else {
          this.router.navigate(['/']);
          return of(false);
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
