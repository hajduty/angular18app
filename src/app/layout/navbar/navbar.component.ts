import { Component, computed } from '@angular/core';
import { DarkModeService } from '../../core/services/darkmode.service';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDark = computed(() => this.darkModeService.darkMode());

  constructor(private darkModeService: DarkModeService, private authService: AuthService, private router: Router) { }

  toggleTheme() {
    this.darkModeService.toggleDarkMode();
  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
