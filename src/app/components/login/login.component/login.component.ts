import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
  this.loading = false;

  const role = this.authService.getRole();

  if (role === 'Doctor') {
  this.router.navigate(['/dashboard/doctor']);
} else if (role === 'Reception') {
  this.router.navigate(['/dashboard/reception']);
} else {
  this.router.navigate(['/dashboard/home']);   // Admin or others
}

},

     error: (err) => {
  console.log("LOGIN ERROR:", err);  // <--- IMPORTANT
  this.loading = false;
  this.errorMessage = 'Invalid username or password';
}
    });
  }
}
