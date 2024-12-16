import { Component, computed } from '@angular/core';
import { DarkModeService } from '../../core/services/darkmode.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isDark = computed(() => this.darkModeService.darkMode());

  constructor(private darkModeService: DarkModeService) {}

  toggleTheme() {
    this.darkModeService.toggleDarkMode();
  }
}
