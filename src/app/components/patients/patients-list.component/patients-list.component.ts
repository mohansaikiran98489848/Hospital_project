import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PatientDto } from '../../../core/models/patient.model';
import { PatientService } from '../../../core/services/patient.service';

@Component({
  selector: 'app-patients-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './patients-list.component.html'
})
export class PatientsListComponent implements OnInit {
  patients: PatientDto[] = [];
  searchTerm = '';
  page = 1;
  pageSize = 25;
  totalCount = 0;
  loading = false;

  constructor(private service: PatientService, private router: Router) {}

  ngOnInit() {
    this.load();
  }

  load(reset = false) {
    if (reset) {
      this.page = 1;
      this.patients = [];
    }

    this.loading = true;

    this.service.getPaged(this.searchTerm, this.page, this.pageSize).subscribe({
      next: (res) => {
        this.totalCount = res.totalCount;
        this.patients = [...this.patients, ...res.patients];
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  addPatient() {
    this.router.navigate(['/patients/edit', 0]);
  }

  onSearchChange() {
    this.load(true); // Reset results and reload
  }

  showMore() {
    if (this.patients.length < this.totalCount) {
      this.page++;
      this.load();
    }
  }
}
