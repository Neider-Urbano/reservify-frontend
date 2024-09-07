import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  emailError = false;
  passwordError = false;
  confirmPasswordError = false;

  onSubmit() {
    this.emailError = !this.email;
    this.passwordError = !this.password;
    this.confirmPasswordError = this.password !== this.confirmPassword;

    if (!this.emailError && !this.passwordError && !this.confirmPasswordError) {
      console.log('Formulario de registro válido', {
        email: this.email,
        password: this.password,
      });
    }
  }
}
