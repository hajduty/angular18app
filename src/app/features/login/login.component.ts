import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserAuth } from '../../core/models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: UserAuth = { email: "", password: "" };
  errorMessage: string = '';
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) { }

  async onLogin() {
    if (this.user.email === "" || this.user.password === "") {
      return;
    }

    await this.authService.authenticate(this.user, "login");

    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl("/");
    }
  }
}