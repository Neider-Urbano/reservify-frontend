import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  emailError = false;
  passwordError = false;

  onSubmit() {
    this.emailError = !this.email;
    this.passwordError = !this.password;

    if (!this.emailError && !this.passwordError) {
      console.log('Formulario válido', {
        email: this.email,
        password: this.password,
      });
    }
  }
}
