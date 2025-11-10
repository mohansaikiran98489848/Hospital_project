import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDto } from '../../../core/models/doctor.model';
import { DoctorService } from '../../../core/services/doctor.service';
import { DoctorEditComponent } from '../doctor-edit.component/doctor-edit.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-doctors-list',
  standalone: true,
  imports: [CommonModule, DoctorEditComponent, FormsModule],
  templateUrl: './doctors-list.component.html'
})
export class DoctorsListComponent implements OnInit {
  doctors: DoctorDto[] = [];
  totalCount = 0;
  page = 1;
  pageSize = 10;
  search = '';
  showModal = false;
  selectedDoctor?: DoctorDto;
  loading = false;

  constructor(private svc: DoctorService) {}

  ngOnInit() {
    this.load();
  }

  load(reset: boolean = true) {
  if (reset) {
    this.page = 1;
    this.doctors = [];
  }

  this.loading = true;

  this.svc.getPaged(this.page, this.pageSize, this.search).subscribe({
    next: (res) => {
      if (res && res.data) {
        this.doctors = [...this.doctors, ...res.data];
        this.totalCount = res.totalCount;
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('Error loading doctors:', err);
      this.loading = false;
    }
  });
}


  showMore() {
    if (this.doctors.length < this.totalCount) {
      this.page++;
      this.load(false); // load next page, append to existing
    }
  }

  searchDoctors() {
    this.load(true); // reset and reload when search changes
  }

  add() {
    this.selectedDoctor = undefined;
    this.showModal = true;
  }

  edit(d: DoctorDto) {
    this.selectedDoctor = d;
    this.showModal = true;
  }

  closeModal(refresh: boolean) {
    this.showModal = false;
    if (refresh) this.load(true);
  }

  delete(id: number) {
    if (confirm('Delete this doctor?')) {
      this.svc.delete(id).subscribe(() => this.load(true));
    }
  }

  get canLoadMore(): boolean {
    return this.doctors.length < this.totalCount;
  }
}

