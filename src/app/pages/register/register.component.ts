import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  nameError = false;
  emailError = false;
  passwordError = false;
  confirmPasswordError = false;
  apiError = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.emailError = !this.email;
    this.nameError = !this.name;
    this.passwordError = !this.password;
    this.confirmPasswordError = this.password !== this.confirmPassword;

    if (!this.emailError && !this.passwordError && !this.confirmPasswordError) {
      this.authService
        .registerAndLogin(this.name, this.email, this.password)
        .subscribe({
          next: () => {
            this.apiError = false;
            this.router.navigate(['/app']);
          },
          error: () => {
            this.apiError = true;
          },
        });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
