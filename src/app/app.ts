import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/layout/sidebar.component/sidebar.component';
import { NavbarComponent } from './components/layout/navbar.component/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SidebarComponent,NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hospital-frontend');
}
