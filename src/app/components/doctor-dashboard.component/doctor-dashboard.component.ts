import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {

  summary: any = null;
  appointments: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSummary();
    this.loadAppointments();
  }

  loadSummary() {
    this.http.get(`${environment.apiUrl}/Appointments/my/summary`)
      .subscribe(res => this.summary = res);
  }

  loadAppointments() {
    this.http.get(`${environment.apiUrl}/Appointments/my`)
      .subscribe((res: any) => this.appointments = res);
  }
}
