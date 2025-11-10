import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  searchTerm = '';
  filteredMenu: any[] = [];

  menu = [
    {
      name: 'Dashboard',
      icon: '🏠',
      open: false,
      children: [
        { name: 'Overview', link: '/dashboard', icon: '📊' },
      ]
    },
    {
      name: 'Types',
      icon: '📂',
      open: false,
      children: [
        { name: 'All Types ', link: '/types', icon: '📂' },
      ]
    },
    {
      name: 'Patients',
      icon: '🧍',
      open: false,
      children: [
        { name: 'Patient List', link: '/patients', icon: '📋' },
      ]
    },
    {
      name: 'Doctors',
      icon: '👨‍⚕️',
      open: false,
      children: [
        { name: 'Doctor List', link: '/doctors', icon: '📋' },
      ]
    },
     {
      name: 'Departments',
      icon: '👨',
      open: false,
      children: [
        { name: 'Departments List', link: '/departments', icon: '📋' },
      ]
    },
    {
      name: 'Reception',
      icon:'🛎️',
      open: false,
      children: [
        { name: 'Reception', link: '/reception', icon: '🛎️' }
      ]
    },
    {
      name: 'Consultations',
      icon: '💬',
      open: false,
      children: [
        { name: 'All Consultations', link: '/consultations', icon: '📜' }
      ]
    },
     {
      name: 'Services',
      icon:'🩺',
      open: false,
      children: [
        { name: 'All Services', link: '/services', icon: '🩺' }
      ]
    },
     {
      name: 'Billing',
      icon: '💵',
      open: false,
      children: [
        { name: 'Bills', link: '/bills', icon: '🧾' },
      ]
    }
  ];

  constructor(private auth: AuthService) {
    this.filteredMenu = this.menu; 
  }

  toggleSection(section: any) {
    section.open = !section.open;
  }

  onSearchChange() {
    const term = this.searchTerm.toLowerCase();
    if (!term) {
      this.filteredMenu = this.menu;
      return;
    }

    this.filteredMenu = this.menu
      .map(section => ({
        ...section,
        children: section.children.filter(c =>
          c.name.toLowerCase().includes(term)
        )
      }))
      .filter(section => section.children.length > 0);
  }

 
}

