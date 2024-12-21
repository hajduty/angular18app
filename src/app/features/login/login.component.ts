import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserAuth } from '../../core/models/user.model';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user: UserAuth = { email: "", password: "" };
  isRegistering = false;
  isAuthenticated = false;
  errorMessage = "";

  @ViewChild('loginForm') loginForm!: NgForm;
  @ViewChild('registerForm') registerForm!: NgForm;

  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.errorMessage = "";
  }

  constructor(private authService: AuthService, private router: Router) { }

  async onAuth(type: string) {
    const currentForm = this.isRegistering ? this.registerForm : this.loginForm;

    if (currentForm.invalid) {
      if (currentForm.invalid) {
        Object.keys(currentForm.controls).forEach(key => {
          const control = currentForm.controls[key];
          control.markAsTouched();
        });
        return;
      }
    }

    try {
      await this.authService.authenticate(this.user, type);
    } catch (error) {
      console.log("Hello!");
      this.errorMessage = "Authentication failed. Please check your credentials.";
    }
  }
}