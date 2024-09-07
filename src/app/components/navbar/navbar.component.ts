import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  userName: string = '';
  isAdmin: boolean = false;
  showMenu = false;
  showDropdown = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.userName = user.name;
        this.isAdmin = user.role === 'admin';
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleAdminRole() {
    const user: User | null = this.authService.getDataUser();

    if (user) {
      this.authService.updateUserRole(this.isAdmin ? 'user' : 'admin');
    }
  }
}
