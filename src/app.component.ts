import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './app/components/layout/navbar.component/navbar.component';
import { SidebarComponent } from './app/components/layout/sidebar.component/sidebar.component';
import { AuthService } from './app/core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styles: [`
    .app-container { display: flex; min-height: 100vh; }
    .main-content { flex: 1; display: flex; flex-direction: column; }
  `]
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
