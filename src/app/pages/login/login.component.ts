import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = false;
  passwordError = false;
  apiError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.emailError = !this.email;
    this.passwordError = !this.password;

    if (!this.emailError && !this.passwordError) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.router.navigate(['/app']);
        },
        error: (err) => {
          this.apiError = 'Usuario o contraseña incorrectos';
        },
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
