import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private darkModeSignal = signal<boolean>(false);
  readonly darkMode = this.darkModeSignal.asReadonly();

  constructor() {
    const savedTheme = localStorage.getItem('darkMode');
    this.darkModeSignal.set(savedTheme === 'true');
    this.applyTheme();
  }

  toggleDarkMode() {
    this.darkModeSignal.update(current => !current);
    this.applyTheme();
  }

  private applyTheme() {
    const isDark = this.darkModeSignal();
    localStorage.setItem('darkMode', isDark.toString());
    document.documentElement.setAttribute(
      'data-bs-theme', 
      isDark ? 'dark' : 'light'
    );
  }
}
